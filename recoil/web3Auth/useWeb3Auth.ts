import { IProvider, WALLET_ADAPTERS } from '@web3auth/base'
import { Web3Auth, Web3AuthOptions } from '@web3auth/modal'
import { OpenloginAdapter } from '@web3auth/openlogin-adapter'
import { ethers } from 'ethers'
import { useEffect, useRef, useState } from 'react'
import { applicationProperties } from '../../constants/applicationProperties'
import {
  Web3AuthAlreadyConnectedError,
  Web3AuthNotConnectedError,
} from '../../exceptions/exceptions'
import { Web3AuthConnectedRepository } from '../../repositories/Web3AuthConnectedRepository'

type Props = {
  redirectUrl?: string
  forceInitialize?: boolean
}

export const useWeb3Auth = ({
  redirectUrl = `${applicationProperties.HOSTING_URL}`,
  forceInitialize = false,
}: Props = {}) => {
  const [web3Auth, setWeb3Auth] = useState<Web3Auth | null>()
  const [eoaAddress, setEoaAddress] = useState<string | null>(null)
  // TODO persistしたisCheckConnectedAyncに置き換える
  const [isWeb3AuthConnected, setWeb3AuthIsConnected] = useState<boolean>(false)

  const initializing = useRef(false) // useRefを使って初期化の状態を追跡

  // 初期化処理
  useEffect(() => {
    ;(async () => {
      if (initializing.current) return
      if (web3Auth) return

      initializing.current = true

      await initializeWeb3Auth()
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ウォレットアドレス取得およびキャッシュ処理
  useEffect(() => {
    ;(async () => {
      if (
        forceInitialize ||
        (web3Auth?.status === 'connected' && !eoaAddress)
      ) {
        cacheEoaAddress()
      }

      if (web3Auth?.status === 'connected') {
        await Web3AuthConnectedRepository.setWeb3AuthConnected()
        setWeb3AuthIsConnected(true)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [web3Auth])

  const openloginAdapter = new OpenloginAdapter({
    loginSettings: {
      mfaLevel: 'none', // default, optional, mandatory, none
    },
    adapterSettings: {
      uxMode: 'redirect', // safariは　popup が使えないため明示的に redirect を指定する
      redirectUrl: redirectUrl,
    },
  })

  // web3Authオブジェクトを初期化し、Stateに設定する
  const initializeWeb3Auth = async (): Promise<Web3Auth> => {
    // 1.接続チェーン等の設定
    const web3AuthObject = new Web3Auth(web3AuthOptions)
    // 2.ログインモーダルとMFAの設定 3rdPartyCookie対策はここで行う
    web3AuthObject.configureAdapter(openloginAdapter)
    // 3.ログインモーダルに表示するログイン手法の選定をし、モーダルを初期化する
    await web3AuthObject.initModal(modalConfig)
    // 4.初期化したオブジェクトをStateに設定し、外部から参照できるようにする
    setWeb3Auth(web3AuthObject)

    return web3AuthObject
  }

  // Web3AuthではSNSログインでログインした際、EOAアドレスを取得する関数がないため、
  // ethers.jsを用いてEOAアドレスを取得し、Stateに設定する
  const cacheEoaAddress = async (): Promise<string | undefined> => {
    if (!web3Auth) return
    try {
      const web3AuthProvider: IProvider | null = await web3Auth?.connect()
      if (!web3AuthProvider) return

      // 1.web3AuthProviderをethers.jsのProviderに変換する
      const provider = new ethers.providers.Web3Provider(web3AuthProvider)
      // 2.変換したProviderからSignerを取得する
      const signer = await provider.getSigner()
      // 3.SignerからEOAアドレスを取得する
      const signinedEoaAddress = await signer.getAddress()

      setEoaAddress(signinedEoaAddress)

      return signinedEoaAddress
    } catch (e) {
      console.error(e)
      if (!`${e}`.includes('User closed the modal')) {
        throw e
      }
    }
  }

  const web3AuthLogout = async (redirectUrl: string) => {
    try {
      if (!isWeb3AuthConnected) throw new Web3AuthNotConnectedError()
      await web3Auth?.logout()
      await Web3AuthConnectedRepository.removeWeb3AuthConnected()
      setWeb3Auth(null)
      window.location.href = redirectUrl
    } catch (e) {
      console.error(e)
      throw e
    }
  }

  const getUserInfo = async () => {
    try {
      if (!isWeb3AuthConnected) throw new Web3AuthNotConnectedError()
      return web3Auth?.getUserInfo()
    } catch (e) {
      console.error(e)
      throw e
    }
  }

  const connectWeb3Auth = async () => {
    try {
      if (isWeb3AuthConnected) throw new Web3AuthAlreadyConnectedError()
      await web3Auth?.connect()
    } catch (e) {
      console.error(e)
      if (!`${e}`.includes('User closed the modal')) {
        throw e
      }
    }
  }

  const getUserEoaAddress = async () => {
    // Provider経由してEOAを取得してキャッシュするのに時間がかかる
    // ゆえ、ステートにからな場合があるゆえ、取得を直接awaitで走らせて取得する
    if (!!eoaAddress) {
      return eoaAddress
    } else {
      return await cacheEoaAddress()
    }
  }

  const isCheckConnectedAync = async () => {
    const { connected } =
      await Web3AuthConnectedRepository.getWeb3AuthConnected()

    return !!connected
  }

  return {
    connectWeb3Auth,
    web3Auth,
    initializeWeb3Auth,
    getUserInfo,
    web3AuthLogout,
    isWeb3AuthConnected,
    isCheckConnectedAync,
    getUserEoaAddress,
    eoaAddress,
  }
}

// private ---

const web3AuthOptions: Web3AuthOptions = {
  clientId: applicationProperties.WEB3AUTH_CLIENT_ID,

  web3AuthNetwork:
    applicationProperties.WEB3AUTH_AUTH_NETWORK as Web3AuthOptions['web3AuthNetwork'],
  chainConfig: {
    chainNamespace: 'eip155',
    chainId: '0x1',
    rpcTarget: 'https://rpc.ankr.com/eth',
    displayName: 'Ethereum Mainnet',
    blockExplorer: 'https://goerli.etherscan.io',
    ticker: 'ETH',
    tickerName: 'Ethereum',
  },
}

const modalConfig = {
  modalConfig: {
    [WALLET_ADAPTERS.OPENLOGIN]: {
      label: 'openlogin',
      loginMethods: {
        facebook: {
          name: 'facebook',
          showOnModal: true,
        },
        reddit: {
          name: 'reddit',
          showOnModal: false,
        },
        discord: {
          name: 'discord',
          showOnModal: true,
        },
        twitch: {
          name: 'twitch',
          showOnModal: false,
        },
        line: {
          name: 'line',
          showOnModal: false,
        },
        github: {
          name: 'github',
          showOnModal: false,
        },
        kakao: {
          name: 'kakao',
          showOnModal: false,
        },
        linkedin: {
          name: 'linkedin',
          showOnModal: false,
        },
        twitter: {
          name: 'twitter',
          showOnModal: false,
        },
        weibo: {
          name: 'weibo',
          showOnModal: false,
        },
        wechat: {
          name: 'wechat',
          showOnModal: false,
        },
      },
      showOnModal: true,
    },
  },
}
