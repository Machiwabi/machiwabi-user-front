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
          {event.isJoinable ? (
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

  const { createJoinWaiting } = useJoinWaiting()
  const [joining, setJoining] = useState(false)

  const submit = async () => {
    setJoining(true)
    const joinWaiting = await createJoinWaiting({
      eventUniqueKey: event.uniqueKey,
    })
    window.location.href = waitingUrl(joinWaiting.joinEvent.uniqueKey)
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
          NotSuitableUserError: 'ユーザーが見つかりません',
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
              終了しました
            </EButton.Lg>
          </Box>
        </>
      )}
    </>
  )
}
