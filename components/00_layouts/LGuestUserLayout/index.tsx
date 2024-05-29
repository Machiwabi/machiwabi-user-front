import { Container } from '@mantine/core'
import { JSXElementConstructor, ReactElement } from 'react'
import { OHeaderNav } from '../../02_organisms/OHeaderNav'
import { SOverlayedMenuScreen } from '../../04_screens/SOverlayedMenuScreen'

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
