import { Box, Flex, Tabs, Text } from '@mantine/core'
import { FC } from 'react'
import styles from './style.module.scss'

export type ERollTabProps = {
  name: string
  isCurrent?: boolean
  displayName: string
  action: () => void
}

const Component: FC<ERollTabProps> = ({
  isCurrent = false,
  action,
  name,
  displayName,
}) => {
  return (
    <Tabs.Tab
      h={24 + 16 + 16}
      px={16}
      value={name}
      className={styles['e-roll-tab']}
    >
      <Flex
        direction="column"
        align="center"
        px={0}
        py={16}
        onClick={action}
        style={{ cursor: 'pointer' }}
      >
        <Box h={24}>
          <Text fz={12} fw={500} lh={1}>
            {displayName}
          </Text>
        </Box>
      </Flex>
    </Tabs.Tab>
  )
}

export { Component as ERollTab }
