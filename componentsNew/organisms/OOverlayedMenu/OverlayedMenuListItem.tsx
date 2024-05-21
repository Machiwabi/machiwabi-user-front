import { useRouter } from 'next/router'
import { useMenuOpeningStatus } from '../../../recoil/openingStatus/useMenuOpeningStatus'
import { Box, BoxProps } from '@mantine/core'

type Props = BoxProps & {
  href: string
  title: string
  rel?: string
  target?: string
}

export const Component: React.FC<Props> = ({ href, title, ...props }) => {
  const router = useRouter()
  const { menuOpenGlobalMenuEnd } = useMenuOpeningStatus()

  return (
    <>
      <Box
        display="block"
        w="100%"
        mb={40}
        color="project.surface1.accent.object.high"
        fz={16}
        fw="bold"
        ta="center"
        onClick={() => {
          router.push(href)
          setTimeout(() => {
            menuOpenGlobalMenuEnd()
          }, 100)
        }}
        {...props}
      >
        {title}
      </Box>
    </>
  )
}

export { Component as OverlayedMenuListItem }
