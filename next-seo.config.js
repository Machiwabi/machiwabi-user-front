const nextSeoConfig = {
  title: 'Mati-wabi (マチワビ) | 待ち時間を価値するアプリ',
  description:
    'イベントまでの“待ち侘びる時間”が推しの応援になったら？Mati-wabiはあなたの推し活時間をもっと価値のあるものにする「待ち活」専用アプリです！',
  openGraph: {
    title: 'Mati-wabi (マチワビ) | 待ち時間を価値するアプリ',
    description:
      'イベントまでの“待ち侘びる時間”が推しの応援になったら？Mati-wabiはあなたの推し活時間をもっと価値のあるものにする「待ち活」専用アプリです！',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_HOSTING_URL}/assets/ogp/ogp_twitterCard_default.png`,
        width: 1200,
        height: 630,
        alt: 'Mati-wabi',
      },
    ],
    siteName: 'Mati-wabi',
  },
  twitter: {
    handle: '@MeTown_jp',
    site: '@site',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'keywords',
      content:
        'web3, NFT, blockchain, crypto, mati-wabi, マチワビ, 推し活, 待ち活',
    },
    {
      name: 'theme-color',
      content: '#ffffff',
    },
  ],
}

export { nextSeoConfig }
