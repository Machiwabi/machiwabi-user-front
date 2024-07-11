export const applicationProperties = {
  HOSTING_DOMAIN: process.env.NEXT_PUBLIC_HOSTING_DOMAIN || 'localhost:3000',
  HOSTING_URL: process.env.NEXT_PUBLIC_HOSTING_URL || 'http://localhost:3000',
  API_DOMAIN: process.env.NEXT_PUBLIC_API_DOMAIN || 'localhost:4000',
  API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
  API_JSON_URL:
    process.env.NEXT_PUBLIC_JSON_URL || 'http://localhost:4000/api-json',
  API_GQL_URL:
    process.env.NEXT_PUBLIC_API_GQL_URL || 'http://localhost:4000/graphql',
  API_REST_URL:
    process.env.NEXT_PUBLIC_API_REST_URL || 'http://localhost:4000/',
  WEB3AUTH_CLIENT_ID: process.env.NEXT_PUBLIC_WEB3_AUTH_CLIENT_ID || '',
  WEB3AUTH_AUTH_NETWORK:
    process.env.NEXT_PUBLIC_WEB3_AUTH_NETWORK || 'sapphire_devnet',
  MAX_WRAPPER_WIDTH: 416,
  ALCHEMY: {
    API_KEY: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  },
  WALLET_CONNECT: {
    PROJECT_ID: `${process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID}`,
  },
  GOOGLE_ANALYTICS_ID: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || '',
  CONTENT_MAX_WIDTH: 410,
  VAPID_PUBLIC_KEY: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || '',
  NOTIFICATION_SUBSCRIBE_URL: `${process.env.NEXT_PUBLIC_API_URL}/v1/user-devices/subscribe`,
}
