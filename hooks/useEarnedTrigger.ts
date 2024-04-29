import { useEffect, useState } from 'react'

// 指定した秒数ごとにトリガーを発火するhooks
// 主に、ポイントの獲得タイミングを制御するために使用
export const useEarnedTrigger = (earnedUnitSeconds: number, offsetMs = 0) => {
  const [trigger, setTrigger] = useState(false)
  const [, setPreviousTimeMs] = useState<number>(new Date().getTime())
  const [isPushVisiable, setIsPushVisiable] = useState(false)

  useEffect(() => {
    const checkEarnedTiming = () => {
      setPreviousTimeMs((previousTimeMs) => {
        const diffTime = new Date().getTime() - previousTimeMs + offsetMs
        if (diffTime < earnedUnitSeconds * 1000) {
          return previousTimeMs
        } else {
          setIsPushVisiable(true)
          return new Date().getTime() + offsetMs
        }
      })
    }

    const interval = setInterval(checkEarnedTiming, earnedUnitSeconds * 200)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (isPushVisiable) {
      setTrigger(true)
      setIsPushVisiable(false)
    }
  }, [isPushVisiable])

  const resetTrigger = () => {
    setTrigger(false)
  }

  return { trigger, resetTrigger }
}
