import { FC, useEffect, useState } from 'react'
import { EHeading } from '../../elements/EHeading/base'
import { EModal } from '../../elements/EModal'
import { EText } from '../../elements/EText/base'
import { AspectRatio, Box, Flex, SimpleGrid } from '@mantine/core'
import { colorScheme } from '../../../theme/colorScheme'
import { EButton } from '../../elements/EButton'
import { RewardEntity } from '../../../generated/graphql'
import Image from 'next/image'

type Props = {
  reward: RewardEntity
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const Component: FC<Props> = ({ reward, isOpen, setIsOpen }) => {
  return (
    <EModal
      isOpen={isOpen}
      closedCallback={() => setIsOpen(false)}
      showCloseButton={false}
    >
      <Box
        mt={-32}
        mx={-32}
        pb={8}
        style={{
          transitionDuration: '1s',
          transform: 'rotate(-180deg)',
        }}
      >
        {reward.iconUrl && (
          <AspectRatio ratio={1} w="100%" h="100%">
            <Flex
              pos="relative"
              w="100%"
              h="100%"
              align="center"
              justify="center"
              bg={colorScheme.scheme1.surface2.surface}
            >
              <Image
                src={
                  reward.iconUrl ||
                  '/assets/images/_sample/picture_ranking_01.png'
                } // TODO fallback image
                alt={reward.name}
                fill={true}
              />
            </Flex>
          </AspectRatio>
        )}
        <Box mt={4} ta="center" fz={12}>
          {reward.name}
        </Box>
      </Box>
      <EHeading.Page mt={16} ta="center" c={colorScheme.scheme1.notice.alert}>
        スタッフにこの画面を見せて確認後
        <br />
        「利用する」を押してください
      </EHeading.Page>
      <EText.Desc2 mt={8} ta="center" c={colorScheme.scheme1.notice.alert}>
        「利用する」押下後の取り消しはできません
      </EText.Desc2>
      <SimpleGrid mt={16} cols={2} spacing={4}>
        <EButton.Sm w="100%" surface="surface2" fillType="filled">
          キャンセル
        </EButton.Sm>
        <EButton.Sm w="100%" surface="accent2" fillType="filled">
          利用する
        </EButton.Sm>
      </SimpleGrid>
    </EModal>
  )
}

export { Component as TModalRewardConfirmConsumptionTemplate }
