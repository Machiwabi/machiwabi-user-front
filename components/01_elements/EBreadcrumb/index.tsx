import { Box, BoxProps, Breadcrumbs } from '@mantine/core'

import Link from 'next/link'
import { FC } from 'react'
import { colorScheme } from '../../../theme/colorScheme'
import { EText } from '../EText/base'

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
        <Link href={item.href || ''} key={index}>
          <EText.Desc1 fz={10} c={colorScheme.scheme1.surface1.object.low}>
            {item.title}
          </EText.Desc1>
        </Link>
      )
    }
  })

  return (
    <Box {...props}>
      <Breadcrumbs fz={10}>{items}</Breadcrumbs>
    </Box>
  )
}

export { Component as EBreadcrumb }
