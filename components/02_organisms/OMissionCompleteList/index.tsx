import { Box, Text } from '@mantine/core'
import { FC } from 'react'
import { WaitingBoosterEntity } from '../../../generated/graphql'
import { EBlankNotice } from '../../01_elements/EBlankNotice'
import { OMissionCompleteListItem } from '../OMissionCompleteListItem'
import { useOMissionCompleteList } from './useOMissionCompleteList'

type Props = {
  waitingBoosters: WaitingBoosterEntity[]
}

const Component: FC<Props> = ({ waitingBoosters }) => {
  const { enableBoosters, finishedBoosters, reviewingBoosters } =
    useOMissionCompleteList(waitingBoosters)

  return (
    <>
      <Box>
        <Text mb={8} fz={14} fw={700}>
          現在有効なBOOSTER({enableBoosters.length})
        </Text>
        {enableBoosters.length === 0 ? (
          <>
            <EBlankNotice description="現在有効なBOOSTERはありません。" />
          </>
        ) : (
          <>
            {enableBoosters.map((waitingBooster) => {
              return (
                <OMissionCompleteListItem
                  waitingBooster={waitingBooster}
                  mb={6}
                />
              )
            })}
          </>
        )}
      </Box>

      {reviewingBoosters.length > 0 && (
        <Box mt={16}>
          <Text mb={8} fz={14} fw={700}>
            レビュー中のBOOSTER({reviewingBoosters.length})
          </Text>
          {reviewingBoosters.map((waitingBooster) => {
            return (
              <OMissionCompleteListItem
                waitingBooster={waitingBooster}
                mb={6}
              />
            )
          })}
        </Box>
      )}

      {finishedBoosters.length > 0 && (
        <Box mt={16}>
          <Text mb={8} fz={14} fw={700}>
            効果が終了したBOOSTER({finishedBoosters.length})
          </Text>
          {finishedBoosters.map((waitingBooster) => {
            return (
              <OMissionCompleteListItem
                waitingBooster={waitingBooster}
                mb={6}
              />
            )
          })}
        </Box>
      )}
    </>
  )
}

export { Component as OMissionCompleteList }
