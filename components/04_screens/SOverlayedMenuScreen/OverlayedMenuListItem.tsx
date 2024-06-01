import { useRouter } from 'next/router'
import { useMenuOpeningStatus } from '../../../recoil/openingStatus/useMenuOpeningStatus'
import { Box, BoxProps } from '@mantine/core'

type Props = BoxProps & {
  href?: string
  title: string
  rel?: string
  target?: string
  onClick?: () => void
}

export const Component: React.FC<Props> = ({
  href,
  title,
  onClick,
  ...props
}) => {
  const router = useRouter()
  const { menuOpenGlobalMenuEnd } = useMenuOpeningStatus()

  return (
    <>
      {href ? (
        <>
          <Box
            display="block"
            w="100%"
            mb={40}
            fz={16}
            fw="bold"
            ta="center"
            onClick={() => {
              router.push(href)
              setTimeout(() => {
                menuOpenGlobalMenuEnd()
              }, 100)
            }}
            style={{ cursor: 'pointer' }}
            {...props}
          >
            {title}
          </Box>
        </>
      ) : (
        <>
          <Box
            display="block"
            w="100%"
            mb={40}
            fz={16}
            fw="bold"
            ta="center"
            onClick={onClick}
            style={{ cursor: 'pointer' }}
            {...props}
          >
            {title}
          </Box>
        </>
      )}
    </>
  )
}

export { Component as OverlayedMenuListItem }
