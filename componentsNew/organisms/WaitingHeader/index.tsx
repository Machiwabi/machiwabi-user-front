import { Box, Flex, Stack, Text } from '@mantine/core'
import { FC, ReactNode } from 'react'
import { mantineTheme } from '../../../theme/mantineTheme'
import { colorScheme } from '../../../theme/colorScheme'

type Props = { children?: ReactNode }

const Component: FC<Props> = ({ children }) => {
  return (
    <>
      <Flex justify="space-between">
        <Box>
          <Text lh={'100%'} fz={14} fw={900}>
            ホームスクリーン。各個人のマチワビルームです。
            残り時間と推しのアイコンを中心に配置、もどってくればあとどのくらいで夢のような時間に出会えるのかがわかります。
            他にポイントの蓄積もリアルタイムに表示され、裁縫してみたくなる動機づけを与えます。
            さらに、他のユーザーと一緒に待ちわびることができ、ささやかな同調とささかやかな競争でマチワビストを楽しませます。
          </Text>
          <Text
            mt={4}
            lh={'100%'}
            fz={10}
            fw="black"
            c={colorScheme.scheme1.surface1.object.low}
          >
            WaitWaitWaitWaitWait
          </Text>
        </Box>
        <Text
          miw="100px"
          lh={'100%'}
          fz={12}
          fw="black"
          ta="right"
          c={colorScheme.scheme1.surface1.object.low}
        >
          2024-06-23 12:30
        </Text>
      </Flex>
    </>
  )
}

export { Component as WaitingHeader }
