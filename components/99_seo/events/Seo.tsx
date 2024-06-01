import { NextSeo } from 'next-seo'
import { FC } from 'react'
import { applicationProperties } from '../../../../constants/applicationProperties'

type Props = {
  title: string
  description: string
}

const Component: FC<Props> = ({ title, description }) => {
  return (
    <>
      <NextSeo
        title={'Mati-wabi (マチワビ) | 待ち時間を価値するアプリ'}
        description={
          'イベントまでの“待ち侘びる時間”が推しの応援になったら？Mati-wabiはあなたの推し活時間をもっと価値のあるものにする「待ち活」専用アプリです！'
        }
        openGraph={{
          url: applicationProperties.HOSTING_URL,
          title: 'Mati-wabi (マチワビ) | 待ち時間を価値するアプリ',
          description:
            'イベントまでの“待ち侘びる時間”が推しの応援になったら？Mati-wabiはあなたの推し活時間をもっと価値のあるものにする「待ち活」専用アプリです！',
          images: [
            {
              url: `${applicationProperties.HOSTING_URL}/assets/ogp/ogp_image.jp`,
              width: 2400,
              height: 1254,
              alt: 'ogp',
            },
          ],
        }}
        twitter={{
          handle: '@MeTown_jp',
          site: '@site',
          cardType: 'summary_large_image',
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content:
              'web3, NFT, blockchain, crypto, mati-wabi, マチワビ, 推し活, 待ち活',
          },
          {
            name: 'theme-color',
            content: '#000000',
          },
        ]}
      />
    </>
  )
}

export { Component as Seo }
