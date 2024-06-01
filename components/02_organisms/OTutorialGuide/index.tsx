import { Alert, Box, BoxProps } from '@mantine/core'
import { FC, ReactNode } from 'react'
import { useTutorialHistory } from '../../../hooks/resources/useTutorialHistory'

type Props = BoxProps & {
  tutorialKey: string
  alertTitle?: ReactNode
  children?: ReactNode
}

const Component: FC<Props> = ({
  tutorialKey,
  alertTitle,
  children,
  ...props
}) => {
  const { isRead, markAsUserTutorialRead } = useTutorialHistory(tutorialKey)

  if (isRead) return <></>

  return (
    <>
      <Box {...props}>
        <Alert
          title={alertTitle}
          withCloseButton
          style={{ borderRadius: 16 }}
          onClose={() => {
            markAsUserTutorialRead()
          }}
        >
          {children}
        </Alert>
      </Box>
    </>
  )
}

export { Component as OTutorialGuide }
