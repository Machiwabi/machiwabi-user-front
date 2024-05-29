import { Button, ButtonProps } from '@mantine/core'
import { FC, ReactNode } from 'react'
import { colorScheme } from '../../../theme/colorScheme'

type Props = ButtonProps & {
  href: string
  value?: ReactNode
}

const Component: FC<Props> = ({ href, value = 'マチワびる', ...props }) => {
  return (
    <>
      <Button
        component="a"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        w={{ base: '100%', lg: 330 }}
        h={68}
        fz={24}
        fw={400}
        c={colorScheme.schemeLp.accent1.surface}
        bg={'none'}
        style={{
          borderWidth: 1,
          borderColor: colorScheme.schemeLp.accent1.surface,
          borderRadius: 28,
        }}
        {...props}
      >
        {value}
      </Button>
    </>
  )
}

export { Component as CtaButton }
