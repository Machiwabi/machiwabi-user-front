import { clientsClaim } from 'workbox-core'
import { precacheAndRoute } from 'workbox-precaching'

clientsClaim()
precacheAndRoute(self.__WB_MANIFEST || [])

console.log('Hello from service-worker.js')

if ('serviceWorker' in navigator && 'PushManager' in window) {
  navigator.serviceWorker
    .register('/service-worker.js')
    .then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope)

      return registration.pushManager.getSubscription().then((subscription) => {
        if (subscription === null) {
          // サブスクリプションを作成
          return registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(''),
          })
        } else {
          return subscription
        }
      })
    })
    .then((subscription) => {
      fetch('http://localhost:44000/v1/notifications/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    })
    .catch((error) => console.error('Service Worker Error', error))
}
