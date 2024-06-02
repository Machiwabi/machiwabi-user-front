import { AspectRatio, Box, BoxProps, Flex, Overlay } from '@mantine/core'
import Image from 'next/image'
import { FC, Fragment } from 'react'
import { EventEntity } from '../../../generated/graphql'
import { colorScheme } from '../../../theme/colorScheme'
import { dateHumanizer } from '../../../utils/dateHumanizer'
import { EButton } from '../../01_elements/EButton'
import { EHeading } from '../../01_elements/EHeading/base'
import { EText } from '../../01_elements/EText/base'

type Props = BoxProps & {
  event: EventEntity
}

const Component: FC<Props> = ({ event, ...props }) => {
  return (
    <>
      <Box {...props}>
        <AspectRatio mt={16} ratio={0.7}>
          <Box pos="relative" w="100%">
            {event.imageUrl ? (
              <>
                <Image
                  src={event.imageUrl}
                  layout="fill"
                  objectFit="cover"
                  alt={event.name || ''}
                />
              </>
            ) : (
              <>
                <Box
                  bg={colorScheme.scheme1.surface2.surface}
                  w="100%"
                  h="100%"
                />
              </>
            )}
          </Box>
        </AspectRatio>

        <Box mt={24} mb={16} px={16}>
          <EHeading.Page>{event.name}</EHeading.Page>
          <Flex align="center" mt={8}>
            <Box className="material-icons-outlined" component="i" fz={14}>
              location_on
            </Box>
            <Box ml={4} pb={2} fz={12}>
              {event.placeName}
            </Box>
          </Flex>
        </Box>

        <Box mb={40} px={16}>
          <EText.Desc2>{event.description}</EText.Desc2>
        </Box>

        <Box my={40} px={16}>
          <EHeading.Section>開催日時</EHeading.Section>
          <EText.Desc2 mt={8}>
            {dateHumanizer.jaFullLength(event.startAt)}
          </EText.Desc2>
        </Box>

        <Box my={40} px={16}>
          <EHeading.Section>イベント詳細</EHeading.Section>
          <EText.Desc2 mt={8}>
            {event.mdxContent &&
              event.mdxContent.split('\n').map((line, index) => (
                <Fragment key={index}>
                  {line}
                  <br />
                </Fragment>
              ))}
          </EText.Desc2>
        </Box>

        <Box my={40} px={16}>
          <EHeading.Section>開催場所(リアル)</EHeading.Section>
          <EText.Desc2 mt={8} mb={16}>
            {event.placeName}
          </EText.Desc2>
          <Box mt={8}>
            <iframe
              src={`https://www.google.com/maps?q=${event.placeName}@${event.lat},${event.lng}&z=15&output=embed`}
              width="100%"
              height="410"
              loading="lazy"
              style={{ border: 0 }}
            />
            <EButton.Sm
              w="100%"
              href={`https://www.google.com/maps?q=${event.lat},${event.lng}&z=17`}
              hrefOutbound
            >
              大きな地図で見る
            </EButton.Sm>
          </Box>
        </Box>

        <Box my={40} px={16}>
          <EHeading.Section>オンラインの開催場所</EHeading.Section>
          <EText.Desc1 mt={8}>
            {event.onlineUrl ? event.onlineUrl : 'なし'}
          </EText.Desc1>
        </Box>
      </Box>
    </>
  )
}

export { Component as TEventShowTemplate }
