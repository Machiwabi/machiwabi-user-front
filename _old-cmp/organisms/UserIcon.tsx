import { Box, Tooltip } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { FC } from 'react'
import { useEarnedTrigger } from '../../hooks/useEarnedTrigger'
import Link from 'next/link'

const MotionBox = motion(Box) // Chakra UIのBoxをMotionコンポーネントに拡張

type Props = {
  offsetMs: number
  earnedUnitSeconds: number
  width: number
  height: number
  imageUrl: string
  isBoosting?: boolean
  tooltipLabel?: React.ReactNode
}

const Component: FC<Props> = ({
  offsetMs,
  width,
  height,
  imageUrl,
  earnedUnitSeconds,
  isBoosting,
  tooltipLabel,
}) => {
  const { trigger, resetTrigger } = useEarnedTrigger(
    earnedUnitSeconds,
    offsetMs
  )

  return (
    <>
      <Tooltip hasArrow label={<>{tooltipLabel}</>} bg="black" color="white">
        <Box
          pos="relative"
          width={`${width}px`}
          height={`${height}px`}
          borderRadius={width / 2}
          overflow="hidden"
        >
          <MotionBox
            pos="absolute"
            top={0}
            left={0}
            width={`${width}px`}
            height={`${height}px`}
            borderRadius="32px"
            overflow="hidden"
            zIndex={100}
            borderColor={isBoosting ? 'red' : 'blue'}
            variants={{
              hidden: { borderWidth: 30, opacity: 0 },
              visible: {
                borderWidth: 0,
                opacity: 1,
                transition: {
                  duration: 1,
                  ease: 'easeInOut',
                },
              },
            }}
            initial="hidden"
            animate={trigger ? 'visible' : 'hidden'}
            onAnimationComplete={resetTrigger}
          />

          <Box pos="relative" top={0} left={0} width={64} height={64}>
            <Image
              // src={`/assets/images/_sample/picture_ranking_10.png`}
              src={`${imageUrl}`}
              alt="booster"
              width={width}
              height={height}
            />
          </Box>
        </Box>
      </Tooltip>
    </>
  )
}

export { Component as UserIcon }
