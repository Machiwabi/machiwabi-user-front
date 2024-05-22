import { FC } from 'react'
import styles from './style.module.scss'
import { Loader, LoaderProps } from '@mantine/core'
import { colorScheme } from '../../../theme/colorScheme'

type Props = LoaderProps

const Component: FC<Props> = ({ ...props }) => {
  return (
    <>
      <Loader
        color={colorScheme.scheme1.surface1.object.high}
        type={'oval'}
        className={styles['e-loader']}
        {...props}
      />
    </>
  )
}
export { Component as ELoader }
