import { Box } from '@mantine/core'
import { FC, useState } from 'react'
import { EventEntity } from '../../../generated/graphql'
import { waitingUrl, waitingsUrl } from '../../../helpers/url.helper'
import { useEventJoinable } from '../../../hooks/resources/useEventJoinable'
import { useJoinWaiting } from '../../../hooks/resources/useJoinWaiting'
import { useWeb3Auth } from '../../../hooks/useWeb3Auth'
import { useAuthenticatedStore } from '../../../recoil/authenticatedStore/useAuthenticatedStore'
import { EButton } from '../../01_elements/EButton'
import { ELoader } from '../../01_elements/ELoader'
import { colorScheme } from '../../../theme/colorScheme'
import { ga4PushEvent } from '../../../utils/ga4'
import { GA4_CUSTOM_EVENT } from '../../../constants/ga4CustomEvent'
import { EventService } from '../../../domains/services/event.service'

type Props = {
  event: EventEntity
  redirectUrl: string
}

const Component: FC<Props> = ({ event, redirectUrl }) => {
  const { isAuthenticated } = useAuthenticatedStore()
  const { connectWeb3AuthAndSignInWithEthereum } = useWeb3Auth()

  return (
    <>
      {isAuthenticated() ? (
        <>
          <AuthenticatedButton event={event} />
        </>
      ) : (
        <>
          <Box w="100%" maw={410} px={16}>
            <EButton.Lg
              w="100%"
              fillType="filled"
              surface="surface3"
              onClick={() => {
                connectWeb3AuthAndSignInWithEthereum(redirectUrl)
              }}
            >
              新規作成／ログインして参加する
            </EButton.Lg>
            <Box
              mt={8}
              p={8}
              bg={colorScheme.scheme1.surface1.surface}
              c={colorScheme.scheme1.surface1.object.high}
              style={{
                borderRadius: 8,
                border: `1px solid ${colorScheme.scheme1.surface1.object.high}`,
              }}
            >
              <Box fz={10}>
                ・ safariやchromeなどのブラウザでご利用ください。
              </Box>
              <Box mt={2} fz={10}>
                ・
                ウォレットご利用の方：「接続」と「署名」の２回操作があります。
              </Box>
            </Box>
          </Box>
        </>
      )}
    </>
  )
}

export { Component as OEventJoinButton }

type AuthenticatedButtonProps = {
  event: EventEntity
}

const AuthenticatedButton: FC<AuthenticatedButtonProps> = ({ event }) => {
  const {
    isUserJoinable,
    isUserJoinableEventIsLoading,
    isUserJoiableError,
    isUserJoinableErrorType,
  } = useEventJoinable({ uniqueKey: event.uniqueKey })

  const eventService = new EventService(event)

  const { createJoinWaiting } = useJoinWaiting()
  const [joining, setJoining] = useState(false)

  const submit = async () => {
    setJoining(true)
    const joinWaiting = await createJoinWaiting({
      eventUniqueKey: event.uniqueKey,
    })
    ga4PushEvent(GA4_CUSTOM_EVENT.COMPLETE_JOIN_WAITING)
    window.location.href = waitingUrl(joinWaiting.joinEvent.uniqueKey)
  }

  if (eventService.eventEnded()) {
    return (
      <Box w="100%" maw={410} px={16}>
        <EButton.Lg w="100%" fillType="disabled" disabled>
          このイベントは終了しました
        </EButton.Lg>
      </Box>
    )
  }

  if (!eventService.eventStarted()) {
    return (
      <Box w="100%" maw={410} px={16}>
        <EButton.Lg w="100%" fillType="disabled" disabled>
          このイベントはまだ開始していません
        </EButton.Lg>
      </Box>
    )
  }

  if (isUserJoinableEventIsLoading || joining) {
    return (
      <>
        <Box w="100%" maw={410} px={16}>
          <EButton.Lg w="100%" fillType="disabled" disabled>
            <ELoader size="sm" />
          </EButton.Lg>
        </Box>
      </>
    )
  }

  if (isUserJoiableError) {
    // 参加済みの場合
    if (isUserJoinableErrorType === 'AlreadyWaitingError') {
      return (
        <>
          <Box w="100%" maw={410} px={16}>
            <EButton.Lg href={waitingsUrl()} w="100%">
              イベント参加済｜一覧ページへ
            </EButton.Lg>
          </Box>
        </>
      )
    }

    // それ以外のエラー
    const errorMessage = isUserJoinableErrorType
      ? {
          NotFoundError: 'イベントが見つかりません',
          NotSuitableEventError: 'イベントが見つかりません',
          NotSuitableUserError: 'ログアウトし、もう一度お試しください',
        }[isUserJoinableErrorType]
      : 'エラーのため参加できません'
    return (
      <>
        <Box w="100%" maw={410} px={16}>
          <EButton.Lg w="100%" fillType="disabled" disabled>
            {errorMessage}
          </EButton.Lg>
        </Box>
      </>
    )
  }

  return (
    <>
      {event.isJoinable ? (
        <>
          {isUserJoinable ? (
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
              <Box w="100%" maw={410} px={16}>
                <EButton.Lg w="100%" fillType="disabled" disabled>
                  参加できません
                </EButton.Lg>
              </Box>
            </>
          )}
        </>
      ) : (
        <>
          <Box w="100%" maw={410} px={16}>
            <EButton.Lg w="100%" fillType="disabled" disabled>
              開始していないもしくは終了しました
            </EButton.Lg>
          </Box>
        </>
      )}
    </>
  )
}
