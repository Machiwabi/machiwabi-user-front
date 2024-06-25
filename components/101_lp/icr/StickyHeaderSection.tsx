import { BoxProps, Flex } from '@mantine/core'
import Image from 'next/image'
import { FC } from 'react'

type Props = BoxProps

const Component: FC<Props> = ({ ...props }) => {
  return (
    <>
      <Flex
        pos="fixed"
        w="100%"
        top={0}
        left={0}
        py={48}
        justify="center"
        style={{ zIndex: 100 }}
        {...props}
      >
        <Image
          src="/assets/images/logo/logo_machiwabi.svg"
          alt="logo"
          width={173}
          height={24}
        />
      </Flex>
    </>
  )
}

export { Component as StickyHeaderSection }
