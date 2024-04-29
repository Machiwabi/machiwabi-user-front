import { Box } from '@chakra-ui/react'
import { JSXElementConstructor, ReactElement } from 'react'
import { HeaderSection } from './HeaderSection'

export default function ApplicationLayout(
  page: ReactElement<any, string | JSXElementConstructor<any>>
) {
  return (
    <>
      <Box pos="relative" w="100%" maxW="640px" h="100vh" mx="auto">
        <HeaderSection />
        <Box
          pos="relative"
          key={page.key}
          pt={{ base: `${58 + 16}px`, lg: '135px' }}
          zIndex={1}
        >
          {page}
        </Box>
        {/* 動かないシャドウ */}
        <Box
          pos="fixed"
          top="-50px"
          left="calc(50% - 320px)"
          w="640px"
          h="calc(100vh + 50px)"
          shadow="xl"
          zIndex={0}
        />
      </Box>
    </>
  )
}
