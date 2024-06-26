import { FC } from 'react'
import { ERollTab, ERollTabProps } from '../ERollTab'
import { Flex, ScrollArea } from '@mantine/core'

type Props = {
  tabs: ERollTabProps[]
}

const Component: FC<Props> = ({ tabs }) => {
  return (
    <>
      <ScrollArea scrollbarSize={0} mt={16} mb={8}>
        <Flex gap={0}>
          {tabs.map((tab) => (
            <>
              <ERollTab
                isCurrent={tab.isCurrent}
                action={tab.action}
                displayName={tab.displayName}
                name={tab.name}
              />
            </>
          ))}
        </Flex>
      </ScrollArea>
    </>
  )
}

export { Component as ERollTabs }
