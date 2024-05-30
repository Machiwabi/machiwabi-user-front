import dayjs from 'dayjs'
import 'dayjs/locale/ja'

dayjs.locale('ja')

const jaFullLength = (date: Date) => {
  return dayjs(date).locale('ja').format('YYYY年MM月DD日(dd) hh時mm分')
}

export const dateHumanizer = { jaFullLength }
