import { applicationProperties } from '../constants/applicationProperties'
import { SiweJwtRepository } from '../repositories/SiweJwtRepository'
import { urlBase64ToUint8Array } from '../utils/urlBase64ToUnit8Array'
import { useCreateUserDevice } from './resources/useUserDevice'

export const usePushNotificationRegistration = () => {
  const { createUserDevice } = useCreateUserDevice()
  const register = async () => {
    const siwe = await SiweJwtRepository.getSiweJwtFromBrowser()
    if (!siwe) return

    console.log('check sw')
    console.log(navigator.serviceWorker)
    const swRegistration = await navigator.serviceWorker.register('/sw.js')

    // test
    let pushManager = swRegistration.pushManager
    console.log('pushManager', pushManager)
    let permissionState = await pushManager.permissionState({
      userVisibleOnly: true,
    })
    console.log('permissionState', permissionState)
    // test

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

      console.log('pms created--', pushManagerSubscription)
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
  }

  return { register }
}
