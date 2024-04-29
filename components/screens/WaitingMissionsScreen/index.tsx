import { Box, BoxProps, Button, Flex, useToast } from '@chakra-ui/react'
import { FC, useState } from 'react'
import { useBoosters } from '../../../hooks/resources/useBoosters'
import { useExchangeBooster } from '../../../hooks/resources/useExchangeBooster'
import { LoadingTemplate } from '../../templates/LoadingTemplate'
import { msToMMDDSS } from '../../../utils/msToMMDDSS'
import { useWaiting } from '../../../hooks/resources/useWaiting'
import {
  BoosterEntity,
  BoosterType,
  WaitingEntity,
} from '../../../generated/graphql'
import Image from 'next/image'
import { useProvisionBooster } from '../../../hooks/resources/useProvisionOffer'
import { useAuthenticatedStore } from '../../../recoil/authenticatedStore/useAuthenticatedStore'
import { useAccount } from 'wagmi'

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
          ミッションを実行する
        </Box>
        <Box mt={6} pl={{ base: 6, md: 0 }}>
          <BoosterList
            waiting={waiting}
            eventUniqueKey={waiting.event?.uniqueKey}
          />
        </Box>
      </Box>
    </>
  )
}

export { Component as WaitingMissionsScreen }

// private components -------------------------

type BoosterListProps = BoxProps & {
  waiting: WaitingEntity
  eventUniqueKey: string
}

const BoosterList: FC<BoosterListProps> = ({
  waiting,
  eventUniqueKey,
  ...props
}) => {
  const { boosters, boostersIsLoading, boostersError } = useBoosters({
    eventUniqueKey,
  })

  if (boostersError) return <>読み込みエラー</>
  if (!boosters || boostersIsLoading) return <LoadingTemplate />

  return (
    <>
      {boosters.map((booster) => (
        <MissionList
          waiting={waiting}
          booster={booster}
          key={booster.uniqueKey}
        />
      ))}
    </>
  )
}

type MissionListProps = {
  waiting: WaitingEntity
  booster: BoosterEntity
}

const MissionList: FC<MissionListProps> = ({ waiting, booster }) => {
  const { authenticated } = useAuthenticatedStore()
  const { provisionBooster } = useProvisionBooster()
  const [isExpanded, setIsExpanded] = useState(false)

  const { address } = useAccount()

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded)
  }

  const buyBooster = async (eventUniqueKey: string) => {
    try {
      const redirectUri = await provisionBooster({
        boosterUniqueKey: booster.uniqueKey,
        waitingUniqueKey: waiting.uniqueKey,
      })

      window.location.href = redirectUri.url
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      <Flex
        key={booster.uniqueKey}
        align="center"
        justify="space-between"
        mb={4}
        pr={6}
        pb={4}
        pl={{ base: 0, md: 6 }}
        borderBottom="project.border.border1"
        borderBottomWidth={1}
        _hover={isExpanded ? {} : { opacity: 0.3 }}
        cursor={isExpanded ? '' : 'pointer'}
        //
        onClick={() => {
          if (!isExpanded) toggleAccordion()
        }}
        transitionDuration="0.2s"
      >
        {/* name */}
        <Box w="100%">
          <Flex align="start">
            <Box
              fontSize={14}
              fontWeight="bold"
              w="56px"
              h="56px"
              borderRadius={4}
              overflow="hidden"
            >
              <Image
                src={`${booster.iconUrl}`}
                alt="booster"
                width={56}
                height={56}
              />
            </Box>
            <Box flex="1" ml={2} w="100%">
              <Box fontSize={14} fontWeight="bold">
                {booster.missionName}
              </Box>
              <Box mt={1} color="project.surface1.object.low" fontSize={12}>
                {booster.missionDescription}
              </Box>
              {/* 成功報酬 */}
              <Box mt={6} w="100%">
                <Box fontSize={14} fontWeight="bold">
                  成功報酬：{booster.emoji} {booster.name}
                </Box>
                <Flex mt={0.5}>
                  <Flex align="flex-end">
                    {booster.durationSeconds && (
                      <Box as="span" fontSize={12}>
                        {msToMMDDSS(booster.durationSeconds * 1000)}の間
                      </Box>
                    )}
                  </Flex>

                  <Flex align="flex-end" ml={2}>
                    <Box as="span" fontSize={12} fontWeight="bold" color="blue">
                      +{booster.multiplier.toLocaleString()}
                    </Box>
                    <Box as="span" pl={1} fontSize={12}>
                      WABI 上昇
                    </Box>
                  </Flex>
                </Flex>
              </Box>
              {/* 詳細 */}
              <Flex
                mt={3}
                fontSize={12}
                display={isExpanded ? 'none' : 'flex'}
                align="center"
              >
                <Box as="span">タップして詳細を見る</Box>
                <Box
                  className="material-icons-outlined"
                  as="i"
                  borderRadius={16}
                  fontSize={18}
                >
                  {isExpanded ? 'expand_less' : 'expand_more'}
                </Box>
              </Flex>
              <Box w="100%" display={isExpanded ? 'block' : 'none'} mt={3}>
                <Box my={3} bg="rgba(0,0,0,0.03)" fontSize={14} p={3} w="100%">
                  <Box fontWeight="bold" fontSize={12}>
                    ミッション達成条件
                  </Box>
                  <Box fontSize={12}>{booster.missionMdxContent}</Box>
                </Box>
                {authenticated === 'authenticated' ? (
                  booster.boosterType === BoosterType.Pay ? (
                    waiting.user.eoaAddress?.toLowerCase() ===
                    address?.toLowerCase() ? (
                      <>
                        <Button
                          bg="blue"
                          fontWeight="bold"
                          fontSize={14}
                          color="white"
                          onClick={() => buyBooster(booster.uniqueKey)}
                        >
                          Stripeで購入
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          bg="blue"
                          fontWeight="bold"
                          fontSize={14}
                          color="white"
                          isDisabled={true}
                        >
                          自分の待ち侘びではないため購入できません
                        </Button>
                      </>
                    )
                  ) : (
                    <Button
                      width="100%"
                      onClick={() => buyBooster(booster.uniqueKey)}
                      isDisabled={true}
                    >
                      ミッションに取り組む
                    </Button>
                  )
                ) : (
                  <>
                    <Button width="100%" isDisabled={true}>
                      ウォレットに接続してください
                    </Button>
                  </>
                )}
              </Box>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </>
  )
}
