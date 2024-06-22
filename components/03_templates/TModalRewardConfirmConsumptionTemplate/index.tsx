import { AspectRatio, Box, Flex } from '@mantine/core'
import { notifications, showNotification } from '@mantine/notifications'
import Image from 'next/image'
import { FC, useState } from 'react'
import { WaitingEntity, WaitingRewardEntity } from '../../../generated/graphql'
import { useConsumeReward } from '../../../hooks/resources/useConsumeWaitingReward'
import { useSiweEoaAddress } from '../../../hooks/resources/useSiweEoaAddress'
import { colorScheme } from '../../../theme/colorScheme'
import { EButton } from '../../01_elements/EButton'
import { EHeading } from '../../01_elements/EHeading/base'
import { ELoader } from '../../01_elements/ELoader'
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
    consumeReward,
  } = useConsumeReward({ uniqueKey: waitingReward.uniqueKey })

  const { isSiweWallet } = useSiweEoaAddress(waiting.user.eoaAddress)
  const [used, setUsed] = useState(false)
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
      await consumeReward({
        uniqueKey: waitingReward.uniqueKey,
      })

      setUsed(true)
      setTimeout(() => {
        setProcessing(false)
      }, 2000)
    } catch (e: any) {
      setProcessing(false)
      console.error(e)
      notifications.show({
        title: 'エラー',
        message: e.message,
        color: colorScheme.scheme1.notice.alert,
      })
    }
  }

  if (isRewardConsumeableError) {
    return (
      <EModal
        isOpen={isOpen}
        closedCallback={() => setIsOpen(false)}
        showCloseButton={false}
      >
        <Flex w="100%" h="300px" align="center" justify="center">
          Consumeableエラー
        </Flex>
      </EModal>
    )
  }

  if (isRewardConsumeableIsLoading || !isRewardConsumeable)
    return (
      <Flex direction="column" my={0} px={16} justify="center" align="center">
        <EButton.Sm fillType="disabled">Loading...</EButton.Sm>
      </Flex>
    )

  if (processing) {
    return (
      <EModal
        isOpen={isOpen}
        closedCallback={() => setIsOpen(false)}
        showCloseButton={false}
      >
        <Flex w="100%" h="300px" align="center" justify="center">
          <ELoader />
        </Flex>
      </EModal>
    )
  }

  if (used) {
    return (
      <EModal
        isOpen={isOpen}
        closedCallback={() => setIsOpen(false)}
        // showCloseButton={true}
      >
        <EHeading.Page ta="center">利用開始</EHeading.Page>

        <EText.Desc2 mt={8} ta="center">
          お楽しみください！
        </EText.Desc2>

        <EButton.Sm
          w="100%"
          mt={16}
          surface="surface2"
          fillType="filled"
          onClick={() => window.location.reload()}
        >
          閉じる
        </EButton.Sm>
      </EModal>
    )
  }

  return (
    <EModal
      showCloseButton={true}
      isOpen={isOpen}
      closedCallback={() => setIsOpen(false)}
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

      <EButton.Sm
        w="100%"
        mt={16}
        surface="accent2"
        fillType="filled"
        onClick={onSubmit}
      >
        利用する
      </EButton.Sm>
    </EModal>
  )
}

export { Component as TModalRewardConfirmConsumptionTemplate }
