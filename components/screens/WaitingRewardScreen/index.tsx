import {
  Box,
  BoxProps,
  Button,
  Flex,
  Progress,
  useToast,
} from '@chakra-ui/react'
import { FC } from 'react'
import { RewardEntity, WaitingEntity } from '../../../generated/graphql'
import { useExchangeReward } from '../../../hooks/resources/useRedeemReward'
import { useRewards } from '../../../hooks/resources/useRewards'
import { useWaiting } from '../../../hooks/resources/useWaiting'
import { LoadingTemplate } from '../../templates/LoadingTemplate'
import { useAuthenticatedStore } from '../../../recoil/authenticatedStore/useAuthenticatedStore'
import Image from 'next/image'
import { useAccount } from 'wagmi'
import { WaitingService } from '../../../domains/services/waiting.service'

type Props = {
  waitingUniqueKey: string
}

const Component: FC<Props> = ({ waitingUniqueKey }) => {
  const { waiting, waitingError, waitingIsLoading } = useWaiting({
    uniqueKey: waitingUniqueKey,
  })

  if (waitingError) return <>読み込みエラー</>
  if (!waiting || !waiting.event || waitingIsLoading) return <LoadingTemplate />

  return (
    <>
      <Box mt={6} as="section" maxW="lg" mx="auto">
        <Box mb={6} px={6} fontSize={12} fontWeight="bold" textAlign="left">
          リワード一覧
        </Box>
        <Box mt={6} pl={{ base: 6, md: 0 }}>
          <RewardList
            waiting={waiting}
            waitingUniqueKey={waiting.uniqueKey}
            eventUniqueKey={waiting.event?.uniqueKey}
          />
        </Box>
      </Box>
    </>
  )
}

export { Component as WaitingRewardScreen }

type RewardListProps = BoxProps & {
  waiting: WaitingEntity
  eventUniqueKey: string
  waitingUniqueKey: string
}

const RewardList: FC<RewardListProps> = ({
  waiting,
  eventUniqueKey,
  waitingUniqueKey,
  ...props
}) => {
  const { rewards, rewardsError, rewardsIsLoading } = useRewards({
    eventUniqueKey,
  })

  if (rewardsError) return <>読み込みエラー</>
  if (!rewards || rewardsIsLoading) return <LoadingTemplate />

  return (
    <>
      {rewards.map((reward) => (
        <>
          <RewardListItem waiting={waiting} reward={reward} />
        </>
      ))}
    </>
  )
}

type RewardListItemProps = {
  waiting: WaitingEntity
  reward: RewardEntity
}

const RewardListItem: FC<RewardListItemProps> = ({ waiting, reward }) => {
  const { authenticated } = useAuthenticatedStore()
  const { exchangeReward } = useExchangeReward()
  const toast = useToast()

  const { address } = useAccount()

  const waitingService = new WaitingService(waiting)

  const executeExchangeReward = async (rewardUniqueKey: string) => {
    try {
      await exchangeReward({ uniqueKey: rewardUniqueKey })

      toast({
        title: 'リワードを交換しました',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (e: any) {
      const error = e.response.errors[0]
      if (error && error.message) {
        toast({
          title: 'リワードの引き換えができませんでした。',
          description: error.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      }
    }
  }

  return (
    <>
      <Flex
        key={reward.uniqueKey}
        mb={3}
        pr={6}
        pb={4}
        pl={{ base: 0, md: 6 }}
        borderBottom="project.border.border1"
        borderBottomWidth={1}
        transitionDuration="0.2s"
      >
        <Box
          fontSize={14}
          fontWeight="bold"
          w="56px"
          h="56px"
          borderRadius={4}
          overflow="hidden"
        >
          <Image
            src={reward.iconUrl || ''}
            alt="booster"
            width={56}
            height={56}
          />
        </Box>
        {/* name */}
        <Box flex={1} ml={3}>
          <Box fontSize={14} fontWeight="bold">
            {reward.name}
          </Box>
          <Box mt={0} color="project.surface1.object.low" fontSize={12}>
            {reward.description}
          </Box>
          {reward.requiredTotalPoint && (
            <Flex my={1} align="center">
              <Box w="70%">
                <Progress
                  w="100%"
                  value={(waiting.totalPoint / reward.requiredTotalPoint) * 100}
                  h={0.5}
                  colorScheme="blue"
                />
              </Box>
              <Box w="30%" fontSize={10} textAlign="right">
                {reward.requiredTotalPoint?.toLocaleString()} WABIが必要
              </Box>
            </Flex>
          )}
          <Flex fontSize={10} mt={1} justify="space-between">
            <Box>
              のこり{reward.stockPerWaiting?.toLocaleString()}回購入可能
            </Box>
          </Flex>
          <Box mt={3}>
            {authenticated === 'authenticated' ? (
              waiting.user.eoaAddress?.toLowerCase() ===
              address?.toLowerCase() ? (
                waitingService.rewardClaimable(reward) ? (
                  <>
                    <Button
                      px={2}
                      bg="blue"
                      fontWeight="bold"
                      fontSize={12}
                      color="white"
                      onClick={() => executeExchangeReward(reward.uniqueKey)}
                    >
                      引き換える
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      px={2}
                      bg="blue"
                      fontWeight="bold"
                      fontSize={12}
                      color="white"
                      isDisabled={true}
                    >
                      WABIがたりません
                    </Button>
                  </>
                )
              ) : (
                <>
                  <Button
                    px={2}
                    fontWeight="bold"
                    fontSize={12}
                    isDisabled={true}
                  >
                    自分の待ち侘びではありません
                  </Button>
                </>
              )
            ) : (
              <Button px={2} width="100%" isDisabled={true} fontSize={12}>
                ウォレットに接続してください
              </Button>
            )}
          </Box>
        </Box>
      </Flex>
    </>
  )
}
