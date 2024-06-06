import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Textarea } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { FC, Fragment, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  UpdateWaitingMessageMutationVariables,
  WaitingEntity,
} from '../../../generated/graphql'
import { useSiweEoaAddress } from '../../../hooks/resources/useSiweEoaAddress'
import { useWaiting } from '../../../hooks/resources/useWaiting'
import { colorScheme } from '../../../theme/colorScheme'
import { editWaitingMessageSchema } from '../../../validations/editWaitingMessageSchema'
import { EText } from '../../01_elements/EText/base'

const schema = z.object(editWaitingMessageSchema)

type Props = {
  waiting: WaitingEntity
}

const Component: FC<Props> = ({ waiting }) => {
  const [isEditing, setIsEditing] = useState(false)
  const { isSiweWallet } = useSiweEoaAddress(waiting.user.eoaAddress)
  const { updateWaitingMessage } = useWaiting({ uniqueKey: waiting.uniqueKey })

  const defaultValues = {
    waitingMessage: waiting.waitingMessage,
  }

  const methods = useForm({
    mode: 'onBlur',
    resolver: zodResolver(schema),
    shouldFocusError: true,
    defaultValues,
  })

  const sendOnSubmit = methods.handleSubmit(async (data) => {
    const dto: UpdateWaitingMessageMutationVariables = {
      uniqueKey: waiting.uniqueKey,
      waitingMessage: data.waitingMessage,
    }

    try {
      await updateWaitingMessage(dto)
      showNotification({
        message: 'プロフィールを登録しました',
        color: colorScheme.scheme1.accent1.surface,
      })
    } catch (error) {
      showNotification({
        message: 'プロフィールの登録に失敗しました',
        color: colorScheme.scheme1.notice.alert,
      })
    }
  })

  if (isEditing && isSiweWallet) {
    return (
      <>
        <form onSubmit={sendOnSubmit}>
          <Textarea
            {...methods.register('waitingMessage')}
            mt={8}
            placeholder="イベントの応援メッセージを設定できます。"
            error={
              methods.formState.errors['waitingMessage']
                ? methods.formState.errors['waitingMessage'].message?.toString()
                : ''
            }
            onBlur={() => {
              sendOnSubmit()
              setIsEditing(false)
            }}
          />
        </form>
      </>
    )
  }

  return (
    <>
      {isSiweWallet ? (
        <>
          <Box
            onClick={() => {
              setIsEditing(true)
            }}
          >
            {waiting.waitingMessage ? (
              <EText.Desc2>
                {waiting.waitingMessage &&
                  waiting.waitingMessage.split('\n').map((line, index) => (
                    <Fragment key={index}>
                      {line}
                      <br />
                    </Fragment>
                  ))}
              </EText.Desc2>
            ) : (
              <EText.Desc2 c={colorScheme.scheme1.surface1.object.low}>
                ここをタップすると、イベントにかける想いのメッセージを設定できます。
              </EText.Desc2>
            )}
          </Box>
        </>
      ) : (
        <>
          {waiting.waitingMessage ? (
            <EText.Desc2>
              {waiting.waitingMessage &&
                waiting.waitingMessage.split('\n').map((line, index) => (
                  <Fragment key={index}>
                    {line}
                    <br />
                  </Fragment>
                ))}
            </EText.Desc2>
          ) : (
            <EText.Desc2 c={colorScheme.scheme1.surface1.object.low}>
              メッセージはありません
            </EText.Desc2>
          )}
        </>
      )}
    </>
  )
}

export { Component as OWaitingMessageEditForm }
