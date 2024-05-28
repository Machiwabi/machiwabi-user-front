import { Box, BoxProps } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { FC, useState } from 'react'
import { BoosterEntity, WaitingEntity } from '../../../generated/graphql'
import { useProvisionBooster } from '../../../hooks/resources/useProvisionOffer'
import { useSiweEoaAddress } from '../../../hooks/resources/useSiweEoaAddress'
import { colorScheme } from '../../../theme/colorScheme'
import { EButton } from '../../01_elements/EButton'
import { ELoader } from '../../01_elements/ELoader'

type Props = BoxProps & {
  waiting: WaitingEntity
  booster: BoosterEntity
}

const Component: FC<Props> = ({ waiting, booster, ...props }) => {
  const { isSiweWallet } = useSiweEoaAddress(waiting.user.eoaAddress)
  const { provisionBooster } = useProvisionBooster()
  const [processing, setProcessing] = useState(false)

  const buyBooster = async (eventUniqueKey: string) => {
    if (!isSiweWallet) {
      notifications.show({
        message: '他の人のブースターのため購入できません',
        color: colorScheme.scheme1.notice.alert,
      })
    }

    try {
      setProcessing(true)
      const redirectUri = await provisionBooster({
        boosterUniqueKey: booster.uniqueKey,
        waitingUniqueKey: waiting.uniqueKey,
      })

      window.location.href = redirectUri.url
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      <Box {...props}>
        {isSiweWallet ? (
          <>
            <EButton.Lg
              fillType="filled"
              surface="accent1"
              w="100%"
              onClick={() => buyBooster(waiting.event.uniqueKey)}
            >
              {processing ? (
                <>
                  <ELoader
                    size="xs"
                    color={colorScheme.scheme1.accent1.object.high}
                  />
                </>
              ) : (
                <>購入画面へ(クレジットカード)</>
              )}
            </EButton.Lg>
            <EButton.Lg mt={16} fillType="disabled" w="100%" disabled={true}>
              <>購入画面へ(暗号資産) - 準備中</>
            </EButton.Lg>
          </>
        ) : (
          <>
            <EButton.Lg fillType="disabled" w="100%" disabled={true}>
              他の人のマチワビのため購入できません
            </EButton.Lg>
          </>
        )}
      </Box>
    </>
  )
}

export { Component as Pay }
