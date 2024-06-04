import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { animateTriggerStore } from './animateTriggerStore'

// TODO singletonになるように設定したい
export const useAnimateTriggerTimer = (earnedUnitSeconds: number) => {
  const [trigger, setTrigger] = useRecoilState(animateTriggerStore)
  const [, setPreviousTimeMs] = useState<number>(new Date().getTime())
  const [isPushVisiable, setIsPushVisiable] = useState(false)

  const earndUnitMs = earnedUnitSeconds * 1000

  useEffect(() => {
    const checkEarnedTiming = () => {
      setPreviousTimeMs((previousTimeMs) => {
        const diffTime = new Date().getTime() - previousTimeMs // + offsetMs
        // console.log('diffTime', diffTime)
        if (diffTime < earndUnitMs) {
          return previousTimeMs
        } else {
          setIsPushVisiable(true)
          return new Date().getTime() //+ offsetMs
        }
      })
    }

    const interval = setInterval(checkEarnedTiming, 100)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (isPushVisiable) {
      setTrigger(true)
      setIsPushVisiable(false)

      setTimeout(() => {
        setTrigger(false)
      }, 3000)
    }
  }, [isPushVisiable])

  return { trigger, isPushVisiable }
}
