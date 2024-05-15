import { Button } from '@mantine/core'
import { FC } from 'react'
import { EButtonProps } from '.'
import { colorScheme } from '../../../theme/colorScheme'
import Link from 'next/link'

const Component: FC<EButtonProps> = ({
  href,
  hrefOutbound,
  onClick,
  ...props
}) => {
  const buttonStyle = {
    pt: 0,
    h: 40,
    bg: colorScheme.scheme1.surface1.surface,
    c: colorScheme.scheme1.surface1.object.high,
    style: {
      borderRadius: 32,
      borderWidth: 1,
      borderColor: colorScheme.scheme1.surface1.object.high,
    },
    ff: 'outfit',
    fw: 500,
  }

  if (href && hrefOutbound) {
    return (
      <Link href={href}>
        <Button {...buttonStyle} {...props}>
          Detail
        </Button>
      </Link>
    )
  } else if (href && !hrefOutbound) {
    return (
      <Button component="a" href="hr ef" {...buttonStyle} {...props}>
        Detail
      </Button>
    )
  } else {
    return (
      <Button {...buttonStyle} onClick={onClick} {...props}>
        Detail
      </Button>
    )
  }
}

export { Component as Sm }
