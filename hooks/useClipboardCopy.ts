import { showNotification } from '@mantine/notifications'
import { useState } from 'react'

export const useClipboardCopy = () => {
  const [copied, setCopied] = useState(false)

  const handleCopyClick = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      showNotification({
        message: 'クリップボードにコピーしました',
        color: 'blue',
        zIndex: 100000,
      })
      setTimeout(() => setCopied(false), 2000) // 2秒後にコピー状態をリセット
    })
  }

  return { copied, handleCopyClick }
}
