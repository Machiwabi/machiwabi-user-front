import { FC } from 'react'
import { EHeading } from '../../elements/EHeading/base'
import { EModal } from '../../elements/EModal'
import { EText } from '../../elements/EText/base'
import { AspectRatio, Box, Flex, SimpleGrid } from '@mantine/core'
import { colorScheme } from '../../../theme/colorScheme'

type Props = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const Component: FC<Props> = ({ isOpen, setIsOpen }) => {
  return (
    <EModal
      isOpen={isOpen}
      closedCallback={() => setIsOpen(false)}
      showCloseButton={true}
    >
      <EHeading.Page ta="center">デイリーミッションをクリア！</EHeading.Page>
      <SimpleGrid mt={16} cols={7} spacing={4}>
        {[...new Array(28)].map((_, i) => (
          <DailyListItem day={i + 1} isAccomplished={i < 4} />
        ))}
      </SimpleGrid>
      <EText.Desc2 mt={16} ta="center">
        毎日アクセスすると、
        <br />
        ポイント増加量が上昇します！
      </EText.Desc2>
    </EModal>
  )
}

export { Component as TModalDailyMissionTemplate }

type DailyListItemProps = {
  day: number
  isAccomplished: boolean
}

const DailyListItem: FC<DailyListItemProps> = ({ day, isAccomplished }) => {
  let bg = colorScheme.scheme1.surface2.surface
  let c = colorScheme.scheme1.surface2.object.inactive
  let fw = 500

  if (isAccomplished) {
    bg = colorScheme.scheme1.accent1.surface
    c = colorScheme.scheme1.accent1.object.high
    fw = 700
  }

  return (
    <AspectRatio>
      <Flex
        direction="column"
        align="center"
        justify="center"
        w="100%"
        h="100%"
        bg={bg}
        c={c}
        style={{ borderRadius: 4 }}
      >
        <Box lh={1} ff="outfit" fz={10} fw={700}>
          DAY
        </Box>
        <Box mt={2} lh={1} ff="outfit" fz={14} fw={fw}>
          {day}
        </Box>
      </Flex>
    </AspectRatio>
  )
}
