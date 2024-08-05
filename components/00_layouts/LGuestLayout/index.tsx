import { Container } from '@mantine/core'
import { FC, JSXElementConstructor, ReactElement, ReactNode } from 'react'
import { RecoilRoot } from 'recoil'
import { applicationProperties } from '../../../constants/applicationProperties'
import { useAnimateTriggerStore } from '../../../recoil/animateTriggerStore/useAnimateTriggerStore'
import { useAnimateTriggerTimer } from '../../../recoil/animateTriggerStore/useAnimateTriggerTimer'
import { OHeaderNav } from '../../02_organisms/OHeaderNav'
import { SOverlayedMenuScreen } from '../../04_screens/SOverlayedMenuScreen'

export default function LApplicationLayout(
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

  return (
    <>
      <SOverlayedMenuScreen />
      <OHeaderNav bannerDisplayable={false} />
      <Container
        maw={applicationProperties.CONTENT_MAX_WIDTH}
        pt={56}
        p={0}
        mb={160}
      >
        {children}
      </Container>
    </>
  )
}
