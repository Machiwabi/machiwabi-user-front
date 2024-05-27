import {
  Box,
  Button,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react'
import { FC, Fragment } from 'react'
import { EventEntity } from '../../../generated/graphql'
import { dateConverter } from '../../../utils/dateConverter'
import { msToCounterUnits } from '../../../utils/msToCounterUnits'

type Props = {
  event: EventEntity
  remainingEventStartDuration: number
}

const Component: FC<Props> = ({ event, remainingEventStartDuration }) => {
  // TODO event内部で計算できるようにする
  const remainingDurations = msToCounterUnits(remainingEventStartDuration)

  return (
    <Box>
      <Flex py={6} justify="center" bg={'rgba(0,0,0,0.02)'}>
        <Box>
          <Box fontSize={14} textAlign="center">
            X presents
          </Box>
          <Box my={0.5} fontSize={18} fontWeight="bold" textAlign="center">
            {event.name}
          </Box>
          <Box fontSize={10} textAlign="center">
            {dateConverter.yyyyMMddHHmmss(event.startAt)}
          </Box>
          <Flex mt={2} align="end" justify="center">
            <Box fontSize={14} mb={1} fontWeight="bold">
              あと
            </Box>
            <Box mx={3} fontSize={28} fontWeight="bold">
              {remainingDurations.days}
            </Box>
            <Box mr={3} fontSize={14} mb={1} fontWeight="bold">
              日
            </Box>
            <Box fontSize={28} fontWeight="bold">
              {remainingDurations.hours}
            </Box>
            <Box mx={1} fontSize={18} mb={1} fontWeight="bold">
              :
            </Box>
            <Box fontSize={28} fontWeight="bold">
              {remainingDurations.minutes}
            </Box>
            <Box mx={1} fontSize={18} mb={1} fontWeight="bold">
              :
            </Box>
            <Box fontSize={28} fontWeight="bold">
              {remainingDurations.seconds}
            </Box>

            <Box ml={3} fontSize={14} mb={1} fontWeight="bold">
              で開催
            </Box>
          </Flex>
        </Box>
      </Flex>
      <Tabs>
        <Box bg={'rgba(0,0,0,0.02)'}>
          <TabList maxW="lg" w="100%" mx="auto">
            <Tab w="33.33%" fontSize={12}>
              イベント概要
            </Tab>
            <Tab w="33.33%" fontSize={12}>
              イベント詳細
            </Tab>
            <Tab w="33.33%" fontSize={12}>
              開催場所
            </Tab>
          </TabList>
        </Box>
        <TabPanels minH={'600px'}>
          <TabPanel>
            <Box maxW="lg" mx="auto" py={3}>
              <Box mb={2} fontSize={18} fontWeight="bold" textAlign="center">
                {event.name}
              </Box>
              <Box color="project.surface1.object.mid" fontSize={14}>
                {event.mdxContent &&
                  event.mdxContent.split('\n').map((line, index) => (
                    <Fragment key={index}>
                      {line}
                      <br />
                    </Fragment>
                  ))}
              </Box>
            </Box>
          </TabPanel>
          <TabPanel>
            <Box maxW="lg" mx="auto" py={3}>
              <Box color="project.surface1.object.mid" fontSize={14}>
                {event.detailMdxContent &&
                  event.detailMdxContent.split('\n').map((line, index) => (
                    <Fragment key={index}>
                      {line}
                      <br />
                    </Fragment>
                  ))}
              </Box>
            </Box>
          </TabPanel>
          <TabPanel>
            <Box maxW="lg" mx="auto" py={3}>
              {event.placeName && (
                <Box mb={6}>
                  <Box fontWeight="black" mb={2} fontSize={14}>
                    開催場所
                  </Box>
                  <Box>{event.placeName}</Box>
                </Box>
              )}

              {event.lat && event.lng && (
                <Box my={9}>
                  <Box fontWeight="black" mb={2} fontSize={14}>
                    場所(オフライン)
                  </Box>
                  <Box>
                    <iframe
                      src={`https://www.google.com/maps?q=${event.placeName}@${event.lat},${event.lng}&z=15&output=embed`}
                      width="100%"
                      height="450"
                      loading="lazy"
                    />
                    <Button
                      as="a"
                      href={`https://www.google.com/maps/place/${event.placeName}/@${event.lat}@${event.lng},17z`}
                      target="_blank"
                      rel="noopener noreferrer"
                      w="100%"
                      mt={2}
                      borderRadius={0}
                      fontSize={12}
                    >
                      大きい地図で見る
                    </Button>
                  </Box>
                </Box>
              )}

              {event.onlineUrl && (
                <Box my={9}>
                  <Box fontWeight="black" mb={2} fontSize={14}>
                    場所(オンライン)
                  </Box>
                  <Box>{event.onlineUrl}</Box>
                </Box>
              )}
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

export { Component as EventTabsTemplate }
