import { MantineProvider } from '@mantine/core'
import { ErrorBoundary, Provider } from '@rollbar/react'
import 'material-icons/iconfont/material-icons.css'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { Router } from 'next/router'
import NProgress from 'nprogress'
import { ReactElement, ReactNode } from 'react'
import '../styles/global.css'
import '../styles/nprogress.css'
import { mantineTheme } from '../theme/mantineTheme'
import { googleAnalyticsId } from '../utils/ga4'
import GoogleAnalyticsV4, { GoogleAnalyticsId } from './GoogleAnalyticsV4'

// mantine
import '@mantine/carousel/styles.css'
import '@mantine/core/styles.css'
import { Notifications } from '@mantine/notifications'
import '@mantine/notifications/styles.css'

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
        <MantineProvider theme={mantineTheme} withGlobalClasses>
          <Notifications position="top-right" />
          <GoogleAnalyticsV4
            googleAnalyticsId={googleAnalyticsId as GoogleAnalyticsId}
          />
          {getLayout(<Component {...pageProps} key={router.asPath} />)}
        </MantineProvider>
      </ErrorBoundary>
    </Provider>
  )
}

export default MyApp
