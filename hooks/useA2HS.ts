import { useEffect, useState } from 'react'

// beforeinstallprompt イベントの型を定義
type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>
}

const useA2HS = (): [BeforeInstallPromptEvent | null, () => void] => {
  const [promptEvent, setPromptEvent] =
    useState<BeforeInstallPromptEvent | null>(null)

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      // デフォルトのインストールプロンプトを防ぐ
      e.preventDefault()
      setPromptEvent(e)
    }

    window.addEventListener(
      'beforeinstallprompt',
      handleBeforeInstallPrompt as any
    )

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt as any
      )
    }
  }, [])

  const showPrompt = () => {
    if (promptEvent) {
      promptEvent.prompt()
    }
  }

  return [promptEvent, showPrompt]
}

export { useA2HS }
