import { Box } from '@chakra-ui/react'
import { FC } from 'react'
import { useWaiting } from '../../../hooks/resources/useWaiting'
import { AnimateWaiting } from '../../organisms/AnimateWaiting'
import { EnableBoostersTemplate } from '../../templates/EnableBoostersTemplate'
import { EventTabsTemplate } from '../../templates/EventTabsTemplate'
import { LoadingTemplate } from '../../templates/LoadingTemplate'
import { UserProfileTemplate } from '../../templates/UserProfileTemplate'
import { WaitingUserIconsTemplate } from '../../templates/WaitingUserIconsTemplate'

type Props = {
  waitingUniqueKey: string
}

const Component: FC<Props> = ({ waitingUniqueKey }) => {
  const { waiting, waitingError, waitingIsLoading } = useWaiting({
    uniqueKey: waitingUniqueKey,
  })

  if (waitingError) return <>読み込みエラー</>
  if (!waiting || !waiting.event || waitingIsLoading) return <LoadingTemplate />

  return (
    <>
      <Box mt={-10} pos="relative">
        <Box pos="absolute" top={'-10svh'} left={0} w="100%">
          <AnimateWaiting waiting={waiting} />
        </Box>
        <Box pt={'70svh'} pos="relative">
          <Box maxW="lg" mx="auto" mb={12}>
            <UserProfileTemplate waiting={waiting} />
          </Box>
          <Box maxW="lg" mx="auto" mb={12}>
            <WaitingUserIconsTemplate waiting={waiting} />
          </Box>
          {/* メッセージ */}
          {/* <Flex pb={6} justify="center" w="100%" bottom={0}>
            <Box w="320px">
              <Box mb={2} fontSize={14} textAlign="center">
                メッセージ
              </Box>
              <Box fontSize={12}>
                推しにメッセージが読まれる...と言うことで何書くか迷うわけですがうーんどうしよう。。。！！
              </Box>
            </Box>
          </Flex>
          <Flex pb={14} direction="column" align="center" justify="center">
            <Box>
              <Button>ホーム画面に登録</Button>
              <Box textAlign="center" fontSize={10}>
                アプリのようにいつでも見られるよ
              </Box>
            </Box>
            <Box mt={'24px'}>
              <Button>この画面をツイート</Button>
              <Box textAlign="center" fontSize={10}>
                ポイントが増えるよ
              </Box>
            </Box>
          </Flex> */}
        </Box>
      </Box>

      {/* 利用中ブーストアイテム */}
      <EnableBoostersTemplate waiting={waiting} />

      {/* イベント詳細 */}
      <EventTabsTemplate
        event={waiting.event}
        remainingEventStartDuration={waiting.remainingEventStartDuration}
      />
    </>
  )
}

export { Component as WaitingMainScreen }
