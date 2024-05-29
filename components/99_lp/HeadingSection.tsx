import { Box } from '@mantine/core'
import { FC } from 'react'

const Component: FC = () => {
  return (
    <>
      <Box fz={64} ff="RocknRoll One">
        待ち侘びることが推し活になる
      </Box>
      <Box mt={10} fz={40} ff="RocknRoll One">
        イベントまでの待ち侘びる時間を価値にできるアプリ
      </Box>
    </>
  )
}

export { Component as HeadingSection }
