import { useEffect, useState } from 'react'
import { SiweEoaAddressRepository } from '../../repositories/SiweEoaAddressRepository'
import { ethers } from 'ethers'

export const useSiweEoaAddress = (compairEoaAddress?: string | null) => {
  const [siweEoaAddress, setSiweEoaAddress] = useState<string | null>(null)
  const [isSiweWallet, setIsSiweWallet] = useState<boolean>(false)

  useEffect(() => {
    ;(async () => {
      const eoaAddress = await SiweEoaAddressRepository.get()
      if (eoaAddress) {
        setSiweEoaAddress(eoaAddress)
        compairEoaAddress &&
          setIsSiweWallet(
            ethers.utils.getAddress(eoaAddress) ===
              ethers.utils.getAddress(compairEoaAddress)
          )
      }
    })()
  }, [])

  return { siweEoaAddress, isSiweWallet }
}
