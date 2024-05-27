import { FC } from 'react'
import { useBoosters } from '../../../hooks/resources/useBoosters'
import { OMissionList } from '../../organisms/OMissionList'
import { TErrorTemplate } from '../../templates/TErrorTemplate'
import { TLoadingTemplate } from '../../templates/TLoadingTemplate'
import { useWaiting } from '../../../hooks/resources/useWaiting'

type Props = {
  waitingUniqueKey: string
  eventUniqueKey: string
}

const Component: FC<Props> = ({ waitingUniqueKey, eventUniqueKey }) => {
  const { waiting, waitingError, waitingIsLoading } = useWaiting({
    uniqueKey: waitingUniqueKey,
  })

  const { boosters, boostersIsLoading, boostersError } = useBoosters({
    eventUniqueKey,
  })

  if (waitingError || boostersError) return <TErrorTemplate />
  if (waitingIsLoading || boostersIsLoading || !boosters || !waiting)
    return <TLoadingTemplate />

  return (
    <>
      <OMissionList px={16} waiting={waiting} boosters={boosters} />
    </>
  )
}

export { Component as SMissionsScreen }
