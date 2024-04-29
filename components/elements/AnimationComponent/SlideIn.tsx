import { FC } from 'react'
import { motion } from 'framer-motion'

const paramsTemplate = (delay: number) => {
  return {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay, ease: 'easeInOut' },
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

export { Component as SlideIn }
