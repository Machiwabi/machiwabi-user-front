import { Box, Container, Flex } from '@mantine/core'
import { EButton } from '../../componentsNew/elements/EButton'
import { OHeaderNav } from '../../componentsNew/organisms/OHeaderNav'
import { TEventShowTemplate } from '../../componentsNew/templates/TEventShowTemplate'
import { eventMock } from '../../mocks/event.mock'

const Page = () => {
  return (
    <>
      <OHeaderNav />
      <Container maw={410} pt={56} p={0} mb={160}>
        <TEventShowTemplate event={eventMock} />
      </Container>
      <Flex
        pos="fixed"
        w="100%"
        bottom={0}
        mb={32}
        justify="center"
        align="center"
      >
        <Box w="100%" maw={410} px={16}>
          <EButton.Lg w="100%" fillType="filled">
            ログインして参加する
          </EButton.Lg>
        </Box>
      </Flex>
    </>
  )
}

export default Page
