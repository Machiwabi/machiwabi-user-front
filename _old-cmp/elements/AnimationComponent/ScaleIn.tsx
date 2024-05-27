import { FC } from 'react'
import { motion } from 'framer-motion'

const paramsTemplate = (delay: number) => {
  return {
    hidden: {
      opacity: 0,
      y: 120,
      scale: 4,
      rotate: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: { duration: 1, delay, ease: 'easeOut' },
    },
  }
}

type Props = {
  children: React.ReactNode
  delay?: number
  disable?: boolean
}

const Component: FC<Props> = ({ children, delay = 0, disable = false }) => {
  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={disable ? undefined : paramsTemplate(delay)}
      >
        {children}
      </motion.div>
    </>
  )
}

export { Component as ScaleIn }
