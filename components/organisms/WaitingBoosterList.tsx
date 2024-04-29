import { FC, useCallback, useEffect, useState } from 'react'
import { WaitingBoosterEntity } from '../../generated/graphql'
import { Box, Flex, Progress } from '@chakra-ui/react'
import { useMask } from '@react-three/drei'
import { useCall } from 'wagmi'
import { msToMMDDSS } from '../../utils/msToMMDDSS'

type Props = {
  waitingBoosters: WaitingBoosterEntity[]
}

const Component: FC<Props> = ({ waitingBoosters }) => {
  return (
    <Box px={6}>
      {waitingBoosters.map((waitingBooster, index) => (
        <WaitingBoosterListItem
          key={`${waitingBooster.uniqueKey}+${index}`}
          waitingBooster={waitingBooster}
        />
      ))}
    </Box>
  )
}

export { Component as WaitingBoosterList }

// private component

type WaitingBoosterListItemProps = {
  waitingBooster: WaitingBoosterEntity
}

const WaitingBoosterListItem: FC<WaitingBoosterListItemProps> = ({
  waitingBooster,
}) => {
  const [progress, setProgress] = useState(0)
  const [diffMs, setDiffMs] = useState(0)

  const calcDiffMs = () => {
    if (new Date().getTime() > new Date(waitingBooster.endAt).getTime()) {
      return 0
    } else {
      return new Date(waitingBooster.endAt).getTime() - new Date().getTime()
    }
  }

  const calcProgress = () => {
    if (new Date().getTime() > new Date(waitingBooster.endAt).getTime()) {
      return 100
    } else {
      const numerator =
        new Date().getTime() - new Date(waitingBooster.startAt).getTime()
      const denominator =
        new Date(waitingBooster.endAt).getTime() -
        new Date(waitingBooster.startAt).getTime()

      return (numerator / denominator) * 100
    }
  }

  useEffect(() => {
    setProgress(calcProgress())
    setDiffMs(calcDiffMs())
  }, [])

  return (
    <>
      <Flex>
        <Box fontSize={28}>{waitingBooster.booster.emoji}</Box>
        <Box flex="1" ml={3}>
          <Flex key={waitingBooster.uniqueKey} justify="space-between" mt={2}>
            <Flex align="center">
              <Box fontSize={12} fontWeight="600">
                {waitingBooster.booster?.name}
              </Box>
            </Flex>
          </Flex>

          <Flex
            key={waitingBooster.uniqueKey}
            align="center"
            justify="space-between"
            my={1}
          >
            <Box w="100%">
              <Progress value={progress} h={0.5} />
            </Box>
          </Flex>
          <Flex align="center">
            <Box
              mr={1}
              fontSize={10}
              bg="blue"
              color="white"
              px={1}
              borderRadius={4}
            >
              + {(waitingBooster.booster.multiplier - 1).toLocaleString()}WABI /
              10sec
            </Box>
            <Box fontSize={10}>有効時間{msToMMDDSS(diffMs)}</Box>
          </Flex>
        </Box>
      </Flex>
    </>
  )
}
