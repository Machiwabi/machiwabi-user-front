import { Box, BoxProps, Divider } from '@mantine/core'
import { FC } from 'react'
import { WaitingEntity } from '../../../generated/graphql'
import { colorScheme } from '../../../theme/colorScheme'
import { OBoostersStatuses } from '../OBoostersStatuses'
import { OWaitingCounter } from '../OWaitingCounter'
import { OWaitingUserListItem } from '../OWaitingUserListItem'
import styles from './style.module.scss'
import { WaitingService } from '../../../domains/services/waiting.service'

type Props = BoxProps & {
  waiting: WaitingEntity
}

const Component: FC<Props> = ({ waiting, ...props }) => {
  const waitingService = new WaitingService(waiting)
  return (
    <>
      <Box {...props}>
        <Box className={styles['o-waiting-counter-with-user']}>
          <OWaitingCounter waiting={waiting} />
          <Box
            p={16}
            bg={colorScheme.scheme1.surface2.surface}
            className={styles['']}
          >
            <OWaitingUserListItem waiting={waiting} />
            {waitingService.isBoosting() && (
              <>
                <Divider my={16} />
                <OBoostersStatuses
                  secondPerTotalPoints={waitingService.addableSumPoint()}
                  secondsPerWaitingPoint={waiting.secondsPerWaitingPoint}
                  waitingBoosters={waitingService.enableBoosters()}
                />
              </>
            )}
          </Box>
        </Box>
      </Box>
    </>
  )
}

export { Component as OWaitingCounterWithUser }
