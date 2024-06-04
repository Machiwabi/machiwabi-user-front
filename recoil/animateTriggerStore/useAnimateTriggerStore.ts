import { useRecoilState } from 'recoil'
import { animateTriggerStore } from './animateTriggerStore'

export const useAnimateTriggerStore = () => {
  const [trigger] = useRecoilState(animateTriggerStore)

  return { trigger }
}
