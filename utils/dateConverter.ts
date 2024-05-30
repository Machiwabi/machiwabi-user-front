import dayjs from 'dayjs'
import 'dayjs/locale/ja.js'
dayjs.locale('ja')

const yyyyMMddHHmmss = (date: Date) => {
  return dayjs(date).format('YYYY/MM/DD (dd) HH:mm')
}

const msToMMDDSS = (ms: number) => {
  if (ms === 0) {
    return '0秒'
  }

  // ミリ秒を秒に変換
  const seconds = Math.floor(ms / 1000)

  // 秒を分に変換
  const minutes = Math.floor(seconds / 60)

  // 分を時間に換算
  const hours = Math.floor(minutes / 60)

  // 時間を日に換算
  const days = Math.floor(hours / 24)

  // 剰余時間、分、秒を計算
  const remainingHours = hours % 24 // 日に換算した残りの時間
  const remainingMinutes = minutes % 60
  const remainingSeconds = seconds % 60

  // 日、時間、分、秒を 2 桁（必要に応じて）で表示
  const formattedDays = days.toString()
  const formattedHours = remainingHours.toString().padStart(2, '0')
  const formattedMinutes = remainingMinutes.toString().padStart(2, '0')
  const formattedSeconds = remainingSeconds.toString().padStart(2, '0')

  let resultString = ''
  if (remainingSeconds !== 0) {
    resultString = `${formattedSeconds}秒`
  }
  if (remainingMinutes !== 0) {
    resultString = `${formattedMinutes}分${resultString}`
  }
  if (remainingHours !== 0) {
    resultString = `${formattedHours}時間${resultString}`
  }
  if (days !== 0) {
    resultString = `${formattedDays}日${resultString}`
  }
  return resultString
}

export const dateConverter = { yyyyMMddHHmmss, msToMMDDSS }
