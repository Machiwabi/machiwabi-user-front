import { AssetsIconProps } from './base'

const Component: React.FC<AssetsIconProps> = ({
  fillColor,
  width = 32,
  height = 32,
}) => {
  return (
    <>
      <svg
        width={`${width}`}
        height={`${height}`}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.33337 9.5H24.6667M7.33337 16H24.6667M7.33337 22.5H24.6667"
          stroke={fillColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  )
}

export { Component as IconMenu }
