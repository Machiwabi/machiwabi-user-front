/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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

module.exports = nextConfig
