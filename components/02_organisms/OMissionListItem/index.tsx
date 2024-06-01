import { Box, Flex, Text } from '@mantine/core'
import Image from 'next/image'
import { FC } from 'react'
import { BoosterEntity, WaitingEntity } from '../../../generated/graphql'
import { waitingMissionUrl } from '../../../helpers/url.helper'
import { colorScheme } from '../../../theme/colorScheme'
import { EButton } from '../../01_elements/EButton'
import { OBoosterMultiplier } from '../OBoosterMultiplier'

type Props = {
  waiting: WaitingEntity
  booster: BoosterEntity
  isFirst?: boolean
  isLast?: boolean
}

const Component: FC<Props> = ({
  waiting,
  booster,
  isFirst = false,
  isLast = false,
}) => {
  return (
    <Box
      pt={isFirst ? 0 : 24}
      pb={isLast ? 0 : 24}
      style={
        isLast
          ? {}
          : {
              borderBottom: 'solid',
              borderBottomColor: colorScheme.scheme1.border.mid,
              borderBottomWidth: '1px',
            }
      }
    >
      <Text component="h4" fz={16} fw={900} lh={1}>
        {booster.missionName}
      </Text>
      <Flex justify="space-between" mt={12}>
        <Flex align="center">
          <Box fz={10} fw={800}>
            成功報酬
          </Box>
          <Flex align="center" ml={16}>
            {booster.iconUrl && (
              <Image
                src={booster.iconUrl}
                alt={booster.name}
                width={16}
                height={16}
              />
            )}
            <Box ml={8} fz={12} fw={700}>
              {booster.name}
            </Box>
          </Flex>
        </Flex>

        <OBoosterMultiplier booster={booster} />
      </Flex>
      <Box mt={8} fz={12} c={colorScheme.scheme1.surface1.object.mid}>
        {booster.missionDescription}
      </Box>
      <EButton.Sm
        mt={16}
        href={waitingMissionUrl(waiting.uniqueKey, booster.uniqueKey)}
      >
        MISSION 詳細
      </EButton.Sm>
    </Box>
  )
}

export { Component as OMissionListItem }
