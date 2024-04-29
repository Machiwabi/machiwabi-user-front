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
    ],
  },
}

module.exports = nextConfig
