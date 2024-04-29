const nextSeoConfig = {
  title: 'demo',
  description: '',
  openGraph: {
    url: process.env.NEXT_PUBLIC_HOSTING_URL,
    title: 'demo',
    description: '',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_HOSTING_URL}/assets/ogp/ogp_image.jpg`,
        width: 1200,
        height: 630,
        alt: '',
      },
    ],
    siteName: '',
  },
  twitter: {
    handle: '@',
    site: '@',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'keywords',
      content: '',
    },
    {
      name: 'theme-color',
      content: '#ffffff',
    },
  ],
}

export { nextSeoConfig }
