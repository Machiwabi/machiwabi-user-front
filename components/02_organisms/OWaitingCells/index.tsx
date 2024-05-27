import { AspectRatio, Box, SimpleGrid, SimpleGridProps } from '@mantine/core'
import Link from 'next/link'
import { FC, Fragment } from 'react'
import { WaitingEntity } from '../../../generated/graphql'
import { colorScheme } from '../../../theme/colorScheme'
import { waitingUrl } from '../../../helpers/url.helper'

type Props = SimpleGridProps & {
  waitings: WaitingEntity[]
}

const Component: FC<Props> = ({ waitings, ...props }) => {
  return (
    <>
      <SimpleGrid spacing={16} cols={2} {...props}>
        {waitings.map((waiting) => {
          return (
            <Fragment key={waiting.uniqueKey}>
              <Link
                href={waitingUrl(waiting.uniqueKey)}
                style={{ textDecoration: 'none' }}
              >
                <Box>
                  <AspectRatio pos="relative">
                    <Box
                      bg={colorScheme.scheme1.surface3.surface}
                      style={{
                        borderRadius: 16,
                      }}
                    ></Box>
                  </AspectRatio>
                  <Box
                    mt={4}
                    fw={700}
                    fz={12}
                    ta="center"
                    c={colorScheme.scheme1.surface1.object.high}
                  >
                    {waiting.event.name}
                  </Box>
                </Box>
              </Link>
            </Fragment>
          )
        })}
      </SimpleGrid>
    </>
  )
}

export { Component as OWaitingCells }
