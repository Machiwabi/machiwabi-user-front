import { scheme1 } from './scheme1'

type ObjectType = {
  high: string
  mid: string
  low: string
  inactive: string
  disable: string
}

type SurfaceType = {
  surface: string
  object: ObjectType
}

type BorderType = ObjectType

type AccentType = {
  surface: string
  object: ObjectType
}

type NoticeType = {
  alert: string
  info: string
}

export type ColorSchemeType = {
  surface1: SurfaceType
  surface2: SurfaceType
  surface3: SurfaceType
  accent1: AccentType
  accent2: AccentType
  border: BorderType
  notice: NoticeType
}

export const colorScheme = {
  scheme1,
}
