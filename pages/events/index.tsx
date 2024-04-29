import { Box } from '@chakra-ui/react'
import { useEvents } from '../../hooks/resources/useEvents'
import { NextPageWithLayout } from '../_app'
import ApplicationLayout from '../../partials/common/ApplicationLayout'
import Link from 'next/link'

const Page: NextPageWithLayout = () => {
  const { events } = useEvents()
  return (
    <>
      <Box>
        {events?.map((event) => {
          return (
            <Box key={event.uniqueKey} my={2} fontSize={18}>
              <Link href={`/events/${event.uniqueKey}`}>{event.name}</Link>
            </Box>
          )
        })}
      </Box>
    </>
  )
}

Page.getLayout = ApplicationLayout

export default Page
