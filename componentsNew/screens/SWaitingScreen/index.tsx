import { AspectRatio, Box, Divider, Flex, ScrollArea } from '@mantine/core'
import { FC } from 'react'
import { BoosterType } from '../../../generated/graphql'
import { colorScheme } from '../../../theme/colorScheme'
import { ESectionHeading } from '../../elements/ESectionHeading'
import { EText } from '../../elements/EText/base'
import { OBoostersStatuses } from '../../organisms/OBoostersStatuses'
import { OUserIcon } from '../../organisms/OUserIcon'
import { OWaitingUserListItem } from '../../organisms/OWaitingUserListItem'
import { useWaiting } from '../../../hooks/resources/useWaiting'
import { TErrorTemplate } from '../../templates/TErrorTemplate'
import { TLoadingTemplate } from '../../templates/TLoadingTemplate'

type Props = {
  waitingUniqueKey: string
}

const Component: FC<Props> = ({ waitingUniqueKey }) => {
  const { waiting, waitingError, waitingIsLoading } = useWaiting({
    uniqueKey: waitingUniqueKey,
  })

  if (waitingError) return <TErrorTemplate />
  if (waitingIsLoading || !waiting) return <TLoadingTemplate />

  return (
    <>
      <Box px={16}>
        <AspectRatio
          w="100%"
          bg="black"
          style={{ borderRadiusTopleft: 16, MozBorderRadiusTopright: 16 }}
        >
          <Box w="100%" h="100%" />
        </AspectRatio>

        <Box p={16} bg={colorScheme.scheme1.surface2.surface}>
          <OWaitingUserListItem waiting={waiting} />
          <Divider my={16} />
          <OBoostersStatuses
            secondPerTotalPoints={10}
            secondsPerWaitingPoint={10}
            boosters={[
              {
                name: 'booster1',
                uniqueKey: 'booster1',
                iconUrl: '/assets/images/_sample/picture_ranking_01.png',
                boosterType: BoosterType.Mission,
                durationSeconds: 10,
                emoji: '😄',
                multiplier: 1.5,
              },
              {
                name: 'booster2',
                uniqueKey: 'booster2',
                iconUrl: '/assets/images/_sample/picture_ranking_02.png',
                boosterType: BoosterType.Mission,
                durationSeconds: 10,
                emoji: '😄',
                multiplier: 1.5,
              },
              {
                name: 'booster3',
                uniqueKey: 'booster3',
                iconUrl: '/assets/images/_sample/picture_ranking_03.png',
                boosterType: BoosterType.Mission,
                durationSeconds: 10,
                emoji: '😄',
                multiplier: 1.5,
              },
            ]}
          />
        </Box>
      </Box>

      <Box component="section" my={40} px={16}>
        <ESectionHeading
          heading="WAITING MEMBERS - 32"
          tooltip={<>同じイベントを待っているユーザー一覧です</>}
          moreAction={() => {
            alert('more')
          }}
        />
        <Box mt={8}>
          <ScrollArea scrollbarSize={0}>
            <Flex gap={4}>
              {[...Array(26)].map((_, index) => {
                return (
                  <OUserIcon
                    displayName="a"
                    w={32}
                    h={32}
                    iconImageUrl={`/assets/images/_sample/picture_ranking_0${
                      (index % 9) + 1
                    }.png`}
                  />
                )
              })}
            </Flex>
          </ScrollArea>
        </Box>
      </Box>
      <Box component="section" my={40} px={16}>
        <ESectionHeading
          heading="MESSAGE"
          tooltip={<>hanzochangさんがイベントにかける思いです</>}
        />
        <Box mt={8}>
          <EText.Desc1>
            ＊＊を推しています。＊＊を推しています。＊＊を推しています。＊＊を推しています。＊＊を推しています。＊＊を推しています。
          </EText.Desc1>
        </Box>
      </Box>
    </>
  )
}

export { Component as SWaitingScreen }
