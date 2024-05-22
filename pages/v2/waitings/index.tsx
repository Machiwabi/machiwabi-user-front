import LGuestUserLayout from '../../../componentsNew/layouts/LGuestUserLayout'
import { SErrorScreen } from '../../../componentsNew/screens/SErrorScreen'
import { SLoadingScreen } from '../../../componentsNew/screens/SLoadingScreen'
import { TWaitingEventsTemplate } from '../../../componentsNew/templates/TWaitingEventsTemplate'
import { useWaitings } from '../../../hooks/resources/useWaitings'
import { NextPageWithLayout } from '../../_app'

const Page: NextPageWithLayout = () => {
  const { waitings, waitingsError, waitingsIsLoading } = useWaitings()
  if (waitingsError) return <SErrorScreen />
  if (waitingsIsLoading || !waitings) return <SLoadingScreen />

  const currentWaitings = waitings.filter(
    (waiting) => new Date(waiting.event?.startAt) > new Date()
  )

  const pastWaitings = waitings.filter(
    (waiting) => new Date(waiting.event?.startAt) < new Date()
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

Page.getLayout = LGuestUserLayout

export default Page
