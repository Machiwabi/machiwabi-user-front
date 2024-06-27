import { SimpleGrid, SimpleGridProps } from '@mantine/core'
import { FC, useRef } from 'react'
import { WaitingEntity } from '../../../generated/graphql'
import { OWaitingUserListItem } from '../OWaitingUserListItem'
import { useVirtualizer } from '@tanstack/react-virtual'

type Props = SimpleGridProps & {
  waitings: WaitingEntity[]
  containerHeight: number
  animationEnabled?: boolean
}

const Component: FC<Props> = ({
  waitings,
  containerHeight,
  animationEnabled = true,
  ...props
}) => {
  const parentRef = useRef<HTMLDivElement>(null)

  const rowVirtualizer = useVirtualizer({
    count: waitings.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 56 + 16,
    overscan: 5,
  })

  return (
    <>
      <SimpleGrid
        px={16}
        spacing={16}
        ref={parentRef}
        style={{
          paddingTop: '8px',
          height: containerHeight,
          paddingBottom: '32px',
          overflow: 'auto',
        }}
        {...props}
      >
        <div
          style={{
            width: '100%',
            height: `${rowVirtualizer.getTotalSize()}px`,
            position: 'relative',
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualItem) => {
            return (
              <>
                <div
                  key={virtualItem.key}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: `${virtualItem.size}px`,
                    transform: `translateY(${virtualItem.start}px)`,
                  }}
                >
                  <OWaitingUserListItem
                    key={waitings[virtualItem.index].uniqueKey}
                    waiting={waitings[virtualItem.index]}
                    rank={virtualItem.index + 1}
                    animationEnabled={animationEnabled}
                  />
                </div>
              </>
            )
          })}
        </div>
      </SimpleGrid>
    </>
  )

  return (
    <>
      <SimpleGrid px={16} spacing={16} ref={parentRef}>
        {waitings.map((waiting, index) => {
          return (
            <OWaitingUserListItem
              key={waiting.uniqueKey}
              waiting={waiting}
              rank={index + 1}
              animationEnabled={animationEnabled}
            />
          )
        })}
      </SimpleGrid>
    </>
  )

  return (
    <>
      {/* The scrollable element for your list */}
      <div
        ref={parentRef}
        style={{
          height: `400px`,
          overflow: 'auto', // Make it scroll!
        }}
      >
        {/* The large inner element to hold all of the items */}
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {/* Only the visible items in the virtualizer, manually positioned to be in view */}
          {rowVirtualizer.getVirtualItems().map((virtualItem) => (
            <div
              key={virtualItem.key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              Row {virtualItem.index}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export { Component as OWaitingUserList }
