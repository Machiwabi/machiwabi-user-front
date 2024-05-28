import { Box, Flex } from '@mantine/core'
import { FC } from 'react'
import { applicationProperties } from '../../../constants/applicationProperties'
import { eventUrl, waitingUrl } from '../../../helpers/url.helper'
import { useEvent } from '../../../hooks/resources/useEvent'
import { useWeb3Auth } from '../../../hooks/useWeb3Auth'
import { useAuthenticatedStore } from '../../../recoil/authenticatedStore/useAuthenticatedStore'
import { EButton } from '../../01_elements/EButton'
import { TErrorTemplate } from '../../03_templates/TErrorTemplate'
import { TEventShowTemplate } from '../../03_templates/TEventShowTemplate'
import { TLoadingTemplate } from '../../03_templates/TLoadingTemplate'
import { useJoinWaiting } from '../../../hooks/resources/useJoinWaiting'
import { OEventJoinButton } from '../../02_organisms/OEventJoinButton'

type Props = {
  uniqueKey: string
}

const Component: FC<Props> = ({ uniqueKey }) => {
  const { event, eventError, eventIsLoading } = useEvent({
    uniqueKey,
  })

  const { createJoinWaiting } = useJoinWaiting()

  const submit = async () => {
    const joinWaiting = await createJoinWaiting({ eventUniqueKey: uniqueKey })
    window.location.href = waitingUrl(joinWaiting.joinEvent.uniqueKey)
  }

  const { isAuthenticated } = useAuthenticatedStore()
  const { connectWeb3AuthAndSignInWithEthereum } = useWeb3Auth()

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
        {/* {isAuthenticated() ? (
          <>
            <Box w="100%" maw={410} px={16}>
              <EButton.Lg
                w="100%"
                fillType="filled"
                surface="surface3"
                onClick={submit}
              >
                参加する
              </EButton.Lg>
            </Box>
          </>
        ) : (
          <>
            {event.isJoinable ? (
              <>
                <Box w="100%" maw={410} px={16}>
                  <EButton.Lg
                    w="100%"
                    fillType="filled"
                    surface="surface3"
                    onClick={() => {
                      connectWeb3AuthAndSignInWithEthereum(
                        `${applicationProperties.HOSTING_URL}${eventUrl(
                          uniqueKey
                        )}`
                      )
                    }}
                  >
                    ログインして参加する
                  </EButton.Lg>
                </Box>
              </>
            ) : (
              <>
                <Box w="100%" maw={410} px={16}>
                  <EButton.Lg w="100%" fillType="disabled" disabled>
                    終了しました
                  </EButton.Lg>
                </Box>
              </>
            )}
          </>
        )} */}
      </Flex>
    </>
  )
}

export { Component as SEventScreen }
