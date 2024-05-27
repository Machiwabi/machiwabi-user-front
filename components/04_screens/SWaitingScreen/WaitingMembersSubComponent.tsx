import { Box, BoxProps } from '@mantine/core'
import { FC } from 'react'
import { waitingMembersUrl } from '../../../helpers/url.helper'
import { useWaitingSiblings } from '../../../hooks/resources/useWaitingSiblings'
import { ELoader } from '../../01_elements/ELoader'
import { ESectionHeading } from '../../01_elements/ESectionHeading'
import { OWaitingUserIcons } from '../../02_organisms/OWaitingUserIcons'

type Props = BoxProps & {
  waitingUniqueKey: string
  eventUniqueKey: string
}

const Component: FC<Props> = ({
  waitingUniqueKey,
  eventUniqueKey,
  ...props
}) => {
  const { waitingSiblings, waitingSiblingError, waitingSiblingsIsLoading } =
    useWaitingSiblings({
      eventUniqueKey,
    })

  {
    /* TODO skeletonを入れたい */
  }
  if (waitingSiblingError) return <div>読み込みエラー</div>
  if (waitingSiblingsIsLoading || !waitingSiblings) return <ELoader />

  return (
    <>
      <Box component="section" {...props}>
        <ESectionHeading
          heading={`WAITING MEMBERS - ${waitingSiblings.length}`}
          tooltip={<>同じイベントを待っているユーザー一覧です</>}
          moreHref={waitingMembersUrl(waitingUniqueKey)}
        />
        <Box mt={8}>
          <OWaitingUserIcons waitings={waitingSiblings} />
        </Box>
      </Box>
    </>
  )
}

export { Component as WaitingMembersSubComponent }
