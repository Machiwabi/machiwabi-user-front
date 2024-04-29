type TruncatePosition = 'start' | 'middle' | 'end'

const truncateString = (
  str: string,
  num: number,
  position: TruncatePosition = 'end'
) => {
  if (str.length <= num) return str // 切り詰める必要がない場合

  switch (position) {
    case 'start':
      return '...' + str.slice(-num)
    case 'middle':
      const startSlice = Math.floor(num / 2)
      const endSlice = num - startSlice
      return str.slice(0, startSlice) + '...' + str.slice(-endSlice)
    case 'end':
    default:
      return str.slice(0, num) + '...'
  }
}

export const truncator = {
  truncateString,
}
