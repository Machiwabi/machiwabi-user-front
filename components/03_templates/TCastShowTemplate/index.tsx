import { AspectRatio, Box, BoxProps, Flex } from '@mantine/core'
import NextImage from 'next/image' // Next.jsのImageコンポーネントはNextImageとしてインポート
import { FC } from 'react'
import { CastEntity } from '../../../generated/graphql'
import { EButton } from '../../01_elements/EButton'
import { EHeading } from '../../01_elements/EHeading/base'

type Props = BoxProps & {
  cast: CastEntity
}

const Component: FC<Props> = ({ cast, ...props }) => {
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
          あなたからの応援が
          <br />
          力になります！
          <br />
          いつもありがとう！
        </Box>
        <Flex direction="column" justify="center" align="center">
          <EButton.Lg display="block" w={240}>
            拡散ミッション
          </EButton.Lg>
          <EButton.Lg display="block" w={240} mt={12}>
            応援ミッション
          </EButton.Lg>
        </Flex>
      </Box>
    </>
  )
}

export { Component as TCastShowTemplate }
