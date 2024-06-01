import { useEffect, useState } from 'react'
import { TutorialHistoryRepository } from '../../repositories/TutorialHistoryRepository'

export const useTutorialHistory = (tutorialKey: string) => {
  const [isRead, setIsRead] = useState(true)

  useEffect(() => {
    _confirmUserTutorialRead()
  }, [])

  // private
  const _confirmUserTutorialRead = async () => {
    const read = await TutorialHistoryRepository.get(tutorialKey)
    setIsRead(read)
  }

  const markAsUserTutorialRead = async () => {
    setIsRead(true)
    await TutorialHistoryRepository.read(tutorialKey)
  }

  return { isRead, markAsUserTutorialRead }
}
