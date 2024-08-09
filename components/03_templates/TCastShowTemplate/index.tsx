import { AspectRatio, Box, BoxProps, Flex } from '@mantine/core'
import NextImage from 'next/image' // Next.jsのImageコンポーネントはNextImageとしてインポート
import { FC, Fragment } from 'react'
import { CastEntity } from '../../../generated/graphql'
import { EButton } from '../../01_elements/EButton'
import { EHeading } from '../../01_elements/EHeading/base'
import { useAuthenticatedStore } from '../../../recoil/authenticatedStore/useAuthenticatedStore'
import { useWeb3Auth } from '../../../hooks/useWeb3Auth'
import { useRouter } from 'next/router'

type Props = BoxProps & {
  cast: CastEntity
}

const Component: FC<Props> = ({ cast, ...props }) => {
  const { isAuthenticated } = useAuthenticatedStore()
  const { connectWeb3AuthAndSignInWithEthereum } = useWeb3Auth()

  const router = useRouter()
  const currentUrl = router.asPath

  return (
    <>
      <Box mt={32} {...props}>
        <EHeading.Page ta="center" mb={24}>
          {cast.pageTitle}
        </EHeading.Page>
        <AspectRatio
          w={240}
          mx="auto"
          mt={16}
          ratio={1}
          style={{ borderRadius: 400, overflow: 'hidden' }}
        >
          <Box pos="relative">
            {cast.pageImageUrl && (
              <>
                <NextImage
                  src={cast.pageImageUrl}
                  layout="fill"
                  objectFit="cover"
                  alt={cast.pageTitle || ''}
                />
              </>
            )}
          </Box>
        </AspectRatio>
        <Box my={40} ta="center">
          {cast.pageDescription &&
            cast.pageDescription.split('\n').map((line, index) => (
              <Fragment key={index}>
                {line}
                <br />
              </Fragment>
            ))}
        </Box>

        {isAuthenticated() ? (
          <>
            <Flex direction="column" justify="center" align="center">
              {cast.pageButtonUrlAndTexts?.map((buttonUrlAndText, index) => {
                return (
                  <>
                    <EButton.Lg
                      display="block"
                      w={240}
                      mt={index > 0 ? 12 : 0}
                      onClick={() => {
                        router.push(buttonUrlAndText.url)
                      }}
                    >
                      {buttonUrlAndText.value}
                    </EButton.Lg>
                  </>
                )
              })}
            </Flex>
          </>
        ) : (
          <>
            <Flex direction="column" justify="center" align="center">
              {cast.pageButtonUrlAndTexts?.map((buttonUrlAndText, index) => {
                return (
                  <>
                    <EButton.Lg
                      display="block"
                      w={240}
                      mt={index > 0 ? 12 : 0}
                      onClick={() => {
                        connectWeb3AuthAndSignInWithEthereum(currentUrl)
                      }}
                    >
                      {buttonUrlAndText.value}
                    </EButton.Lg>
                  </>
                )
              })}
            </Flex>
          </>
        )}
      </Box>
    </>
  )
}

export { Component as TCastShowTemplate }
