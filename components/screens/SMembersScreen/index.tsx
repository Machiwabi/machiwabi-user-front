import { FC } from 'react'
import { useWaitingSiblings } from '../../../hooks/resources/useWaitingSiblings'
import { OWaitingUserList } from '../../organisms/OWaitingUserList'
import { TErrorTemplate } from '../../templates/TErrorTemplate'
import { TLoadingTemplate } from '../../templates/TLoadingTemplate'

type Props = {
  eventUniqueKey: string
}

const Component: FC<Props> = ({ eventUniqueKey }) => {
  const { waitingSiblings, waitingSiblingError, waitingSiblingsIsLoading } =
    useWaitingSiblings({
      eventUniqueKey,
    })

  if (waitingSiblingError) return <TErrorTemplate />
  if (waitingSiblingsIsLoading || !waitingSiblings) return <TLoadingTemplate />

  const waitings = waitingSiblings.sort((a, b) => {
    if (a.totalPoint < b.totalPoint) return 1
    if (a.totalPoint > b.totalPoint) return -1
    return 0
  })

  return (
    <>
      <OWaitingUserList waitings={waitings} />
    </>
  )
}

export { Component as SMembersScreen }
