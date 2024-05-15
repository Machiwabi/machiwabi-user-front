import { TextProps } from '@mantine/core'
import { ReactNode } from 'react'
import { PageHeading } from './PageHeading'
import { Section } from './Section'

export type HeadingBaseProps = TextProps & { children: ReactNode }

export const EHeading = { PageHeading, Section }
