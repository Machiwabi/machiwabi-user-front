import { FC } from 'react'
import { useBoosters } from '../../../hooks/resources/useBoosters'
import { OMissionList } from '../../organisms/OMissionList'
import { TErrorTemplate } from '../../templates/TErrorTemplate'
import { TLoadingTemplate } from '../../templates/TLoadingTemplate'

type Props = {
  eventUniqueKey: string
}

const Component: FC<Props> = ({ eventUniqueKey }) => {
  const { boosters, boostersIsLoading, boostersError } = useBoosters({
    eventUniqueKey,
  })

  if (boostersError) return <TErrorTemplate />
  if (boostersIsLoading || !boosters) return <TLoadingTemplate />
  return (
    <>
      <OMissionList px={16} boosters={boosters} />
    </>
  )
}

export { Component as SMissionsScreen }
