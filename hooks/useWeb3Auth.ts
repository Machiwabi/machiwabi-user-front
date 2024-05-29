import { IProvider, WALLET_ADAPTERS } from '@web3auth/base'
import { Web3Auth, Web3AuthOptions } from '@web3auth/modal'
import { OpenloginAdapter } from '@web3auth/openlogin-adapter'
import { ethers } from 'ethers'
import { useEffect, useRef, useState } from 'react'
import { SiweMessage } from 'siwe'
import { applicationProperties } from '../constants/applicationProperties'
import {
  Web3AuthAlreadyConnectedError,
  Web3AuthNotConnectedError,
} from '../exceptions/exceptions'
import {
  userNewUrl,
  waitingsUrl,
  web3AuthCallbackUrl,
} from '../helpers/url.helper'
import { RedirectUrlRepository } from '../repositories/RedirectUrlRepository'
import { SiweJwtRepository } from '../repositories/SiweJwtRepository'
import { UserPrivateRepository } from '../repositories/UserPrivateRepository'
import { Web3AuthConnectedRepository } from '../repositories/Web3AuthConnectedRepository'
import { getNonce } from '../usecases/authentication/getNonce'
import { signOutEoa } from '../usecases/authentication/signOutEoa'
import { verifyEoa } from '../usecases/authentication/verifyEoa'
import { useUserPrivate } from './resources/useUserPrivate'
import { SiweEoaAddressRepository } from '../repositories/SiweEoaAddressRepository'

type Props = {
  redirectUrl?: string
  forceInitialize?: boolean
}

export const useWeb3Auth = ({ forceInitialize = false }: Props = {}) => {
  const [web3Auth, setWeb3Auth] = useState<Web3Auth | null>()
  const [eoaAddress, setEoaAddress] = useState<string | null>(null)
  // TODO persistしたisCheckConnectedAyncに置き換える
  const [isWeb3AuthConnected, setWeb3AuthIsConnected] = useState<boolean>(false)

  const initializing = useRef(false) // useRefを使って初期化の状態を追跡

  const { upsertUser } = useUserPrivate()

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
      redirectUrl: `${
        applicationProperties.HOSTING_URL
      }/${web3AuthCallbackUrl()}`,
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

  // web3Authのログアウト処理
  const web3AuthLogout = async (redirectUrl: string) => {
    try {
      // siweの削除
      await signOutEoa()

      // web3Authのログアウト処理
      if (!isWeb3AuthConnected) throw new Web3AuthNotConnectedError()
      await SiweEoaAddressRepository.remove()
      await web3Auth?.logout()
    } catch (e) {
      console.error(e)
      throw e
    } finally {
      // ログアウト後の処理
      setWeb3Auth(null)
      window.location.href = redirectUrl
    }
  }

  // web3Authのユーザー情報取得処理
  const getUserInfo = async () => {
    try {
      if (!isWeb3AuthConnected) throw new Web3AuthNotConnectedError()
      return web3Auth?.getUserInfo()
    } catch (e) {
      console.error(e)
      throw e
    }
  }

  // web3Authに接続しウォレットでログインする処理
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

  // ログインしたユーザーのEOAアドレスを取得する関数
  const getUserEoaAddress = async () => {
    // Provider経由してEOAを取得してキャッシュするのに時間がかかる
    // ゆえ、ステートにからな場合があるゆえ、取得を直接awaitで走らせて取得する
    if (!!eoaAddress) {
      return eoaAddress
    } else {
      return await cacheEoaAddress()
    }
  }

  // web3authにログインしているかどうかを判定する
  const isCheckConnectedAync = async () => {
    const { connected } =
      await Web3AuthConnectedRepository.getWeb3AuthConnected()

    return !!connected
  }

  // web3Authでログインを行った上でSIWEする
  const connectWeb3AuthAndSignInWithEthereum = async (redirectUrl: string) => {
    await RedirectUrlRepository.save(redirectUrl)

    if (!web3Auth) return
    try {
      const web3AuthProvider: IProvider | null = await web3Auth?.connect()
      if (!web3AuthProvider) return

      await _signInWithEthereum(web3AuthProvider, redirectUrl)
    } catch (e) {
      console.error(e)
      if (!`${e}`.includes('User closed the modal')) {
        throw e
      }
    }
  }

  // SNSログイン後にcallbackした時にSIWEする
  const callbackedSignInWithEthereum = async (redirectUrl: string) => {
    if (!web3Auth) return
    try {
      const web3AuthProvider: IProvider | null = await web3Auth?.connect()
      if (!web3AuthProvider) return

      await _signInWithEthereum(web3AuthProvider, redirectUrl)
    } catch (e) {
      console.error(e)
      if (!`${e}`.includes('User closed the modal')) {
        throw e
      }
    }
  }

  const _signInWithEthereum = async (
    web3AuthProvider: IProvider,
    redirectUrl: string
  ) => {
    try {
      // 1.web3AuthProviderをethers.jsのProviderに変換する
      const provider = new ethers.providers.Web3Provider(web3AuthProvider)
      // 2.変換したProviderからSignerを取得する
      const signer = await provider.getSigner()
      // 3.SignerからEOAアドレスを取得する
      const signinedEoaAddress = await signer.getAddress()
      // 4.接続先サーバーよりnonceを取得する
      const nonce = await getNonce()
      // 5.SIWEメッセージを生成する
      const siweMessage = new SiweMessage({
        domain: applicationProperties.HOSTING_DOMAIN,
        address: signinedEoaAddress,
        statement: 'Sign in with Ethereum to the app.',
        uri: applicationProperties.HOSTING_URL,
        version: '1',
        chainId: 1,
        nonce,
      })
      // 6.メッセージをstring化し、署名を行う
      const message = siweMessage.prepareMessage()
      const signature = await signer.signMessage(message)

      // 7.署名したメッセージをサーバーに送信し、検証を行ったのち、JWTをキャッシュする
      await verifyEoa(siweMessage, signature)
      setEoaAddress(signinedEoaAddress)

      // 8.ログイン後のユーザーアップデート処理
      const jwt = await SiweJwtRepository.getSiweJwtFromBrowser()
      await SiweEoaAddressRepository.save(signinedEoaAddress)
      if (!jwt) throw new Error('jwt is not found')

      const userPrivate = await UserPrivateRepository.findOneByJwt(
        jwt.accessToken
      )

      if (userPrivate) {
        const redirectUrl = await RedirectUrlRepository.get()
        await RedirectUrlRepository.remove()

        window.location.href = redirectUrl || waitingsUrl()
      } else {
        window.location.href = userNewUrl()
      }
    } catch (e) {
      console.error(e)
    }
  }

  return {
    connectWeb3Auth,
    connectWeb3AuthAndSignInWithEthereum,
    callbackedSignInWithEthereum,
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
