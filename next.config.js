const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  mode: 'production',
  swSrc: 'public/service-worker.js',
  // disable: process.env.NODE_ENV === 'development',
})

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: [
      'picsum.photos',
      'example.com',
      'avatars.githubusercontent.com',
      'cloudflare-ipfs.com',
      'hanzochang-template.s3.ap-northeast-1.amazonaws.com',
      'loremflickr.com',
      'matiwabi-stg.s3.ap-northeast-1.amazonaws.com',
      'matiwabi-prd.s3.ap-northeast-1.amazonaws.com',
    ],
  },
}

module.exports = withPWA(nextConfig)
