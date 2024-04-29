import { Box } from '@chakra-ui/react'
import { JSXElementConstructor, ReactElement } from 'react'

export default function RevisedLayout(
  page: ReactElement<any, string | JSXElementConstructor<any>>
) {
  return (
    <>
      <Box pos="relative" key={page.key} zIndex={1}>
        {page}
      </Box>
    </>
  )
}
