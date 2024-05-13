import { TextProps } from '@mantine/core'
import { ReactNode } from 'react'
import { PageHeading } from './PageHeading'
import { SectionHeading } from './SectionHeading'

export type HeadingBaseProps = TextProps & { children: ReactNode }

export const EHeading = { PageHeading, SectionHeading }
