import { TextProps } from '@mantine/core'
import { ReactNode } from 'react'
import { Page } from './Page'
import { Paragraph } from './Paragraph'
import { ParagraphJa } from './ParagraphJa'
import { Section } from './Section'
import { SectionJa } from './SectionJa'

export type HeadingBaseProps = TextProps & { children?: ReactNode }

export const EHeading = {
  Page,
  Section,
  SectionJa,
  Paragraph,
  ParagraphJa,
}
