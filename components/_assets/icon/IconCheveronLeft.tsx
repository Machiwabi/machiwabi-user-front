import { AssetsIconProps } from './base'

const Component: React.FC<AssetsIconProps> = ({
  fillColor,
  width = 40,
  height = 40,
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
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.0351 16.5653C12.7227 16.2529 12.7227 15.7463 13.0351 15.4339L17.8351 10.6339C18.1475 10.3215 18.654 10.3215 18.9665 10.6339C19.2789 10.9463 19.2789 11.4529 18.9665 11.7653L14.7322 15.9996L18.9665 20.2339C19.2789 20.5463 19.2789 21.0529 18.9665 21.3653C18.654 21.6777 18.1475 21.6777 17.8351 21.3653L13.0351 16.5653Z"
          fill={fillColor}
        />
      </svg>
    </>
  )
}

export { Component as IconCheveronLeft }
