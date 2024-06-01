import { TutorialHistory } from '../types/TutorialHistory'

const all = async (): Promise<TutorialHistory | null> => {
  const strTutorialHistory: string | null = await localStorage.getItem(
    'machiwabi.tutorialHistory'
  )
  if (strTutorialHistory) {
    const tutorialHistory = JSON.parse(strTutorialHistory)
    return tutorialHistory
  } else {
    return null
  }
}

// 特定のチュートリアルキーを取得する
const get = async (tutorialKey: string) => {
  try {
    const tutorialHistory = await all()
    return tutorialHistory && tutorialHistory[tutorialKey] ? true : false
  } catch (e) {
    throw e
  }
}

// 任意のチュートリアルキーを読んだとしてフラグを保存する
const read = async (tutorialKey: string) => {
  try {
    const tutorialHistory = await all()
    const updatedTutorialHistory = { ...tutorialHistory, [tutorialKey]: true }

    localStorage.setItem(
      'machiwabi.tutorialHistory',
      JSON.stringify(updatedTutorialHistory)
    )
  } catch (e) {
    throw e
  }
}

export const TutorialHistoryRepository = {
  all,
  get,
  read,
}
