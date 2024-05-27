const get = async (): Promise<string | null> => {
  const redirectUrl: string | null = await localStorage.getItem(
    'machiwabi.redirectUrl'
  )
  if (redirectUrl) {
    return redirectUrl
  } else {
    return null
  }
}

const save = async (redirectUrl: string) => {
  try {
    localStorage.setItem('machiwabi.redirectUrl', redirectUrl)
    window.dispatchEvent(new Event('storage'))
  } catch (e) {
    throw e
  }
}

const remove = async () => {
  try {
    await localStorage.removeItem('machiwabi.redirectUrl')
    window.dispatchEvent(new Event('storage'))
  } catch (e) {
    throw e
  }
}

export const RedirectUrlRepository = {
  get,
  save,
  remove,
}
