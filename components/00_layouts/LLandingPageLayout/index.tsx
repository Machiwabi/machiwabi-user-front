import Head from 'next/head'
import { JSXElementConstructor, ReactElement } from 'react'

export default function LLandingPageLayout(
  page: ReactElement<any, string | JSXElementConstructor<any>>
) {
  return (
    <>
      <Head>
        <style>{`
          body {
            background-color: #000000!important; 
            color: #ffffff!important;
          }
        `}</style>
      </Head>
      {page}
    </>
  )
}
