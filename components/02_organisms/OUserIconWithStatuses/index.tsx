import { Box, Flex, Image, Text } from '@mantine/core'
import { FC } from 'react'
import { WaitingService } from '../../../domains/services/waiting.service'
import { WaitingEntity } from '../../../generated/graphql'
import { colorScheme } from '../../../theme/colorScheme'
import { dateConverter } from '../../../utils/dateConverter'
import { OCountBaloonAnimation } from '../OCountBaloonAnimation'

type Props = {
  waiting: WaitingEntity
  animationEnabled?: boolean
}

const Component: FC<Props> = ({ waiting, animationEnabled = true }) => {
  const waitingService = new WaitingService(waiting)
  return (
    <Flex align="center">
      <Box pos="relative">
        <Flex
          pos="absolute"
          top={0}
          left={0}
          w="100%"
          justify="center"
          style={{ zIndex: 100 }}
        >
          <OCountBaloonAnimation
            addableTotalPoint={waitingService.earnableTotalPoint()}
            isBoosting={waitingService.isBoosting()}
            animationEnabled={animationEnabled}
          />
        </Flex>
        <Box
          pos="relative"
          w={56}
          h={56}
          bg={colorScheme.scheme1.surface2.surface}
          style={
            waitingService.isBoosting()
              ? {
                  borderRadius: 56 / 2,
                  overflow: 'hidden',
                  borderWidth: '2px',
                  borderStyle: 'solid',
                  borderColor: colorScheme.scheme1.accent2.surface,
                }
              : { borderRadius: 56 / 2, overflow: 'hidden' }
          }
        >
          <Image
            src={
              waiting.user.iconImageUrl ||
              '/assets/images/picture/picture_user-profile-fallback.png'
            }
          />
          {/* NextImageとreact-virtualの組み合わせでの相性が悪いのでNextImageを一旦回避 */}
          {/* <NextImage
            src={
              waiting.user.iconImageUrl ||
              '/assets/images/picture/picture_user-profile-fallback.png'
            }
            alt="icon"
            width={56}
            height={56}
            key={waiting.user.iconImageUrl || 'fallback'}
            priority
          /> */}
        </Box>
      </Box>

      <Box ml={16}>
        <Text fz={16} ff="outfit" fw={700}>
          {waiting.user.displayName || 'guest'}
        </Text>
        <Text fz={10} ff="outfit" fw={700}>
          待ち時間：{dateConverter.msToMMDDSS(waiting.waitingDuration)}
        </Text>
      </Box>
    </Flex>
  )
}

export { Component as OUserIconWithStatuses }
