import { SimpleGrid } from '@mantine/core'
import { FC } from 'react'
import { OWaitingListItem } from '../../organisms/OWaitingListItem'
import { waitingMock } from '../../../mocks/waiting.mock'

const Component: FC = () => {
  return (
    <>
      <SimpleGrid px={16} spacing={16}>
        <OWaitingListItem waiting={waitingMock} />
        <OWaitingListItem waiting={waitingMock} />
        <OWaitingListItem waiting={waitingMock} />
        <OWaitingListItem waiting={waitingMock} />
        <OWaitingListItem waiting={waitingMock} />
        <OWaitingListItem waiting={waitingMock} />
        <OWaitingListItem waiting={waitingMock} />
        <OWaitingListItem waiting={waitingMock} />
        <OWaitingListItem waiting={waitingMock} />
        <OWaitingListItem waiting={waitingMock} />
        <OWaitingListItem waiting={waitingMock} />
        <OWaitingListItem waiting={waitingMock} />
        <OWaitingListItem waiting={waitingMock} />
        <OWaitingListItem waiting={waitingMock} />
      </SimpleGrid>
    </>
  )
}

export { Component as SMembersScreen }
