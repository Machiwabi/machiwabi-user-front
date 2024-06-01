import { NextSeo } from 'next-seo'
import { FC } from 'react'
import { nextSeoConfig } from '../../../../next-seo.config'
import { applicationProperties } from '../../../../constants/applicationProperties'

type Props = {
  waitingUserDisplayName: string
  waitingEventTitle: string
}

const Component: FC<Props> = ({
  waitingUserDisplayName,
  waitingEventTitle,
}) => {
  const title = `${waitingUserDisplayName} - ${waitingEventTitle}をただいまマチワビ中！ | Mati-wabi (マチワビ)`

  return (
    <>
      <NextSeo
        title={title}
        description={`${waitingUserDisplayName}さんが${waitingEventTitle}をただいまマチワビ中！当日まで、一緒に待ち侘びませんか？`}
        openGraph={{
          title,
          description: `${waitingUserDisplayName}さんが${waitingEventTitle}をただいまマチワビ中！当日まで、一緒に待ち侘びませんか？`,
          images: [
            {
              url: `${applicationProperties.HOSTING_URL}/assets/ogp/ogp_twitterCard_campaign_icr.png`, // TODO イベントごとに設定、読み込む
              width: 2400,
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
