import { FC } from 'react'
import { useWaitings } from '../../../hooks/resources/useWaitings'
import { TErrorTemplate } from '../../03_templates/TErrorTemplate'
import { TLoadingTemplate } from '../../03_templates/TLoadingTemplate'
import { TWaitingEventsTemplate } from '../../03_templates/TWaitingEventsTemplate'
import { TNoWaitingsTemplate } from '../../03_templates/TNoWaitingsTemplate'
import { OFooterNav } from '../../02_organisms/OFooterNav'
import { Seo } from '../../99_seo/waitings/Seo'

const Component: FC = () => {
  const { waitings, waitingsError, waitingsIsLoading } = useWaitings()

  if (waitingsError) return <TErrorTemplate />
  if (waitingsIsLoading || !waitings) return <TLoadingTemplate />
  if (waitings.length === 0) return <TNoWaitingsTemplate />

  const currentWaitings = waitings.filter(
    (waiting) => new Date(waiting.event?.endAt) > new Date()
  )
  const pastWaitings = waitings.filter(
    (waiting) => new Date(waiting.event?.endAt) <= new Date()
  )

  return (
    <>
      <Seo />
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

      <OFooterNav />
    </>
  )
}

export { Component as SWaitingsScreen }
