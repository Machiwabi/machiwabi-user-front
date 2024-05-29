import { Box, BoxProps, TextInput } from '@mantine/core'
import { FC } from 'react'
import { BoosterEntity, WaitingEntity } from '../../../generated/graphql'
import { EButton } from '../../01_elements/EButton'
import { EHeading } from '../../01_elements/EHeading/base'

type Props = BoxProps & {
  waiting: WaitingEntity
  booster: BoosterEntity
}

const Component: FC<Props> = ({ booster, ...props }) => {
  return (
    <>
      <Box {...props}>
        <EHeading.SectionJa>ミッション報告フォーム</EHeading.SectionJa>
        <TextInput mt={8} placeholder="Input placeholder" />
        <EButton.Sm mt={16} fillType="filled" surface="surface3">
          報告する
        </EButton.Sm>
      </Box>
    </>
  )
}

export { Component as Mission }
