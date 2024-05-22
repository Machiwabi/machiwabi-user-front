import { JSXElementConstructor, ReactElement } from 'react'
import { OHeaderNav } from '../../organisms/OHeaderNav'
import { SOverlayedMenuScreen } from '../../screens/SOverlayedMenuScreen'
import { Container } from '@mantine/core'

export default function LGuestUserLayout(
  page: ReactElement<any, string | JSXElementConstructor<any>>
) {
  return (
    <>
      <SOverlayedMenuScreen />
      <OHeaderNav />
      <Container maw={410} pt={56} p={0} mb={160}>
        {page}
      </Container>
    </>
  )
}
