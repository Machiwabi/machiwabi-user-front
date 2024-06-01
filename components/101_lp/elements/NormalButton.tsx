import { Button, ButtonProps } from '@mantine/core'
import { FC, ReactNode } from 'react'
import { colorScheme } from '../../../theme/colorScheme'
import style from '../style.module.scss'
import { on } from 'events'

type Props = ButtonProps & {
  href?: string
  value?: ReactNode
  onClick?: () => void
}

const Component: FC<Props> = ({
  href,
  value = 'マチワびる',
  onClick,
  ...props
}) => {
  return (
    <>
      {href ? (
        <Button
          component="a"
          href={''}
          target="_blank"
          rel="noopener noreferrer"
          h={68}
          fz={{ base: 16, lg: 24 }}
          fw={400}
          c={colorScheme.schemeLp.surface1.object.high}
          bg={colorScheme.schemeLp.surface1.surface}
          style={{
            borderWidth: 1,
            borderColor: colorScheme.schemeLp.surface1.object.high,
            borderRadius: 28,
          }}
          className={style['lp-normal-button']}
          {...props}
        >
          {value}
        </Button>
      ) : (
        <Button
          h={68}
          fz={{ base: 16, lg: 24 }}
          fw={400}
          c={colorScheme.schemeLp.surface1.object.high}
          bg={colorScheme.schemeLp.surface1.surface}
          style={{
            borderWidth: 1,
            borderColor: colorScheme.schemeLp.surface1.object.high,
            borderRadius: 28,
          }}
          className={style['lp-normal-button']}
          onClick={onClick}
          {...props}
        >
          {value}
        </Button>
      )}
    </>
  )
}

export { Component as NormalButton }
