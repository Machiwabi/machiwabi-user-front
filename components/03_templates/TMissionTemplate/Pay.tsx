import { Box, BoxProps } from '@mantine/core'
import { FC, useEffect } from 'react'
import { BoosterEntity, WaitingEntity } from '../../../generated/graphql'
import { EButton } from '../../01_elements/EButton'
import { useAuthenticatedStore } from '../../../recoil/authenticatedStore/useAuthenticatedStore'
import { useSiweEoaAddress } from '../../../hooks/resources/useSiweEoaAddress'

type Props = BoxProps & {
  waiting: WaitingEntity
  booster: BoosterEntity
}

const Component: FC<Props> = ({ waiting, booster, ...props }) => {
  // const { isAuthenticated } = useAuthenticatedStore()
  const { isSiweWallet } = useSiweEoaAddress(waiting.user.eoaAddress)

  return (
    <>
      <Box {...props}>
        {isSiweWallet ? (
          <>
            <EButton.Lg fillType="filled" surface="accent1" w="100%">
              購入画面(クレジットカード)
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
