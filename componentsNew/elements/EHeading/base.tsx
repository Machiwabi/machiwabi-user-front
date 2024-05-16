import { TextProps } from '@mantine/core'
import { ReactNode } from 'react'
import { PageHeading } from './PageHeading'
import { Paragraph } from './Paragraph'
import { ParagraphJa } from './ParagraphJa'
import { Section } from './Section'
import { SectionJa } from './SectionJa'

export type HeadingBaseProps = TextProps & { children: ReactNode }

export const EHeading = {
  PageHeading,
  Section,
  SectionJa,
  Paragraph,
  ParagraphJa,
}
