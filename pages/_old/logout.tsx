import { Box, Flex } from '@chakra-ui/react'

const Page = () => {
  return (
    <>
      <Flex
        align="center"
        justify="center"
        direction="column"
        w="100%"
        h="100vh"
        px={6}
      >
        <Box
          mt={3}
          color="project.surface1.accent.accent1"
          fontSize={18}
          fontWeight="black"
          textAlign="center"
        >
          ログアウトしました
        </Box>
        <Box mt={6} fontSize={14} textAlign="center">
          <Box>ログインするにはNFCにタッチしてください</Box>
        </Box>
      </Flex>
    </>
  )
}

export default Page
