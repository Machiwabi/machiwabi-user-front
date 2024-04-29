import { Box, Flex } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { WaitingEntity } from '../../../generated/graphql'
import { useWaitingSiblings } from '../../../hooks/resources/useWaitingSiblings'
import { msToMMDDSS } from '../../../utils/msToMMDDSS'
import { truncator } from '../../../utils/truncator'
import { LoadingTemplate } from '../../templates/LoadingTemplate'
import { WaitingService } from '../../../domains/services/waiting.service'

type Props = {
  eventUniqueKey: string
}

const Component: FC<Props> = ({ eventUniqueKey }) => {
  const { waitingSiblings, waitingSiblingError, waitingSiblingsIsLoading } =
    useWaitingSiblings({
      eventUniqueKey,
    })

  if (waitingSiblingError) return <>読み込みエラー</>
  if (waitingSiblingError || !waitingSiblings || waitingSiblingsIsLoading)
    return <LoadingTemplate />

  return (
    <>
      <Box mt={6} as="section" maxW="lg" mx="auto">
        <Box mb={6} px={6} fontSize={12} fontWeight="bold" textAlign="left">
          このイベントを待っている人
        </Box>
        {waitingSiblings.map((waiting, index) => {
          return <WaitingsListItem waiting={waiting} index={index + 1} />
        })}
      </Box>
    </>
  )
}

export { Component as WaitingMembersScreen }

type WaitingsListItemProps = {
  waiting: WaitingEntity
  index: number
}

const WaitingsListItem: FC<WaitingsListItemProps> = ({ waiting, index }) => {
  const waitingService = new WaitingService(waiting)

  return (
    <>
      <Link href={`/waitings/${waiting.uniqueKey}`}>
        <Flex mb={3} px={6} align="center" justify="space-between">
          {/* 名前 */}
          <Flex align="center" flex="1">
            <Box borderRadius={32} overflow="hidden" w="56px">
              <Image
                // src={`/assets/images/_sample/picture_ranking_0${index}.png`}
                src={
                  waiting.user.iconImageUrl ||
                  '/assets/images/_sample/picture_ranking_10.png'
                }
                alt="booster"
                width={'56'}
                height={'56'}
              />
            </Box>
            <Box ml={2} flex={1} overflow="hidden">
              <Box overflow="hidden" fontSize={14} fontWeight="bold">
                {waiting.user?.displayName}
              </Box>
              {waiting.waitingMessage && (
                <Flex
                  overflow="hidden"
                  align="center"
                  mt={1}
                  fontSize={12}
                  color="rgba(0,0,0,0.5)"
                >
                  <Box
                    className="material-icons-outlined"
                    as="i"
                    borderRadius={16}
                    fontSize={14}
                  >
                    comment
                  </Box>
                  <Box fontSize={10} ml={1} overflow="hidden" mb={0.5}>
                    {truncator.truncateString(waiting.waitingMessage, 20)}
                  </Box>
                </Flex>
              )}
            </Box>
          </Flex>
          {/* 時間 */}
          <Flex w="132px" direction="column" align="end" justify="end">
            <Flex mt={1} align="center" px={1} borderRadius={24}>
              <Box
                className="material-icons-outlined"
                as="i"
                borderRadius={16}
                fontSize={14}
              >
                hourglass_bottom
              </Box>
              <Box ml={1} mr="2px" fontSize={11}>
                {msToMMDDSS(waiting.waitingDuration)}
              </Box>
            </Flex>

            <Flex mt={1} align="center" px={1} borderRadius={24}>
              <Box
                className="material-icons-outlined"
                as="i"
                borderRadius={16}
                fontSize={14}
              >
                attach_money
              </Box>
              <Box ml={1} mr="2px" fontSize={11}>
                {waiting.totalPoint.toLocaleString()} WABI
              </Box>
            </Flex>

            <Flex mt={1} align="center" px={1} borderRadius={24}>
              <Box
                className="material-icons-outlined"
                as="i"
                borderRadius={16}
                fontSize={14}
              >
                timelapse
              </Box>
              <Box ml={1} mr="2px" fontSize={11}>
                {waitingService.earnableTotalPoint().toLocaleString()} WABI /
                10sec
              </Box>
            </Flex>
          </Flex>
        </Flex>
      </Link>
    </>
  )
}
