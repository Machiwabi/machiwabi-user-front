import { Box, Flex, FlexProps, SimpleGrid } from '@chakra-ui/react'
import Link from 'next/link'
import { FC } from 'react'

export const Component: FC = () => {
  return (
    <Box
      as="footer"
      pos={{ base: 'fixed', lg: 'fixed' }}
      zIndex={10}
      bottom={0}
      w="100%"
      maxW="640px"
      h={`${50 + 16}px`}
      pt={2}
      pb={2}
      bg="project.surface2.surface"
      borderTopWidth="1px"
      borderTopColor="project.border.border5"
    >
      <SimpleGrid columns={3} w="100%">
        <TabBarTab
          href="/waitings"
          materialIconName="group"
          label="マチビト一覧"
          isActive
        />

        <TabBarTab
          href="/"
          materialIconName="bookmark"
          label="ホームに追加"
          isActive
        />

        <TabBarTab
          href="/"
          materialIconName="event"
          label="他のイベントを探す"
          isActive
        />
      </SimpleGrid>
    </Box>
  )
}

export { Component as FooterSection }

type TabBarTabProps = FlexProps & {
  href: string
  materialIconName: string
  label: string
  isActive?: boolean
}

const TabBarTab: FC<TabBarTabProps> = ({
  href,
  materialIconName,
  label,
  isActive = false,
  ...props
}) => {
  return (
    <>
      <Link href={href} style={{ width: '100%', display: 'block' }}>
        <Flex
          w="100%"
          h="100%"
          direction="column"
          align="center"
          justify="center"
        >
          <Box
            className="material-icons-outlined"
            as="i"
            color="project.support"
            fontSize={24}
            mb={0.5}
          >
            {materialIconName}
          </Box>
          <Box fontSize={10}>{label}</Box>
        </Flex>
      </Link>
    </>
  )
}
