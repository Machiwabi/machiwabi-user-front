const get = async (): Promise<string | null> => {
  const redirectUrl: string | null = await localStorage.getItem(
    'machiwabi.siweEoaAddress'
  )
  if (redirectUrl) {
    return redirectUrl
  } else {
    return null
  }
}

const save = async (redirectUrl: string) => {
  try {
    localStorage.setItem('machiwabi.siweEoaAddress', redirectUrl)
    window.dispatchEvent(new Event('storage'))
  } catch (e) {
    throw e
  }
}

const remove = async () => {
  try {
    await localStorage.removeItem('machiwabi.siweEoaAddress')
    window.dispatchEvent(new Event('storage'))
  } catch (e) {
    throw e
  }
}

export const SiweEoaAddressRepository = {
  get,
  save,
  remove,
}
