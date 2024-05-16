import { Box, Container } from '@mantine/core'
import { Fragment } from 'react'
import { EButton } from '../../componentsNew/elements/EButton'
import { EHeading } from '../../componentsNew/elements/EHeading/base'
import { EText } from '../../componentsNew/elements/EText/base'
import { OFooterNav } from '../../componentsNew/organisms/OFooterNav'
import { OHeaderNav } from '../../componentsNew/organisms/OHeaderNav'
import { OWaitingHeader } from '../../componentsNew/organisms/OWaitingHeader'
import { OWaitingTabs } from '../../componentsNew/organisms/OWaitingTabs'
import { eventMock } from '../../mocks/event.mock'

const Page = () => {
  return (
    <>
      <OHeaderNav />
      <Container maw={410} pt={56} p={0} mb={160}>
        <OWaitingHeader mt={24} px={16} />
        <OWaitingTabs px={16} current="INFORMATION" />

        <Box mb={40} px={16}>
          <EText.Desc1>{eventMock.description}</EText.Desc1>
        </Box>

        <Box my={40} px={16}>
          <EHeading.Section>イベント詳細</EHeading.Section>
          <EText.Desc1 mt={8}>
            {eventMock.detailMdxContent &&
              eventMock.detailMdxContent.split('\n').map((line, index) => (
                <Fragment key={index}>
                  {line}
                  <br />
                </Fragment>
              ))}
          </EText.Desc1>
        </Box>

        <Box my={40} px={16}>
          <EHeading.Section>開催場所</EHeading.Section>
          <EText.Desc1 mt={8}>{eventMock.placeName}</EText.Desc1>
        </Box>

        <Box my={40} px={16}>
          <EHeading.Section>地図</EHeading.Section>
          <Box mt={8}>
            <iframe
              src={`https://www.google.com/maps?q=${eventMock.placeName}@${eventMock.lat},${eventMock.lng}&z=15&output=embed`}
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
          <EText.Desc1 mt={8}>{eventMock.onlineUrl}</EText.Desc1>
        </Box>
      </Container>
      <OFooterNav />
    </>
  )
}

export default Page
