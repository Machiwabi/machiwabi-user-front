import { Container } from '@mantine/core'
import {
  FC,
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from 'react'
import { RecoilRoot } from 'recoil'
import { useAnimateTriggerStore } from '../../../recoil/animateTriggerStore/useAnimateTriggerStore'
import { useAnimateTriggerTimer } from '../../../recoil/animateTriggerStore/useAnimateTriggerTimer'
import { OHeaderNav } from '../../02_organisms/OHeaderNav'
import { SOverlayedMenuScreen } from '../../04_screens/SOverlayedMenuScreen'
import { applicationProperties } from '../../../constants/applicationProperties'
import { useUserAgent } from '../../../hooks/resources/useUserAgent'

export default function LGuestUserLayout(
  page: ReactElement<any, string | JSXElementConstructor<any>>
) {
  return (
    <>
      <RecoilRoot>
        <MainBlock>{page}</MainBlock>
      </RecoilRoot>
    </>
  )
}

type MainBlockProps = {
  children: ReactNode
}

const MainBlock: FC<MainBlockProps> = ({ children }) => {
  useAnimateTriggerTimer(10)
  const { trigger } = useAnimateTriggerStore()
  const { isPwaInstallable } = useUserAgent()

  // バナー表示がある場合は６6px分のスペースを確保
  //　　TODO コンポーネントの中身を知りすぎているので、場所は適正でない上手い場所におきたい
  const pt = isPwaInstallable() ? 56 + 66 : 56

  return (
    <>
      <SOverlayedMenuScreen />
      <OHeaderNav />
      <Container
        maw={applicationProperties.CONTENT_MAX_WIDTH}
        pt={pt}
        p={0}
        mb={160}
      >
        {children}
      </Container>
    </>
  )
}
