import { AspectRatio, Box, BoxProps, Flex, Overlay } from '@mantine/core'
import { FC, Fragment } from 'react'
import { EHeading } from '../../01_elements/EHeading/base'
import { EText } from '../../01_elements/EText/base'
import { EventEntity } from '../../../generated/graphql'
import { EButton } from '../../01_elements/EButton'
import { dateHumanizer } from '../../../utils/datetimeHumanizer'
import Image from 'next/image'
import { colorScheme } from '../../../theme/colorScheme'

type Props = BoxProps & {
  event: EventEntity
}

const Component: FC<Props> = ({ event, ...props }) => {
  console.log('||||||||||||', event)
  return (
    <Box {...props}>
      <Box pos="relative" w="100%" h={'240px'}>
        {event.imageUrl ? (
          <>
            <Image
              src={event.imageUrl}
              layout="fill"
              objectFit="cover"
              alt={event.name || ''}
            />
            <Overlay
              gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%)"
              opacity={0.85}
              style={{ zIndex: 1 }}
            />
          </>
        ) : (
          <>
            <Box bg={colorScheme.scheme1.surface2.surface} w="100%" h="100%" />
          </>
        )}
      </Box>

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
            href={`https://www.google.com/maps/place/${event.placeName}/@${event.lat}@${event.lng},17z`}
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
  )
}

export { Component as TEventShowTemplate }
