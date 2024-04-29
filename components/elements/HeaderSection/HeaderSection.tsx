import { Box, Flex, keyframes } from '@chakra-ui/react'
import { FC } from 'react'
import { NarrowHeader } from './NarrowHeader'

export const HeaderSection: FC = () => {
  const scrollLeft = keyframes`
  from {
    transform: translateX(0%);
  }
  to {
    transform: translateX(-100%);
  }
`

  return (
    <Box
      as="header"
      pos={{ base: 'fixed', lg: 'fixed' }}
      zIndex={10000}
      w="100%"
      maxW="393px"
      mx="auto"
    >
      <NarrowHeader />
      <Box overflowX="hidden" bg="project.surface4.surface">
        <Flex
          sx={{
            animation: `${scrollLeft} 100s linear infinite`,
          }}
          align="center"
          w="1100px"
          h={8}
          color="project.surface4.object.high"
          fontSize={12}
        >
          <Box mr={4}>
            ＠tanuki(0x1122..)さんが東京ドームシティに来訪！120ptゲット
          </Box>
          <Box mr={4}>
            ＠tanuki(0x1122..)さんが東京ドームシティに来訪！120ptゲット
          </Box>
          <Box mr={4}>
            ＠tanuki(0x1122..)さんが東京ドームシティに来訪！120ptゲット
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}
