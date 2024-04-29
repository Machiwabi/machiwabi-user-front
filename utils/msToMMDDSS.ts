export const msToMMDDSS = (ms: number) => {
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

  if (days === 0 && remainingHours === 0 && remainingMinutes === 0) {
    return `${formattedSeconds}秒`
  } else if (days === 0 && remainingHours === 0) {
    return `${formattedMinutes}分${formattedSeconds}秒`
  } else if (days === 0) {
    return `${formattedHours}時${formattedMinutes}分${formattedSeconds}秒`
  } else {
    return `${formattedDays}日${formattedHours}時${formattedMinutes}分${formattedSeconds}秒`
  }
}
