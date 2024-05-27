import { Anchor, Box, BoxProps, Breadcrumbs } from '@mantine/core'

import { FC } from 'react'
import { colorScheme } from '../../../theme/colorScheme'

type Props = BoxProps & {
  breadcrumbs: { title: string; href?: string }[]
}

const Component: FC<Props> = ({ breadcrumbs, ...props }) => {
  const items = breadcrumbs.map((item, index) => {
    if (index === breadcrumbs.length - 1) {
      return (
        <Box fz={10} key={index} c={colorScheme.scheme1.surface1.object.mid}>
          {item.title}
        </Box>
      )
    } else {
      return (
        <Anchor
          fz={10}
          href={item.href}
          key={index}
          c={colorScheme.scheme1.surface1.object.low}
        >
          {item.title}
        </Anchor>
      )
    }
  })

  return (
    <Box {...props}>
      <Breadcrumbs fz={10}>{items}</Breadcrumbs>
      {/* <Breadcrumbs separator="→" separatorMargin="md" mt="xs">
        {items}
      </Breadcrumbs> */}
    </Box>
  )
}

export { Component as EBreadcrumb }
