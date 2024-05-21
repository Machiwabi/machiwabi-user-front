import { Box, Container, Flex } from '@mantine/core'
import Image from 'next/image'
import { EButton } from '../../../componentsNew/elements/EButton'
import { EText } from '../../../componentsNew/elements/EText/base'
import { OHeaderGuestNav } from '../../../componentsNew/organisms/OHeaderGuestNav'

const Page = () => {
  return (
    <>
      <OHeaderGuestNav />
      <Container maw={410} pt={56} p={0} mb={160}>
        <Flex
          direction="column"
          w={320}
          mt={58}
          mx="auto"
          align="center"
          justify="center"
        >
          <Image
            src="/assets/images/logo/logo_machiwabi.svg"
            alt="logo"
            width={173}
            height={24}
          />
          <Box mt={24}>
            <EText.Desc1>
              イーハトーヴォイーハトーヴォイーハトーヴォイーハトーヴォイーハトーヴォイーハトーヴォイーハトーヴォイーハトーヴォイーハトーヴォイーハトーヴォイーハトーヴォイーハトーヴォイーハトーヴォイーハトーヴォイーハトーヴォイーハトーヴォイーハトーヴォイーハトーヴォイーハトーヴォイーハトーヴォイーハトーヴォイーハトーヴォイーハトーヴォイーハトーヴォイーハトーヴォイー
            </EText.Desc1>
          </Box>
          <EButton.Sm mt={24}>ログインして参加する</EButton.Sm>
        </Flex>
      </Container>
    </>
  )
}

export default Page
