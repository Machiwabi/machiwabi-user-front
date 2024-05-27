import { Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FC } from 'react'
import { useEarnedTrigger } from '../../hooks/useEarnedTrigger'

type Props = {
  earnedUnitSeconds: number
  addableTotalPoint?: number
  offsetMs: number
  isBoosting?: boolean
}

const Component: FC<Props> = ({
  earnedUnitSeconds,
  addableTotalPoint,
  offsetMs,
  isBoosting,
}) => {
  const { trigger, resetTrigger } = useEarnedTrigger(
    earnedUnitSeconds,
    offsetMs
  )

  if (!addableTotalPoint) return null
  return (
    <>
      <motion.div
        variants={{
          hidden: { y: -12, opacity: 0 },
          visible: {
            y: y,
            opacity: opacity,
            transition: {
              duration: 3,
              ease: 'linear',
            },
          },
        }}
        initial="hidden"
        animate={trigger ? 'visible' : 'hidden'}
        onAnimationComplete={resetTrigger}
      >
        <Box
          w="100%"
          bg={isBoosting ? 'red' : 'blue'}
          textAlign="center"
          fontSize={12}
          py={1}
          px={2}
          color="white"
          borderRadius={24}
        >
          +{addableTotalPoint.toLocaleString()}
        </Box>
      </motion.div>
    </>
  )
}

export { Component as HeartAnimation }

// private components----

const generateSinWave = (points: number, amplitude: number, offset: number) => {
  const y = []
  const opacity = []
  for (let i = 0; i <= points; i++) {
    const x = (i / points) * 2 * Math.PI // 0 から 2π まで
    y.push(Math.sin(x) * amplitude + offset)
    opacity.push(Math.sin(x)) // 透明度は 0 から 1 の間で変化
  }
  return { y, opacity }
}

const { y, opacity } = generateSinWave(10, -20, -12)
