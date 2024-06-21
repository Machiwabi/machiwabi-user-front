import { Box, BoxProps, Flex } from '@mantine/core'
import { FC } from 'react'
import { RewardEntity } from '../../../generated/graphql'
import { useRedeemReward } from '../../../hooks/resources/useRedeemReward'
import { EButton } from '../../01_elements/EButton'
import { dateConverter } from '../../../utils/dateConverter'
import { colorScheme } from '../../../theme/colorScheme'

type Props = BoxProps & {
  reward: RewardEntity
}

const Component: FC<Props> = ({ reward }) => {
  const {
    isRewardRedeemable,
    isRewardRedeemableError,
    isRewardRedeemableIsLoading,
    redeemReward,
  } = useRedeemReward({ uniqueKey: reward.uniqueKey })

  console.log('isRewardRedeemable', isRewardRedeemable)
  if (isRewardRedeemableIsLoading)
    return (
      <Flex direction="column" my={0} px={16} justify="center" align="center">
        <EButton.Sm fillType="disabled">Loading...</EButton.Sm>
      </Flex>
    )
  if (isRewardRedeemableError)
    return (
      <Flex direction="column" my={0} px={16} justify="center" align="center">
        <EButton.Sm fillType="disabled">Error</EButton.Sm>
      </Flex>
    )

  return (
    <Flex direction="column" my={0} px={16} justify="center" align="center">
      <EButton.Sm fillType="disabled">
        {dateConverter.yyyyMMddHHmmss(reward.startAt)}から交換可能
      </EButton.Sm>
      <Box mt={8} fz={10} c={colorScheme.scheme1.surface1.object.mid}>
        {reward.stockPerWaiting && reward.stockPerWaiting > 0 && (
          <>アカウントあたり{reward.stockPerWaiting}つまで引換可</>
        )}
        {reward.stockPerWaiting && reward.stock && <> ／ </>}
        {reward.stock && <>残り{reward.stock}個</>}
      </Box>
    </Flex>
  )
}

export { Component as ORewardRedeemButton }
