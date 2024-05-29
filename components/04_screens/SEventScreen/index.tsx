import { Flex } from '@mantine/core'
import { FC } from 'react'
import { applicationProperties } from '../../../constants/applicationProperties'
import { eventUrl, waitingUrl } from '../../../helpers/url.helper'
import { useEvent } from '../../../hooks/resources/useEvent'
import { useJoinWaiting } from '../../../hooks/resources/useJoinWaiting'
import { useWeb3Auth } from '../../../hooks/useWeb3Auth'
import { useAuthenticatedStore } from '../../../recoil/authenticatedStore/useAuthenticatedStore'
import { OEventJoinButton } from '../../02_organisms/OEventJoinButton'
import { TErrorTemplate } from '../../03_templates/TErrorTemplate'
import { TEventShowTemplate } from '../../03_templates/TEventShowTemplate'
import { TLoadingTemplate } from '../../03_templates/TLoadingTemplate'

type Props = {
  uniqueKey: string
}

const Component: FC<Props> = ({ uniqueKey }) => {
  const { event, eventError, eventIsLoading } = useEvent({
    uniqueKey,
  })

  if (eventError) return <TErrorTemplate />
  if (eventIsLoading || !event) return <TLoadingTemplate />

  return (
    <>
      <TEventShowTemplate mt={24} event={event} />
      <Flex
        pos="fixed"
        w="100%"
        left={0}
        bottom={0}
        mb={32}
        justify="center"
        align="center"
      >
        <OEventJoinButton
          event={event}
          redirectUrl={`${applicationProperties.HOSTING_URL}${eventUrl(
            uniqueKey
          )}`}
        />
      </Flex>
    </>
  )
}

export { Component as SEventScreen }