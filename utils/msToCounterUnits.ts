export const msToCounterUnits = (ms: number) => {
  // ミリ秒を秒に変換
  const seconds = Math.floor(ms / 1000)

  // 秒を分に変換
  const minutes = Math.floor(seconds / 60)

  // 分を時間に換算
  const hours = Math.floor(minutes / 60)

  // 時間を日に換算
  const days = Math.floor(hours / 24)

  // 剰余時間、分、秒を計算
  const remainingHours = hours % 24
  const remainingMinutes = minutes % 60
  const remainingSeconds = seconds % 60

  // 日、時間、分、秒を表示用に整形
  const formattedDays = days.toString().padStart(2, '0')
  const formattedHours = remainingHours.toString().padStart(2, '0')
  const formattedMinutes = remainingMinutes.toString().padStart(2, '0')
  const formattedSeconds = remainingSeconds.toString().padStart(2, '0')

  // 分割して表示
  return {
    days: formattedDays,
    hours: formattedHours,
    minutes: formattedMinutes,
    seconds: formattedSeconds,
  }
}
