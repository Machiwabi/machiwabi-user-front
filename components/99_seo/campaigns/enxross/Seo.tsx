import { NextSeo } from 'next-seo'
import { FC } from 'react'
import { applicationProperties } from '../../../../constants/applicationProperties'
import { nextSeoConfig } from '../../../../next-seo.config'

const Component: FC = () => {
  return (
    <>
      <NextSeo
        title={'Mati-wabi マチワビ - 待ち時間を価値するアプリ'}
        description={
          'イベントまでの“待ち侘びる時間”が価値になったら？Mati-wabiはあなたの待ち時間をもっと価値のあるものにする「待ち活」専用アプリです！'
        }
        openGraph={{
          title: 'Mati-wabi マチワビ - 待ち時間を価値するアプリ',
          description:
            'イベントまでの“待ち侘びる時間”が価値になったら？Mati-wabiはあなたの待ち時間をもっと価値のあるものにする「待ち活」専用アプリです！',
          images: [
            {
              url: `${applicationProperties.HOSTING_URL}/assets/ogp/ogp_twitterCard_default.png`,
              width: 2400,
              height: 1254,
              alt: 'ogp',
            },
          ],
        }}
        twitter={{
          ...nextSeoConfig.twitter,
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
