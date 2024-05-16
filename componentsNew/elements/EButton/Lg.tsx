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
      <Link href={href}>
        <Button {...buttonStyle} {...props}>
          {children}
        </Button>
      </Link>
    )
  } else if (href && !hrefOutbound) {
    return (
      <Button component="a" href="hr ef" {...buttonStyle} {...props}>
        {children}
      </Button>
    )
  } else {
    return (
      <Button {...buttonStyle} onClick={onClick} {...props}>
        {children}
      </Button>
    )
  }
}

export { Component as Lg }
