import { NextSeo } from 'next-seo'
import { FC } from 'react'
import { nextSeoConfig } from '../../../next-seo.config'

const Component: FC = () => {
  return (
    <>
      <NextSeo
        title={`マチワビ一覧 | Mati-wabi (マチワビ)`}
        description={nextSeoConfig.description}
        openGraph={{
          ...nextSeoConfig.openGraph,
          title: `マチワビ一覧 | Mati-wabi (マチワビ)`,
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
