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
        <path
          d="M131.648 78.6162C129.363 77.3107 126.426 77.3107 123.815 78.6162L105.538 89.3864L93.1358 96.2402L75.1854 107.01C72.9008 108.316 69.9634 108.316 67.3525 107.01L53.3185 98.5248C51.0339 97.2193 49.4021 94.6084 49.4021 91.671V75.3525C49.4021 72.7415 50.7076 70.1305 53.3185 68.4987L67.3525 60.3394C69.6371 59.0339 72.5744 59.0339 75.1854 60.3394L89.2193 68.8251C91.5039 70.1305 93.1358 72.7415 93.1358 75.6789V86.4491L105.538 79.2689V68.1723C105.538 65.5614 104.232 62.9504 101.621 61.3185L75.5118 45.9791C73.2272 44.6736 70.2898 44.6736 67.6789 45.9791L40.9164 61.6449C38.3055 62.9504 37 65.5614 37 68.1723V98.8512C37 101.462 38.3055 104.073 40.9164 105.705L67.3525 121.044C69.6371 122.35 72.5744 122.35 75.1854 121.044L93.1358 110.601L105.538 103.42L123.488 92.9765C125.773 91.671 128.71 91.671 131.321 92.9765L145.355 101.136C147.64 102.441 149.272 105.052 149.272 107.99V124.308C149.272 126.919 147.966 129.53 145.355 131.162L131.648 139.321C129.363 140.627 126.426 140.627 123.815 139.321L109.781 131.162C107.496 129.856 105.864 127.245 105.864 124.308V113.864L93.4621 121.044V131.815C93.4621 134.426 94.7676 137.037 97.3786 138.668L123.815 154.008C126.099 155.313 129.037 155.313 131.648 154.008L158.084 138.668C160.368 137.363 162 134.752 162 131.815V100.809C162 98.1984 160.695 95.5875 158.084 93.9556L131.648 78.6162Z"
          fill={fillColor}
        />
      </svg>
    </>
  )
}

export { Component as LogoPolygon }
