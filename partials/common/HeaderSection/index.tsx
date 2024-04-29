import { Box, Flex } from '@chakra-ui/react'
import Link from 'next/link'
import { FC } from 'react'
import { WalletButton } from './WalletButton'

export const HeaderSection: FC = () => {
  return (
    <Box
      as="header"
      pos={{ base: 'fixed', lg: 'fixed' }}
      zIndex={10}
      w="100%"
      maxW="640px"
      h={{ base: '58px', lg: '72px' }}
      pt={{ base: 2, sm: 0 }}
      pb={{ base: 1, sm: 0 }}
      bg="project.surface1.surface"
      borderBottomWidth="1px"
      borderBottomColor="project.border.border5"
    >
      <Flex
        align="center"
        justify="space-between"
        mx="auto"
        h="100%"
        px={{ base: 6 }}
      >
        <Link href="/">
          <Box
            as="h1"
            fontSize={18}
            fontWeight="black"
            _hover={{ opacity: 0.2 }}
            transitionDuration={'0.2s'}
          >
            MACHIWABI
          </Box>
        </Link>

        <WalletButton />
      </Flex>
    </Box>
  )
}
