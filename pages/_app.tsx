import { ChakraProvider } from '@chakra-ui/react'
import { ErrorBoundary, Provider } from '@rollbar/react'
import 'material-icons/iconfont/material-icons.css'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { Router } from 'next/router'
import NProgress from 'nprogress'
import { ReactElement, ReactNode } from 'react'
import { RecoilRoot } from 'recoil'
import '../styles/global.css'
import '../styles/nprogress.css'
import { theme } from '../utils/theme'
import GoogleAnalyticsV4, { GoogleAnalyticsId } from './GoogleAnalyticsV4'
import { googleAnalyticsId } from '../utils/ga4'
import { AuthenticationProvider } from '../providers/AuthenticationProvider'

Router.events.on('routeChangeStart', () => {
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => {
  NProgress.done()
})
Router.events.on('routeChangeError', () => {
  NProgress.done()
})

// rollbar setups
const rollbarConfig = {
  accessToken: `${process.env.NEXT_PUBLIC_ROLLBAR_ACCESS_TOKEN}`,
  environment: `${process.env.NEXT_PUBLIC_ROLLBAR_ENVIRONMENT}`,
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    client: {
      javascript: {
        code_version: '1.0.0',
        source_map_enabled: true,
      },
    },
  },
}

export type NextPageWithLayout<P = any, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement, params?: any) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps, router }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <RecoilRoot>
          <AuthenticationProvider>
            <ChakraProvider theme={theme.templateTheme}>
              <GoogleAnalyticsV4
                googleAnalyticsId={googleAnalyticsId as GoogleAnalyticsId}
              />
              {getLayout(<Component {...pageProps} key={router.asPath} />)}
            </ChakraProvider>
          </AuthenticationProvider>
        </RecoilRoot>
      </ErrorBoundary>
    </Provider>
  )
}

export default MyApp
