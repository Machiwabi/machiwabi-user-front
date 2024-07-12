import { applicationProperties } from '../constants/applicationProperties'
import { SiweJwtRepository } from '../repositories/SiweJwtRepository'
import { urlBase64ToUint8Array } from '../utils/urlBase64ToUnit8Array'
import { useCreateUserDevice } from './resources/useUserDevice'

export const usePushNotificationRegistration = () => {
  const { createUserDevice } = useCreateUserDevice()
  const register = async () => {
    const siwe = await SiweJwtRepository.getSiweJwtFromBrowser()
    if (!siwe) return

    if ('Notification' in window) {
      Notification.requestPermission().then(function (permission) {
        if (permission === 'granted') {
          console.log('Notification permission granted.')
        } else {
          console.log('Notification permission denied.')
        }
      })
    }

    console.log('check sw')
    const swRegistration = await navigator.serviceWorker.register('/sw.js')
    console.log('check pushManagerSubscription')
    let pushManagerSubscription =
      await swRegistration.pushManager.getSubscription()

    if (pushManagerSubscription) {
      console.log('pms exists--', pushManagerSubscription)
    } else {
      console.log('pms not exists--', pushManagerSubscription)
      pushManagerSubscription = await swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          applicationProperties.VAPID_PUBLIC_KEY
        ),
      })
    }

    console.log('save subscription')
    if (pushManagerSubscription) {
      const stringifiedSubscription: {
        endpoint: string
        expirationTime: number | null
        keys: {
          p256dh: string
          auth: string
        }
      } = JSON.parse(JSON.stringify(pushManagerSubscription))

      createUserDevice({
        webPushEndPoint: stringifiedSubscription.endpoint,
        webPushExpirationTime: stringifiedSubscription.expirationTime,
        webPushKey: stringifiedSubscription.keys.p256dh,
        webPushAuth: stringifiedSubscription.keys.auth,
      })
    }
    console.log('subscription:', pushManagerSubscription)

    // if ('serviceWorker' in navigator && 'PushManager' in window) {
    //   navigator.serviceWorker
    //     .register('/sw.js')
    //     .then((registration) => {
    //       console.log(
    //         'Service Worker registered with scope:',
    //         registration.scope
    //       )

    //       return registration.pushManager
    //         .getSubscription()
    //         .then((subscription) => {
    //           if (subscription === null) {
    //             // サブスクリプションを作成
    //             // repositoryに移動
    //             return registration.pushManager.subscribe({
    //               userVisibleOnly: true,
    //               applicationServerKey: urlBase64ToUint8Array(
    //                 applicationProperties.VAPID_PUBLIC_KEY
    //               ),
    //             })
    //           } else {
    //             return subscription
    //           }
    //         })
    //     })
    //     .then((subscription: PushSubscription | null) => {
    //       if (subscription) {
    //         const stringifiedSubscription: {
    //           endpoint: string
    //           expirationTime: number | null
    //           keys: {
    //             p256dh: string
    //             auth: string
    //           }
    //         } = JSON.parse(JSON.stringify(subscription))

    //         createUserDevice({
    //           webPushEndPoint: stringifiedSubscription.endpoint,
    //           webPushExpirationTime: stringifiedSubscription.expirationTime,
    //           webPushKey: stringifiedSubscription.keys.p256dh,
    //           webPushAuth: stringifiedSubscription.keys.auth,
    //         })
    //       }
    //       console.log('subscription:', subscription)
    //     })
    //     .catch((error) => console.error('Service Worker Error', error))
    // }
  }

  return { register }
}
