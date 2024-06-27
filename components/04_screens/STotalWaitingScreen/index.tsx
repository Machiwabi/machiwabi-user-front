import { FC } from 'react'
import { useWaitingSiblings } from '../../../hooks/resources/useWaitingSiblings'
import { TErrorTemplate } from '../../03_templates/TErrorTemplate'
import { TLoadingTemplate } from '../../03_templates/TLoadingTemplate'
import { AspectRatio, Box, Flex } from '@mantine/core'
import { EText } from '../../01_elements/EText/base'
import { OTutorialGuide } from '../../02_organisms/OTutorialGuide'
import { OWaitingCounter } from '../../02_organisms/OWaitingCounter'

type Props = {
  eventUniqueKey: string
}

const Component: FC<Props> = ({ eventUniqueKey }) => {
  const { waitingSiblings, waitingSiblingError, waitingSiblingsIsLoading } =
    useWaitingSiblings({
      eventUniqueKey,
    })

  if (waitingSiblingError) return <TErrorTemplate />
  if (waitingSiblingsIsLoading || !waitingSiblings) return <TLoadingTemplate />

  const totalPoints = waitingSiblings.reduce((sum, waitingSibling) => {
    return sum + waitingSibling.totalPoint
  }, 0)

  return (
    <>
      <OTutorialGuide
        mt={-8}
        mb={32}
        px={16}
        alertTitle={<>💁 ガイド｜総合ポイントページ</>}
        tutorialKey="waiting-totalpoints-guide"
      >
        参加者全員の現時点の総合ポイントです！このイベントにかける参加者の熱量の総量がこのポイントで表現されています！
      </OTutorialGuide>
      <Box px={24}>
        <AspectRatio ratio={1}>
          <Flex
            direction="column"
            justify="center"
            align="center"
            style={{ border: 'solid 1px #000000', borderRadius: '50%' }}
          >
            <Box mb={16} fw={900}>
              参加者の合計ポイント
            </Box>

            <Flex justify="center" align="end">
              <Box ff="outfit" fz={64} lh={1} fw="bold">
                {totalPoints.toLocaleString()}
              </Box>
              <Box ff="outfit" fz={40} lh={1} fw="bold" ml={12} pb={6}>
                pt
              </Box>
            </Flex>
          </Flex>
        </AspectRatio>
        <EText.Desc2 mt={16} ta="center">
          参加者の合計ポイントです。
          <br />
          このイベントの参加者の熱量の総量です。
        </EText.Desc2>
      </Box>
    </>
  )
}

export { Component as STotalWaitingScreen }
