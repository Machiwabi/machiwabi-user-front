import { Box, Flex, Tooltip } from '@mantine/core'
import { FC, ReactNode, useState } from 'react'
import { colorScheme } from '../../../theme/colorScheme'
import { EHeading } from '../EHeading/base'
import styles from './style.module.scss'
import Link from 'next/link'

type Props = {
  heading: ReactNode
  tooltip?: ReactNode
  moreLabel?: string
  moreAction?: () => void
  moreHref?: string
  moreHrefOutbound?: boolean
}

const Component: FC<Props> = ({
  heading,
  tooltip,
  moreLabel,
  moreAction,
  moreHref,
  moreHrefOutbound,
}) => {
  const [opened, setOpened] = useState(false)
  return (
    <Flex justify="space-between">
      <Flex>
        <EHeading.Section>{heading}</EHeading.Section>
        {tooltip && (
          <Box ml={12}>
            <Tooltip label={tooltip} opened={opened}>
              <Box
                className={`material-icons-outlined ${styles['e-section-heading__info-icon']}`}
                fz={14}
                onClick={() => setOpened((o) => !o)}
                style={{ cursor: 'pointer' }}
              >
                info
              </Box>
            </Tooltip>
          </Box>
        )}
      </Flex>
      {moreAction && (
        <Box
          className={styles['e-section-heading__more']}
          fz={12}
          c={colorScheme.scheme1.surface1.object.inactive}
          style={{ cursor: 'pointer' }}
          onClick={moreAction}
        >
          {moreLabel || 'more'}
        </Box>
      )}
      {moreHref && (
        <>
          <Link href={moreHref}>
            <Box
              className={styles['e-section-heading__more']}
              fz={12}
              c={colorScheme.scheme1.surface1.object.inactive}
              style={{ cursor: 'pointer' }}
            >
              {moreLabel || 'more'}
            </Box>
          </Link>
        </>
      )}
    </Flex>
  )
}

export { Component as ESectionHeading }
