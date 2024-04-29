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
        viewBox={`0 0 32 32`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M24.2831 7.71668L7.7168 24.283M24.2831 24.283L7.7168 7.71667"
          stroke={fillColor}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </>
  )
}

export { Component as IconClose }
