import { Box, Flex } from '@mantine/core'
import { FC, Fragment } from 'react'
import { EHeading } from '../../elements/EHeading/base'
import { EText } from '../../elements/EText/base'
import { EventEntity } from '../../../generated/graphql'
import { EButton } from '../../elements/EButton'

type Props = {
  event: EventEntity
}

const Component: FC<Props> = ({ event }) => {
  return (
    <>
      <Box mt={24} mb={16} px={16}>
        <EHeading.Page>イベント名</EHeading.Page>
        <Flex align="center" my={4}>
          <Box className="material-icons-outlined" component="i" fz={16}>
            location_on
          </Box>
          <Box pb={2} fz={10}>
            {event.placeName}
          </Box>
        </Flex>
      </Box>

      <Box mb={40} px={16}>
        <EText.Desc1>{event.description}</EText.Desc1>
      </Box>

      <Box my={40} px={16}>
        <EHeading.Section>イベント詳細</EHeading.Section>
        <EText.Desc1 mt={8}>
          {event.detailMdxContent &&
            event.detailMdxContent.split('\n').map((line, index) => (
              <Fragment key={index}>
                {line}
                <br />
              </Fragment>
            ))}
        </EText.Desc1>
      </Box>

      <Box my={40} px={16}>
        <EHeading.Section>開催場所</EHeading.Section>
        <EText.Desc1 mt={8}>{event.placeName}</EText.Desc1>
      </Box>

      <Box my={40} px={16}>
        <EHeading.Section>地図</EHeading.Section>
        <Box mt={8}>
          <iframe
            src={`https://www.google.com/maps?q=${event.placeName}@${event.lat},${event.lng}&z=15&output=embed`}
            width="100%"
            height="410"
            loading="lazy"
            style={{ border: 0 }}
          />
          <EButton.Sm w="100%">大きな地図で見る</EButton.Sm>
        </Box>
      </Box>

      <Box my={40} px={16}>
        <EHeading.Section>オンライン</EHeading.Section>
        <EText.Desc1 mt={8}>{event.onlineUrl}</EText.Desc1>
      </Box>
    </>
  )
}

export { Component as TEventShowTemplate }
