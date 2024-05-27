import { Box, Flex, Tooltip } from '@mantine/core'
import { FC, ReactNode, useState } from 'react'

type Props = {
  term: ReactNode
  tooltip?: ReactNode
}

const Component: FC<Props> = ({ term, tooltip }) => {
  const [opened, setOpened] = useState(false)

  return (
    <>
      <Flex align="center">
        <Box fz={12} fw="bold">
          {term}
        </Box>
        {tooltip && (
          <Tooltip label={tooltip} opened={opened}>
            <Box
              ml={4}
              pt={1}
              fz={10}
              className="material-icons-outlined"
              onClick={() => setOpened((o) => !o)}
            >
              info
            </Box>
          </Tooltip>
        )}
      </Flex>
    </>
  )
}

export { Component as EDefinitionTerm }
