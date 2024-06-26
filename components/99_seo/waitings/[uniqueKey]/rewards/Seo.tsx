import { NextSeo } from 'next-seo'
import { FC } from 'react'
import { nextSeoConfig } from '../../../../../next-seo.config'
import { applicationProperties } from '../../../../../constants/applicationProperties'

type Props = {
  rewardName: string
  rewardDescription: string
}

const Component: FC<Props> = ({ rewardName, rewardDescription }) => {
  const title = `${rewardName} | Mati-wabi (マチワビ)`

  return (
    <>
      <NextSeo
        title={title}
        description={rewardDescription}
        openGraph={{
          title,
          description: rewardDescription,
          images: [
            {
              url: `${applicationProperties.HOSTING_URL}/assets/ogp/ogp_twitterCard_default.png`, // TODO イベントごとに設定、読み込む
              height: 1254,
              alt: 'ogp',
            },
          ],
        }}
        twitter={{
          ...nextSeoConfig.twitter,
        }}
        additionalMetaTags={[...nextSeoConfig.additionalMetaTags]}
      />
    </>
  )
}

export { Component as Seo }
