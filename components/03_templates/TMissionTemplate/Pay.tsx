import { Box, BoxProps, Flex } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { FC, useState } from 'react'
import { BoosterEntity, WaitingEntity } from '../../../generated/graphql'
import { useProvisionBooster } from '../../../hooks/resources/useProvisionOffer'
import { useSiweEoaAddress } from '../../../hooks/resources/useSiweEoaAddress'
import { colorScheme } from '../../../theme/colorScheme'
import { EButton } from '../../01_elements/EButton'
import { ELoader } from '../../01_elements/ELoader'
import { useBoosterUseableDuration } from '../../../hooks/resources/useBoosterUseableDuration'
import { dateConverter } from '../../../utils/dateConverter'
import { EHeading } from '../../01_elements/EHeading/base'

type Props = BoxProps & {
  waiting: WaitingEntity
  booster: BoosterEntity
}

const Component: FC<Props> = ({ waiting, booster, ...props }) => {
  const { isSiweWallet } = useSiweEoaAddress(waiting.user.eoaAddress)
  const { provisionBooster } = useProvisionBooster()

  const [processing, setProcessing] = useState(false)

  const {
    boosterUseableDuration,
    boosterUseableDurationError,
    boosterUseableDurationIsLoading,
  } = useBoosterUseableDuration({
    uniqueKey: booster.uniqueKey,
    waitingUniqueKey: waiting.uniqueKey,
  })

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

  // 自分のではない
  if (!isSiweWallet) {
    return (
      <>
        <Box {...props}>
          <EButton.Lg fillType="disabled" w="100%" disabled={true}>
            他の人のマチワビのため購入できません
          </EButton.Lg>
        </Box>
      </>
    )
  }

  // ブースター購入可能かをチェック
  if (!boosterUseableDuration || boosterUseableDurationIsLoading) {
    return (
      <>
        <Box {...props}>
          <>
            <EButton.Lg
              fillType="filled"
              surface="accent1"
              w="100%"
              disabled={true}
            >
              <>
                <ELoader
                  size="xs"
                  color={colorScheme.scheme1.accent1.object.high}
                />
              </>
            </EButton.Lg>
          </>
        </Box>
      </>
    )
  }

  // ブースター購入可能かをチェックした結果エラーがある場合
  if (boosterUseableDurationError) {
    return (
      <>
        <Box {...props}>
          <EButton.Lg fillType="disabled" w="100%" disabled={true}>
            エラーのため購入できません
          </EButton.Lg>
        </Box>
      </>
    )
  }

  // ブースター購入可能かをチェックした結果、待ち時間がある場合
  if (boosterUseableDuration.leftRecoveryDuration > 0) {
    return (
      <>
        <Box {...props}>
          <EButton.Lg fillType="disabled" w="100%" disabled={true}>
            {`${dateConverter.msToMMDDSS(
              boosterUseableDuration.leftRecoveryDuration
            )}後に再チャレンジ可能`}
          </EButton.Lg>
        </Box>
      </>
    )
  }

  // ブースター購入可能な場合
  return (
    <>
      <Box {...props}>
        <Box>
          <EHeading.SectionJa>金額</EHeading.SectionJa>
          <Flex
            mt={16}
            mb={16}
            py={16}
            lh={1}
            fz={24}
            ff="outfit"
            fw={700}
            ta="center"
            c={colorScheme.scheme1.surface1.object.high}
            bg={colorScheme.scheme1.surface2.surface}
            justify="center"
            align="center"
            style={{ borderRadius: 8 }}
          >
            <Box>￥{booster.price?.toLocaleString()}</Box>
            <Box ml={6} fz={14}>
              (税込)
            </Box>
          </Flex>
        </Box>
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
      </Box>
    </>
  )
}

export { Component as Pay }
