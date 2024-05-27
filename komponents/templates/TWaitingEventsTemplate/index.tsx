import { FC, ReactNode } from 'react'
import { WaitingEntity } from '../../../generated/graphql'
import { Box, BoxProps } from '@mantine/core'
import { EHeading } from '../../elements/EHeading/base'
import { OWaitingCells } from '../../organisms/OWaitingCells'

type Props = BoxProps & {
  heading: ReactNode
  waitings: WaitingEntity[]
}

const Component: FC<Props> = ({ heading, waitings, ...props }) => {
  return (
    <>
      <Box {...props}>
        <EHeading.Section>{heading}</EHeading.Section>
        <OWaitingCells mt={12} waitings={waitings} />
      </Box>
    </>
  )
}

export { Component as TWaitingEventsTemplate }
