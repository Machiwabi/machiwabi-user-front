import { NextSeo } from 'next-seo'
import React from 'react'
import { nextSeoConfig } from '../../../next-seo.config'

const Component: React.FC = () => {
  return (
    <>
      <NextSeo {...nextSeoConfig} />
    </>
  )
}

export { Component as Seo }
