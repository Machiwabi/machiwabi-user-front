import { FC } from 'react'
import { useBoosters } from '../../hooks/resources/useBoosters'
import { useExchangeBooster } from '../../hooks/resources/useExchangeBooster'
import { LoadingTemplate } from '../templates/LoadingTemplate'
import { Box, Flex } from '@chakra-ui/react'

type Props = {
  eventUniqueKey: string
}

const Component: FC<Props> = ({ eventUniqueKey }) => {
  const { boosters, boostersIsLoading, boostersError } = useBoosters({
    eventUniqueKey,
  })

  const { exchangeBooster } = useExchangeBooster()

  const buyBooster = async (eventUniqueKey: string) => {
    try {
      await exchangeBooster({
        uniqueKey: eventUniqueKey,
      })
    } catch (e) {
      console.error(e)
    }
  }

  if (boostersError) return <>読み込みエラー</>
  if (!boosters || boostersIsLoading) return <LoadingTemplate />

  return (
    <>
      {boosters.map((booster) => {
        return (
          <Flex
            key={booster.uniqueKey}
            align="center"
            justify="space-between"
            my={3}
            _hover={{ opacity: 0.3 }}
            cursor="pointer"
            onClick={() => buyBooster(booster.uniqueKey)}
            transitionDuration="0.2s"
          >
            <Box>
              <Box fontSize={16}>{booster.name}</Box>
              <Box fontSize={12}>{booster.description}</Box>
            </Box>
            <Box>
              <Box fontSize={16}>
                <Box as="span" mr={1} fontSize={12}>
                  x
                </Box>

                {booster.multiplier}
                <Box as="span" ml={2} fontSize={12}>
                  倍
                </Box>
              </Box>
            </Box>
          </Flex>
        )
      })}
    </>
  )
}

export { Component as BoosterList }
