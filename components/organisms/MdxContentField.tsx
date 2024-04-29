import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'

import { Box, BoxProps, LinkProps, SimpleGrid } from '@chakra-ui/react'
import { FC, PropsWithChildren } from 'react'

const components = {
  h1: ({ children }: PropsWithChildren) => (
    <Box
      as="h3"
      mt={{ base: 6, sm: 12 }}
      mb={{ base: 4, sm: 3 }}
      fontSize={{ base: 16, sm: 22 }}
      fontWeight={'black'}
    >
      {children}
    </Box>
  ),
  h2: ({ children }: PropsWithChildren) => (
    <Box
      as="h3"
      mt={{ base: 6, sm: 12 }}
      mb={{ base: 4, sm: 3 }}
      fontSize={{ base: 16, sm: 22 }}
      fontWeight={'black'}
    >
      {children}
    </Box>
  ),
  h3: ({ children }: PropsWithChildren) => (
    <Box
      as="h3"
      mt={{ base: 4, sm: 9 }}
      mb={{ base: 4, sm: 3 }}
      fontSize={{ base: 16, sm: 22 }}
      fontWeight={'black'}
    >
      {children}
    </Box>
  ),
  h4: ({ children }: PropsWithChildren) => (
    <Box
      as="h4"
      mt={{ base: 4, sm: 9 }}
      mb={{ base: 4, sm: 3 }}
      fontSize={{ base: 14, sm: 18 }}
      fontWeight={'semibold'}
    >
      {children}
    </Box>
  ),
  h5: ({ children }: PropsWithChildren) => (
    <Box
      as="h5"
      mt={{ base: 4, sm: 9 }}
      mb={{ base: 4, sm: 3 }}
      fontSize={{ base: 12, sm: 16 }}
      fontWeight={'semibold'}
    >
      {children}
    </Box>
  ),
  h6: ({ children }: PropsWithChildren) => (
    <Box
      as="h5"
      mt={{ base: 4, sm: 9 }}
      mb={{ base: 4, sm: 3 }}
      fontSize={{ base: 12, sm: 14 }}
      fontWeight={'normal'}
    >
      {children}
    </Box>
  ),
  ul: ({ children }: PropsWithChildren) => (
    <SimpleGrid as="ul" gap={{ base: 1, sm: 2 }} my={{ base: 4, sm: 9 }}>
      {children}
    </SimpleGrid>
  ),
  li: ({ children }: PropsWithChildren) => (
    <Box as="li" fontSize={{ base: 14, sm: 16 }} listStyleType="none">
      {children}
    </Box>
  ),
  EmUl: ({ children, ...props }: BoxProps) => (
    <SimpleGrid gap={{ base: 2, sm: 4 }} my={{ base: 4, sm: 9 }}>
      {children}
    </SimpleGrid>
  ),
  EmLi: ({ children, ...props }: BoxProps) => (
    <Box
      as="li"
      fontSize={{ base: 14, sm: 18 }}
      fontWeight="semibold"
      listStyleType="none"
      {...props}
    >
      {children}
    </Box>
  ),
  p: ({ children }: PropsWithChildren) => (
    <Box
      my={2}
      fontSize={{ base: 14, sm: 16 }}
      lineHeight={1.75}
      opacity={0.75}
    >
      {children}
    </Box>
  ),
  a: ({ children, href, ...props }: LinkProps) => (
    <Box
      as="a"
      display="block"
      mt={{ base: 2, sm: 2 }}
      mb={{ base: 2, sm: 3 }}
      fontSize={{ base: 12, sm: 16 }}
      textDecoration="underline"
      _hover={{ textDecoration: 'none' }}
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
    </Box>
  ),
  Spacing: (props: BoxProps) => <Box my={9} {...props} />,
}

type Props = {
  mdxSource: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, unknown>
  >
}

const Component: FC<Props> = ({ mdxSource }) => {
  return <MDXRemote {...mdxSource} components={components} />
}

export { Component as MdxContentField }
