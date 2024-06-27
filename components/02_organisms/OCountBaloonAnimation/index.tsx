import { Box } from '@mantine/core'
import { motion } from 'framer-motion'
import { FC, useEffect, useLayoutEffect, useState } from 'react'
import { useAnimateTriggerStore } from '../../../recoil/animateTriggerStore/useAnimateTriggerStore'
import { colorScheme } from '../../../theme/colorScheme'

type Props = {
  addableTotalPoint?: number
  isBoosting?: boolean
  animationEnabled?: boolean
}

const animateDurationSecond = 3

const Component: FC<Props> = ({
  addableTotalPoint,
  isBoosting,
  animationEnabled = true,
}) => {
  const { trigger } = useAnimateTriggerStore()
  const [localTrigger, setLocalTrigger] = useState(animationEnabled && trigger)

  useLayoutEffect(() => {
    if (trigger) {
      if (!animationEnabled) return
      setLocalTrigger(true)
    }
  }, [trigger, animationEnabled])

  const resetTrigger = () => {
    setLocalTrigger(false)
  }

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
              duration: animateDurationSecond,
              ease: 'linear',
            },
          },
        }}
        initial="hidden"
        animate={localTrigger ? 'visible' : 'hidden'}
        onAnimationComplete={resetTrigger}
      >
        <Box
          w="100%"
          bg={
            isBoosting
              ? colorScheme.scheme1.accent2.surface
              : colorScheme.scheme1.accent1.surface
          }
          ta="center"
          fz={ballonFz(addableTotalPoint, isBoosting)}
          py={1}
          px={8}
          ff="outfit"
          fw={700}
          c="white"
          style={{ borderRadius: 24 }}
        >
          +{addableTotalPoint.toLocaleString()}
        </Box>
      </motion.div>
    </>
  )
}

export { Component as OCountBaloonAnimation }

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

const ballonFz = (addableTotalPoint: number, isBoosting?: boolean) => {
  if (!isBoosting) return 14

  if (addableTotalPoint > 50) return 24
  if (addableTotalPoint > 20) return 22
  if (addableTotalPoint > 10) return 20
  if (addableTotalPoint > 5) return 18
  return 16
}
