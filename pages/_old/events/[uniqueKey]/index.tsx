import { Box, Button, Flex, Heading } from '@chakra-ui/react'
import { FC, Fragment } from 'react'
import { SWRConfig, unstable_serialize } from 'swr'
import { LoadingTemplate } from '../../../../components/templates/LoadingTemplate'
import { EventQuery, EventQueryVariables } from '../../../../generated/graphql'
import { useEvent } from '../../../../hooks/resources/useEvent'
import { useJoinWaiting } from '../../../../hooks/resources/useJoinWaiting'
import ApplicationLayout from '../../../../partials/common/ApplicationLayout'
import { EventRepository } from '../../../../repositories/EventRepository'
import { NextPageWithLayout } from '../../../_app'

type SWRFallbackValue = {
  [key: string]: EventQuery
}

type Props = {
  uniqueKey: string
  event: EventQuery
  fallback: SWRFallbackValue
}

const Page: NextPageWithLayout<Props> = ({ uniqueKey, event, fallback }) => {
  return (
    <>
      <SWRConfig value={{ fallback }}>
        <MainBlock uniqueKey={uniqueKey} />
      </SWRConfig>
    </>
  )
}

Page.getLayout = ApplicationLayout

export default Page

// private components -------------------------

type MainBlockProps = {
  uniqueKey: string
}

const MainBlock: FC<MainBlockProps> = ({ uniqueKey }) => {
  const { event, eventError, eventIsLoading } = useEvent({ uniqueKey })

  if (eventError) return <>読み込みエラー</>
  if (!event || eventIsLoading) return <LoadingTemplate />

  return (
    <>
      <Box maxW="2xl" mx="auto" mt={6} px={{ base: 6, '2xl': 0 }}>
        {/* ショルダー */}
        <Heading as="h2" mb={2} fontSize={14}>
          招待されたイベント
        </Heading>
        {/* イベント名 */}
        <Heading as="h2" my={3} fontSize={24} fontWeight="black">
          {event?.name}
        </Heading>
        {/* 場所 */}
        <Flex align="center" justify="start" my={3}>
          <Box
            className="material-icons-outlined"
            as="i"
            ml={-1}
            color="project.support"
            fontSize={18}
          >
            location_on
          </Box>
          <Box ml={2} fontSize={14}>
            {event?.description}
          </Box>
        </Flex>
        <Box color="project.surface1.object.mid" fontSize={14}>
          {event?.mdxContent &&
            event?.mdxContent.split('\n').map((line, index) => (
              <Fragment key={index}>
                {line}
                <br />
              </Fragment>
            ))}
        </Box>

        <Box pb={24} />
        {/* float button */}
        <Flex
          pos="fixed"
          bottom={0}
          left={0}
          justify="center"
          w="100%"
          mt={6}
          pb={6}
        >
          <Box w="100%" maxW="2xl" px={6}>
            <JoinEventBlock uniqueKey={uniqueKey} />
          </Box>
        </Flex>
      </Box>
    </>
  )
}

const JoinEventBlock: FC<MainBlockProps> = ({ uniqueKey }) => {
  const { createJoinWaiting } = useJoinWaiting()

  const submit = async () => {
    const joinWaiting = await createJoinWaiting({ eventUniqueKey: uniqueKey })
    window.location.href = `/waitings/${joinWaiting.joinEvent.uniqueKey}`
  }

  return (
    <Button
      w="100%"
      h="56px"
      color="project.accentSurface1.object.high"
      bgColor="project.accentSurface1.surface"
      onClick={() => submit()}
    >
      待ち侘びに参加する
    </Button>
  )
}

// server side -----------------------------------------------

type Params = {
  params: {
    uniqueKey: string
  }
}

export const getServerSideProps = async ({ params }: Params) => {
  const variables: EventQueryVariables = {
    uniqueKey: params.uniqueKey,
  }

  try {
    const event = await EventRepository.findOne(variables)

    return {
      props: {
        uniqueKey: params.uniqueKey,
        event: event,
        fallback: {
          [unstable_serialize(['EventDocument', variables])]: event,
        },
      } as Props,
    }
  } catch (e: any) {
    if (e.constructor.name === 'NotFoundError') {
      return {
        notFound: true,
      }
    }
  }
}
