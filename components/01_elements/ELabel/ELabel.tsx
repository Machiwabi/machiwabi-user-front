import { Text, TextProps } from '@mantine/core'
import { FC } from 'react'

type Props = TextProps & {
  label: string
  c?: string
  bg?: string
}

const Component: FC<Props> = ({ label, c, bg, ...props }) => {
  return (
    <>
      <Text
        px={4}
        py={1}
        fz={10}
        ff="outfit"
        fw={700}
        lh={1}
        c={c}
        bg={bg}
        style={{ borderRadius: 16 }}
        {...props}
      >
        {label}
      </Text>
    </>
  )
}

export { Component as ELabel }
