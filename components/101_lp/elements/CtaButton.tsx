import { Button, ButtonProps } from '@mantine/core'
import { FC, ReactNode } from 'react'
import { colorScheme } from '../../../theme/colorScheme'
import style from '../style.module.scss'
import { useRouter } from 'next/router'
import { ga4PushEvent } from '../../../utils/ga4'
import { GA4_CUSTOM_EVENT } from '../../../constants/ga4CustomEvent'

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
        bg={colorScheme.schemeLp.surface1.surface}
        style={{
          borderWidth: 1,
          borderColor: colorScheme.schemeLp.accent1.surface,
          borderRadius: 28,
        }}
        className={style['lp-cta-button']}
        onClick={() => {
          ga4PushEvent(GA4_CUSTOM_EVENT.PRESS_MATIWABIRU_BUTTON)
        }}
        {...props}
      >
        {value}
      </Button>
    </>
  )
}

export { Component as CtaButton }
