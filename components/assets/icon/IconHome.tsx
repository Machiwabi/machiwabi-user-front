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
        viewBox={`0 0 24 24`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.64848 22.0546V15.3515C8.64848 14.7589 8.88388 14.1906 9.3029 13.7716C9.72193 13.3526 10.2902 13.1172 10.8828 13.1172H13.1172C13.7098 13.1172 14.2781 13.3526 14.6971 13.7716C15.1161 14.1906 15.3515 14.7589 15.3515 15.3515V22.0546M4.17978 12H1.94543L12 1.94543L22.0546 12H19.8202V19.8202C19.8202 20.4128 19.5848 20.9811 19.1658 21.4001C18.7468 21.8192 18.1785 22.0546 17.5859 22.0546H6.41413C5.82154 22.0546 5.25323 21.8192 4.83421 21.4001C4.41519 20.9811 4.17978 20.4128 4.17978 19.8202L4.17978 12Z"
          stroke={fillColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  )
}

export { Component as IconHome }
