import { Box, BoxProps, Flex } from '@mantine/core'
import { FC, useState } from 'react'
import {
  RewardEntity,
  WaitingEntity,
  WaitingRewardEntity,
} from '../../../generated/graphql'
import { useConsumeReward } from '../../../hooks/resources/useConsumeWaitingReward'
import { useWaitingRewards } from '../../../hooks/resources/useWaitingRewards'
import { EButton } from '../../01_elements/EButton'
import { ELoader } from '../../01_elements/ELoader'
import { EText } from '../../01_elements/EText/base'
import { TModalRewardConfirmConsumptionTemplate } from '../../03_templates/TModalRewardConfirmConsumptionTemplate'

type Props = BoxProps & {
  waiting: WaitingEntity
  reward: RewardEntity
}

const Component: FC<Props> = ({ waiting, reward }) => {
  const { waitingRewards, waitingRewardsIsLoading, waitingRewardsError } =
    useWaitingRewards({
      rewardUniqueKey: reward.uniqueKey,
    })

  if (!reward.consumeable) {
    return (
      <Flex direction="column" my={0} px={16} justify="center" align="center">
        <EButton.Sm disabled={true} fillType="disabled">
          OpenseaでNFTを見る(準備中)
        </EButton.Sm>
      </Flex>
    )
  } else {
    if (waitingRewardsError) {
      return (
        <Flex direction="column" my={0} px={16} justify="center" align="center">
          <EButton.Sm fillType="disabled">
            エラーのため使用できません
          </EButton.Sm>
        </Flex>
      )
    }

    if (waitingRewardsIsLoading || !waitingRewards) {
      return (
        <>
          <Flex
            direction="column"
            my={0}
            px={16}
            justify="center"
            align="center"
          >
            <EButton.Sm fillType="disabled">
              <ELoader size="xs" />
            </EButton.Sm>
          </Flex>
        </>
      )
    }

    const consumeableWaitingRewards = waitingRewards.filter(
      (wr) => wr.consumedAt === null && wr.consumeable
    )

    if (consumeableWaitingRewards.length === 0) {
      return (
        <Flex direction="column" my={0} px={16} justify="center" align="center">
          <EButton.Sm fillType="disabled">
            使用可能なリワードはありません
          </EButton.Sm>
        </Flex>
      )
    }

    return (
      <Box px={16}>
        <Button
          waiting={waiting}
          waitingRewards={consumeableWaitingRewards}
          reward={reward}
        />
      </Box>
    )
  }
  return <></>
}

export { Component as ORewardConsumeButton }

type ButtonProps = {
  waiting: WaitingEntity
  waitingRewards: WaitingRewardEntity[]
  reward: RewardEntity
}

const Button: FC<ButtonProps> = ({ waiting, waitingRewards, reward }) => {
  // 先頭のものを　利用対象に抽出
  const waitingReward = waitingRewards[0]

  const {
    isRewardConsumeable,
    isRewardConsumeableError,
    isRewardConsumeableIsLoading,
    consumeRewardErrorType,
    consumeReward,
  } = useConsumeReward({ uniqueKey: waitingReward.uniqueKey })

  if (isRewardConsumeableError) {
    return (
      <Flex direction="column" my={0} px={16} justify="center" align="center">
        <EButton.Sm fillType="disabled">Consumeableエラー</EButton.Sm>
      </Flex>
    )
  }

  if (isRewardConsumeableIsLoading || !isRewardConsumeable)
    return (
      <Flex direction="column" my={0} px={16} justify="center" align="center">
        <EButton.Sm fillType="disabled">Loading...</EButton.Sm>
      </Flex>
    )

  return (
    <>
      <ModalRewardConsumptionScreen
        waiting={waiting}
        waitingReward={waitingReward}
      />
      <EText.Desc1 mt={8} ta="center">
        {waitingRewards.length}回使用可能
      </EText.Desc1>
    </>
  )
}

type ModalRewardConsumptionScreenProps = {
  waiting: WaitingEntity
  waitingReward: WaitingRewardEntity
}
const ModalRewardConsumptionScreen: FC<ModalRewardConsumptionScreenProps> = ({
  waiting,
  waitingReward,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Box mt={24} px={16}>
        <EButton.Lg
          w="100%"
          onClick={() => {
            setIsOpen(true)
          }}
        >
          利用する
        </EButton.Lg>

        <TModalRewardConfirmConsumptionTemplate
          waiting={waiting}
          waitingReward={waitingReward}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </Box>
    </>
  )
}
