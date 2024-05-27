import { AspectRatio, Box, Divider } from '@mantine/core'
import { FC } from 'react'
import { useWaiting } from '../../../hooks/resources/useWaiting'
import { colorScheme } from '../../../theme/colorScheme'
import { ESectionHeading } from '../../01_elements/ESectionHeading'
import { EText } from '../../01_elements/EText/base'
import { OBoostersStatuses } from '../../02_organisms/OBoostersStatuses'
import { OWaitingUserListItem } from '../../02_organisms/OWaitingUserListItem'
import { TErrorTemplate } from '../../03_templates/TErrorTemplate'
import { TLoadingTemplate } from '../../03_templates/TLoadingTemplate'
import { WaitingMembersSubComponent } from './WaitingMembersSubComponent'

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
            boosters={waiting.waitingBoosters.map((wb) => wb.booster)} // TODO waitingBoosterを引数にする
          />
        </Box>
      </Box>

      <WaitingMembersSubComponent
        eventUniqueKey={waiting.event.uniqueKey}
        waitingUniqueKey={waiting.uniqueKey}
        my={40}
        px={16}
      />

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
