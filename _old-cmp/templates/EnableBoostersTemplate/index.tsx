import { FC } from 'react'
import { WaitingEntity } from '../../../generated/graphql'
import { Box, Flex } from '@chakra-ui/react'
import { WaitingService } from '../../../domains/services/waiting.service'
import { WaitingBoosterList } from '../../organisms/WaitingBoosterList'

type Props = {
  waiting: WaitingEntity
}

const Component: FC<Props> = ({ waiting }) => {
  const waitingService = new WaitingService(waiting)

  return (
    <>
      {waiting.waitingBoosters && waiting.waitingBoosters.length > 0 && (
        <Box as="section" maxW="lg" pb={12} mx="auto">
          <Box fontSize={14} fontWeight="black" textAlign="center">
            現在有効なブースト
          </Box>
          {waitingService.enableBoosters().length > 0 && (
            <Flex justify="center">
              <Box
                display="inline-block"
                mr={1}
                fontSize={12}
                fontWeight="bold"
                px={1}
                borderRadius={4}
                color="blue"
              >
                合計 {waitingService.addableSumPoint().toLocaleString()}WABI /
                10sec
              </Box>
            </Flex>
          )}
          <Box mt={6} px={{ base: 6, md: 0 }}>
            {waitingService.enableBoosters().length > 0 ? (
              <WaitingBoosterList
                waitingBoosters={waiting.waitingBoosters.filter(
                  (waitingBooster) => {
                    return (
                      new Date(waitingBooster.endAt).getTime() >
                      new Date().getTime()
                    )
                  }
                )}
              />
            ) : (
              <>
                <Box
                  color="black"
                  borderWidth={2}
                  borderColor="project.border.border1"
                  p={6}
                >
                  <Box fontSize={14} textAlign="center" opacity={0.4}>
                    ミッションを達成するとブーストアイテムがもらえ、
                    WABIが貯まる速度が速くなります。
                    WABIはリワードの交換に使えます！
                  </Box>
                  {/* <Box mt={6} textAlign="center">
                    <Box
                      as="a"
                      href={`/waitings/${waiting.uniqueKey}/mission`}
                      mt={3}
                      fontSize={14}
                      textDecoration="underline"
                      _hover={{ opacity: 0.2 }}
                    >
                      ミッション一覧を見る
                    </Box>
                  </Box> */}
                </Box>
              </>
            )}
          </Box>
        </Box>
      )}
    </>
  )
}

export { Component as EnableBoostersTemplate }
