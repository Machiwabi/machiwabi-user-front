import {
  AspectRatio,
  Box,
  Flex,
  RingProgress,
  SimpleGrid,
  SimpleGridProps,
} from '@mantine/core'
import Link from 'next/link'
import { FC, Fragment } from 'react'
import { WaitingEntity } from '../../../generated/graphql'
import { colorScheme } from '../../../theme/colorScheme'
import { waitingUrl } from '../../../helpers/url.helper'
import { WaitingService } from '../../../domains/services/waiting.service'
import { dateConverter } from '../../../utils/dateConverter'

type Props = SimpleGridProps & {
  waitings: WaitingEntity[]
}

const Component: FC<Props> = ({ waitings, ...props }) => {
  return (
    <>
      <SimpleGrid spacing={16} cols={2} {...props}>
        {waitings.map((waiting) => {
          const waitingService = new WaitingService(waiting)
          return (
            <Fragment key={waiting.uniqueKey}>
              <Link
                href={waitingUrl(waiting.uniqueKey)}
                style={{
                  textDecoration: 'none',
                  color: colorScheme.scheme1.surface3.object.high,
                }}
              >
                <Box>
                  <AspectRatio pos="relative">
                    <Box
                      bg={colorScheme.scheme1.surface3.surface}
                      style={{
                        borderRadius: 16,
                      }}
                    />
                    <Flex
                      justify="center"
                      align="center"
                      pos="absolute"
                      w="100%"
                      h="100%"
                      top={0}
                      left={0}
                    >
                      <RingProgress
                        size={140}
                        thickness={4}
                        sections={[
                          {
                            value: 10,
                            color: colorScheme.scheme1.accent1.surface,
                          },
                        ]}
                      />
                    </Flex>
                    <Flex
                      justify="center"
                      align="center"
                      pos="absolute"
                      w="100%"
                      h="100%"
                      top={0}
                      left={0}
                    >
                      <Box
                        fz={12}
                        color={colorScheme.scheme1.surface3.object.high}
                        ta="center"
                      >
                        あと
                        <br />
                        {dateConverter.msToMMDDSS(waitingService.remainingMs())}
                      </Box>
                    </Flex>
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
