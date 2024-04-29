type Web3AuthConnectedType = {
  connected: boolean
}

class Web3AuthConnected {
  connected: boolean

  constructor(web3AuthConnected: Web3AuthConnectedType) {
    this.connected = web3AuthConnected.connected
  }
}

const getWeb3AuthConnected = async (): Promise<Web3AuthConnected> => {
  const web3AuthConnected: string | null = await localStorage.getItem(
    'machiwabi.web3AuthConnected'
  )

  if (web3AuthConnected) {
    return new Web3AuthConnected(JSON.parse(web3AuthConnected))
  } else {
    return { connected: false }
  }
}

const setWeb3AuthConnected = async () => {
  try {
    localStorage.setItem(
      'machiwabi.web3AuthConnected',
      JSON.stringify({ connected: true })
    )
    window.dispatchEvent(new Event('storage'))
  } catch (e) {
    throw e
  }
}

const removeWeb3AuthConnected = async () => {
  try {
    await localStorage.removeItem('machiwabi.web3AuthConnected')
    window.dispatchEvent(new Event('storage'))
  } catch (e) {
    throw e
  }
}

export const Web3AuthConnectedRepository = {
  getWeb3AuthConnected,
  setWeb3AuthConnected,
  removeWeb3AuthConnected,
}
