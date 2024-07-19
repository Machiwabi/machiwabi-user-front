import { clientsClaim } from 'workbox-core'
import { precacheAndRoute } from 'workbox-precaching'

clientsClaim()
precacheAndRoute(self.__WB_MANIFEST || [])

self.addEventListener('push', (event) => {
  const data = event.data.json()
  const options = {
    body: data.body,
    icon: '/assets/favicon/favicon_192x192.png',
    badge: '/assets/favicon/favicon_72x72.png',
  }

  event.waitUntil(self.registration.showNotification(data.title, options))
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  event.waitUntil(
    clients.openWindow(`${process.env.NEXT_PUBLIC_HOSTING_URL}/waitings`) // 通知をクリックしたときに開くURL
  )
})
