import { useRouter } from 'next/router'
import { useMenuOpeningStatus } from '../../../recoil/openingStatus/useMenuOpeningStatus'
import { Box, BoxProps } from '@mantine/core'
import styles from './style.module.scss'
import { colorScheme } from '../../../theme/colorScheme'

type Props = BoxProps & {
  href?: string
  title: string
  hrefOutbound?: boolean
  onClick?: () => void
}

export const Component: React.FC<Props> = ({
  href,
  title,
  onClick,
  hrefOutbound,
  ...props
}) => {
  const router = useRouter()
  const { menuOpenGlobalMenuEnd } = useMenuOpeningStatus()

  return (
    <>
      {href ? (
        <>
          {hrefOutbound ? (
            <Box
              component="a"
              display="block"
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              w="100%"
              mb={40}
              fz={16}
              fw="bold"
              ta="center"
              className={styles['o-overlayed-menu-screen__menu-list-item']}
              style={{ color: colorScheme.scheme1.surface1.object.high }}
              {...props}
            >
              {title}
            </Box>
          ) : (
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
              className={styles['o-overlayed-menu-screen__menu-list-item']}
              {...props}
            >
              {title}
            </Box>
          )}
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
            className={styles['o-overlayed-menu-screen__menu-list-item']}
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
