import { AspectRatio, Box, Flex, SimpleGrid } from '@mantine/core'
import { notifications, showNotification } from '@mantine/notifications'
import Image from 'next/image'
import { FC, useState } from 'react'
import { WaitingEntity, WaitingRewardEntity } from '../../../generated/graphql'
import { useConsumeReward } from '../../../hooks/resources/useConsumeWaitingReward'
import { useSiweEoaAddress } from '../../../hooks/resources/useSiweEoaAddress'
import { colorScheme } from '../../../theme/colorScheme'
import { EButton } from '../../01_elements/EButton'
import { EHeading } from '../../01_elements/EHeading/base'
import { EModal } from '../../01_elements/EModal'
import { EText } from '../../01_elements/EText/base'

type Props = {
  waiting: WaitingEntity
  waitingReward: WaitingRewardEntity
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const Component: FC<Props> = ({
  waiting,
  waitingReward,
  isOpen,
  setIsOpen,
}) => {
  const {
    isRewardConsumeable,
    isRewardConsumeableError,
    isRewardConsumeableIsLoading,
    consumeRewardErrorType,
    consumeReward,
  } = useConsumeReward({ uniqueKey: waitingReward.uniqueKey })

  const { isSiweWallet } = useSiweEoaAddress(waiting.user.eoaAddress)
  const [processing, setProcessing] = useState(false)

  const onSubmit = async () => {
    if (!isSiweWallet) {
      showNotification({
        message: '他の人のリワードページのため使用できません',
        color: colorScheme.scheme1.notice.alert,
      })
    }

    try {
      setProcessing(true)
      // const consumeWaitingReward = await consumeReward({
      //   uniqueKey: waitingReward.uniqueKey,
      // })

      // showNotification({
      //   message: 'リワードを使用しました。',
      //   color: colorScheme.scheme1.accent1.surface,
      // })

      setIsOpen(false)

      // window.location.href = waitingAquiredUrl(
      //   waiting.uniqueKey,
      //   redeemedReward.reward.uniqueKey
      // )
      // router.push(
      //   waitingAquiredUrl(waiting.uniqueKey, redeemedReward.reward.uniqueKey)
      // )
    } catch (e: any) {
      console.error(e)
      notifications.show({
        title: 'エラー',
        message: e.message,
        color: colorScheme.scheme1.notice.alert,
      })
    }
  }

  return (
    <EModal
      isOpen={isOpen}
      closedCallback={() => setIsOpen(false)}
      showCloseButton={false}
    >
      <Box
        mt={-32}
        mx={-32}
        pb={8}
        style={{
          transitionDuration: '1s',
          transform: 'rotate(-180deg)',
        }}
      >
        {waitingReward.reward.iconUrl && (
          <AspectRatio ratio={1} w="100%" h="100%">
            <Flex
              pos="relative"
              w="100%"
              h="100%"
              align="center"
              justify="center"
              bg={colorScheme.scheme1.surface2.surface}
            >
              <Image
                src={
                  waitingReward.reward.iconUrl ||
                  '/assets/images/_sample/picture_ranking_01.png'
                } // TODO fallback image
                alt={waitingReward.reward.name}
                fill={true}
              />
            </Flex>
          </AspectRatio>
        )}
        <Box mt={4} ta="center" fz={12}>
          {waitingReward.reward.name}
        </Box>
      </Box>
      <EHeading.Page mt={16} ta="center" c={colorScheme.scheme1.notice.alert}>
        スタッフにこの画面を見せて確認後
        <br />
        「利用する」を押してください
      </EHeading.Page>
      <EText.Desc2 mt={8} ta="center" c={colorScheme.scheme1.notice.alert}>
        「利用する」押下後の取り消しはできません
      </EText.Desc2>
      <SimpleGrid mt={16} cols={2} spacing={4}>
        <EButton.Sm w="100%" surface="surface2" fillType="filled">
          キャンセル
        </EButton.Sm>
        <EButton.Sm
          w="100%"
          surface="accent2"
          fillType="filled"
          onClick={onSubmit}
        >
          利用する
        </EButton.Sm>
      </SimpleGrid>
    </EModal>
  )
}

export { Component as TModalRewardConfirmConsumptionTemplate }
