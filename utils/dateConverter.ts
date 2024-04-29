import dayjs from 'dayjs'
import 'dayjs/locale/ja.js'
dayjs.locale('ja')

const yyyyMMddHHmmss = (date: Date) => {
  return dayjs(date).format('YYYY/MM/DD (dd) HH:mm')
}
export const dateConverter = { yyyyMMddHHmmss }
