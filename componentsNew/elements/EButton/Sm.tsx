import { Button } from '@mantine/core'
import Link from 'next/link'
import { FC } from 'react'
import { EButtonProps, generateButtonStyles } from '.'

const Component: FC<EButtonProps> = ({
  href,
  hrefOutbound,
  onClick,
  children,
  type = 'outline',
  ...props
}) => {
  const { bg, c, borderColor } = generateButtonStyles(type)

  const buttonStyle = {
    pt: 0,
    h: 40,
    bg: bg,
    c: c,
    style: {
      borderRadius: 32,
      borderWidth: 1,
      borderColor: borderColor,
    },
    ff: 'outfit',
    fw: 500,
  }

  if (href && hrefOutbound) {
    return (
      <Button
        component="a"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...buttonStyle}
        {...props}
      >
        {children}
      </Button>
    )
  } else if (href && !hrefOutbound) {
    return (
      <Link href={href}>
        <Button {...buttonStyle} {...props}>
          {children}
        </Button>
      </Link>
    )
  } else {
    return (
      <Button {...buttonStyle} onClick={onClick} {...props}>
        {children}
      </Button>
    )
  }
}

export { Component as Sm }
