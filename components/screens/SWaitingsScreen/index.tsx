import { FC } from 'react'
import { useWaitings } from '../../../hooks/resources/useWaitings'
import { TErrorTemplate } from '../../templates/TErrorTemplate'
import { TLoadingTemplate } from '../../templates/TLoadingTemplate'
import { TWaitingEventsTemplate } from '../../templates/TWaitingEventsTemplate'
import { TNoWaitingsTemplate } from '../../templates/TNoWaitingsTemplate'

const Component: FC = () => {
  const { waitings, waitingsError, waitingsIsLoading } = useWaitings()

  if (waitingsError) return <TErrorTemplate />
  if (waitingsIsLoading || !waitings) return <TLoadingTemplate />
  if (waitings.length === 0) return <TNoWaitingsTemplate />

  const currentWaitings = waitings.filter(
    (waiting) => new Date(waiting.event?.startAt) > new Date()
  )
  const pastWaitings = waitings.filter(
    (waiting) => new Date(waiting.event?.startAt) <= new Date()
  )

  return (
    <>
      <TWaitingEventsTemplate
        mt={24}
        mb={40}
        px={16}
        heading="WAITING EVENTS"
        waitings={currentWaitings}
      />

      {pastWaitings.length > 0 && (
        <TWaitingEventsTemplate
          my={40}
          px={16}
          heading="PAST EVENTS"
          waitings={pastWaitings}
        />
      )}
    </>
  )
}

export { Component as SWaitingsScreen }
