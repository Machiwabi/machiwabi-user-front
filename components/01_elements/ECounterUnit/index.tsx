import { Box } from '@mantine/core'
import { motion } from 'framer-motion'
import { FC, useState } from 'react'
import styles from './style.module.scss'

type Props = {
  startNum: number
  goalNum: number
  rollSpeed?: number
  fz?: number
  delay?: number
}

const Component: FC<Props> = ({
  startNum,
  goalNum,
  rollSpeed = 0,
  fz = 18,
  delay = 0,
}) => {
  const [rolling, setRolling] = useState(true)

  return (
    <>
      <Box
        display="inline-block"
        w={fz * 0.7}
        h={fz}
        mr={-1.5}
        fz={fz}
        ta="center"
        style={{ overflowY: 'hidden' }}
        className={styles['e-counter-unit']}
      >
        <motion.div
          variants={{
            hidden: { y: -fz * startNum, opacity: 1 },
            visible: {
              y: -fz * goalNum + -fz * 10 * rollSpeed, //　動く量を多くするために
              transition: {
                duration: 2,
                ease: 'easeOut',
                delay: delay,
              },
            },
          }}
          initial="hidden"
          animate={rolling ? 'visible' : 'hidden'}
          onAnimationComplete={() => {}}
        >
          {[...new Array(10 + 10 * rollSpeed)].map((i, index) => {
            return (
              <Box
                w={'1rem'}
                fz={fz}
                ff="outfit"
                fw={800}
                lh={1}
                ta="center"
                key={i}
              >
                {index % 10}
              </Box>
            )
          })}
        </motion.div>
      </Box>
    </>
  )
}

export { Component as ECounterUnit }
