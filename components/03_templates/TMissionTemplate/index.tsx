import { Box, BoxProps, Flex } from '@mantine/core'
import Image from 'next/image'
import { FC } from 'react'
import {
  BoosterEntity,
  BoosterType,
  WaitingEntity,
} from '../../../generated/graphql'
import { dateConverter } from '../../../utils/dateConverter'
import { EDefinitionTerm } from '../../01_elements/EDefinitionTerm'
import { EHeading } from '../../01_elements/EHeading/base'
import { EText } from '../../01_elements/EText/base'
import { OBoosterMultiplier } from '../../02_organisms/OBoosterMultiplier'
import { Mission } from './Mission'
import { Pay } from './Pay'

type Props = BoxProps & {
  booster: BoosterEntity
  waiting: WaitingEntity
}

const Component: FC<Props> = ({ waiting, booster, ...props }) => {
  return (
    <>
      <Box {...props}>
        <Box mb={40}>
          <EHeading.Page>{booster.missionName}</EHeading.Page>
          <EText.Desc1 mt={16}>{booster.missionDescription}</EText.Desc1>
        </Box>
        <Box mb={40}>
          <EHeading.SectionJa>成功報酬</EHeading.SectionJa>
          <Flex align="center" my={16}>
            {booster.iconUrl && (
              <Box
                w={24}
                h={24}
                style={{ borderRadius: 4, overflow: 'hidden' }}
              >
                <Image
                  src={booster.iconUrl}
                  alt={booster.name}
                  width={24}
                  height={24}
                />
              </Box>
            )}
            <Box fz={14} fw={700} ml={8}>
              ツイートの印
            </Box>
          </Flex>
          <Box mt={16}>
            <Flex justify="space-between" align="center">
              <EDefinitionTerm term="ポイント上昇数" tooltip="ツイートの印" />
              <OBoosterMultiplier booster={booster} />
            </Flex>
            <Flex mt={4} justify="space-between" align="center">
              <EDefinitionTerm
                term="利用可能間隔"
                tooltip="再びチャレンジするまでの待ち時間です"
              />
              <Flex align="center">
                {booster.recoveryDurationSeconds > 0 ? (
                  <Box fz={10} lh={1} fw={700}>
                    {dateConverter.msToMMDDSS(
                      booster.recoveryDurationSeconds * 1000
                    )}
                  </Box>
                ) : (
                  <Box fz={10} lh={1} fw={700}>
                    待たずに何度でも
                  </Box>
                )}
              </Flex>
            </Flex>
          </Box>
        </Box>

        <Box my={40}>
          <EHeading.SectionJa>ミッション内容</EHeading.SectionJa>
          <EText.Desc1 mt={16}>{booster.missionMdxContent}</EText.Desc1>
        </Box>

        {booster.boosterType === BoosterType.Mission && (
          <Mission waiting={waiting} booster={booster} mt={40} />
        )}

        {booster.boosterType === BoosterType.Pay && (
          <Pay waiting={waiting} booster={booster} mt={40} />
        )}
      </Box>
    </>
  )
}

export { Component as TMissionTemplate }
