import { useEffect } from 'react'
import { useRecoilValue } from 'recoil'

type RecoilObserverArgs = {
  node: any
  onChange: (value: any) => void
}

export const RecoilObserver = ({ node, onChange }: RecoilObserverArgs) => {
  const value = useRecoilValue(node)
  useEffect(() => onChange(value), [onChange, value])
  return null
}
