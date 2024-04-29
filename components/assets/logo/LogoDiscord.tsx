import { AssetsLogoProps } from './base'

const Component: React.FC<AssetsLogoProps> = ({
  fillColor,
  width = 200,
  height = 200,
}) => {
  return (
    <>
      <svg
        width={`${width}`}
        height={`${height}`}
        viewBox="0 0 200 200"
        fill={fillColor}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M165.363 51.3687C165.363 51.3687 146.631 36.6875 124.469 35L122.5 38.9937C142.525 43.8875 151.694 50.9187 161.312 59.525C144.775 51.0875 128.406 43.1562 99.9438 43.1562C71.4813 43.1562 55.1125 51.0875 38.575 59.525C48.1938 50.9187 59.1063 43.1 77.3875 38.9937L75.4188 35C52.1875 37.1938 34.525 51.3687 34.525 51.3687C34.525 51.3687 13.6 81.7438 10 141.369C31.0938 165.725 63.1562 165.894 63.1562 165.894L69.85 156.95C58.4875 153.012 45.6063 145.925 34.525 133.156C47.7438 143.169 67.7688 153.631 100 153.631C132.231 153.631 152.2 143.225 165.475 133.156C154.394 145.925 141.512 153.012 130.15 156.95L136.844 165.894C136.844 165.894 168.906 165.725 190 141.369C186.288 81.7438 165.363 51.3687 165.363 51.3687ZM73.2812 125C65.35 125 58.9375 117.687 58.9375 108.631C58.9375 99.575 65.35 92.2625 73.2812 92.2625C81.2125 92.2625 87.625 99.575 87.625 108.631C87.625 117.687 81.2125 125 73.2812 125ZM126.494 125C118.562 125 112.15 117.687 112.15 108.631C112.15 99.575 118.562 92.2625 126.494 92.2625C134.425 92.2625 140.837 99.575 140.837 108.631C140.837 117.687 134.369 125 126.494 125Z" />
      </svg>
    </>
  )
}

export { Component as LogoDiscord }
