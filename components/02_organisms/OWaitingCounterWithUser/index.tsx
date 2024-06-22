import { Box, BoxProps, Divider } from '@mantine/core'
import { FC } from 'react'
import { WaitingEntity } from '../../../generated/graphql'
import { colorScheme } from '../../../theme/colorScheme'
import { OBoostersStatuses } from '../OBoostersStatuses'
import { OWaitingCounter } from '../OWaitingCounter'
import { OWaitingUserListItem } from '../OWaitingUserListItem'
import styles from './style.module.scss'
import { WaitingService } from '../../../domains/services/waiting.service'
import { useEvent } from '../../../hooks/resources/useEvent'
import { ELoader } from '../../01_elements/ELoader'
import { EventService } from '../../../domains/services/event.service'

type Props = BoxProps & {
  waiting: WaitingEntity
  eventUniqueKey: string
}

const Component: FC<Props> = ({ waiting, eventUniqueKey, ...props }) => {
  const { event, eventError, eventIsLoading } = useEvent({
    uniqueKey: eventUniqueKey,
  })

  if (eventError) return <div>読み込みエラー</div>
  if (eventIsLoading || !event) return <ELoader />

  const waitingService = new WaitingService(waiting)
  const eventService = new EventService(event)

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
            <OWaitingUserListItem
              waiting={waiting}
              rollSpeed={3}
              initialRollAnimation={true}
              animationEnabled={!eventService.eventStarted()}
            />
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
