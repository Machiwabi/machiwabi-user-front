import { applicationProperties } from '../constants/applicationProperties'
import { urlBase64ToUint8Array } from '../utils/urlBase64ToUnit8Array'

export const usePushNotificationRegistration = () => {
  const register = () => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log(
            'Service Worker registered with scope:',
            registration.scope
          )

          return registration.pushManager
            .getSubscription()
            .then((subscription) => {
              if (subscription === null) {
                // サブスクリプションを作成
                return registration.pushManager.subscribe({
                  userVisibleOnly: true,
                  applicationServerKey: urlBase64ToUint8Array(
                    applicationProperties.VAPID_PUBLIC_KEY
                  ),
                })
              } else {
                return subscription
              }
            })
        })
        .then((subscription) => {
          fetch(applicationProperties.NOTIFICATION_SUBSCRIBE_URL, {
            method: 'POST',
            body: JSON.stringify(subscription),
            headers: {
              'Content-Type': 'application/json',
            },
          })
          console.log('subscription:', subscription)
        })
        .catch((error) => console.error('Service Worker Error', error))
    }
  }

  return { register }
}
