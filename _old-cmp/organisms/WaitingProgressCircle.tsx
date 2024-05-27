import { Box, CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
import { FC, useEffect, useState } from 'react'

type Props = {
  totalPoint: number
  width?: number
}

const Component: FC<Props> = ({ totalPoint, width = 160 }) => {
  // 開始時刻を保持する State
  const [startTime, setStartTime] = useState(new Date().getTime())

  // 現在の進捗状況を保持する State
  const [progress, setProgress] = useState(0)

  // 100ミリ秒ごとに進捗状況を更新する Effect
  useEffect(() => {
    const interval = setInterval(() => {
      // 経過時間を計算
      const elapsedTime = new Date().getTime() - startTime

      // 経過時間に基づいて進捗状況を計算
      const progress = (elapsedTime / 1000) % 10

      // 進捗状況を更新
      setProgress(progress)
    }, 10)

    // コンポーネントがアンマウントされたときに Interval をクリア
    return () => clearInterval(interval)
  }, [])

  return (
    <Box pos="relative">
      <CircularProgress size={width} thickness={2} value={progress * 10}>
        <CircularProgressLabel>
          <Box fontWeight="black">
            <Box fontSize={32}>{totalPoint}</Box>
            <Box fontSize={12}>WABI</Box>
          </Box>
        </CircularProgressLabel>
      </CircularProgress>
    </Box>
  )
}

export { Component as WaitingProgressCircle }
