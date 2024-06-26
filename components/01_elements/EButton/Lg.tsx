import { Button } from '@mantine/core'
import Link from 'next/link'
import { FC } from 'react'
import { EButtonProps, generateButtonStyles } from '.'

const Component: FC<EButtonProps> = ({
  href,
  hrefOutbound,
  onClick,
  children,
  fillType = 'outline',
  surface = 'surface1',
  type,
  ...props
}) => {
  const { bg, c, borderColor } = generateButtonStyles(fillType, surface)

  const buttonStyle = {
    pt: 0,
    h: 50,
    bg: bg,
    c: c,
    style: {
      borderRadius: 25,
      borderWidth: 1,
      borderColor: borderColor,
    },
    ff: 'outfit',
    fw: 700,
    fz: 14,
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
      <Button type={type} {...buttonStyle} onClick={onClick} {...props}>
        {children}
      </Button>
    )
  }
}

export { Component as Lg }
