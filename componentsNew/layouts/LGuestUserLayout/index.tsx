import { JSXElementConstructor, ReactElement } from 'react'
import { OHeaderGuestNav } from '../../organisms/OHeaderGuestNav'
import { OOverlayedMenu } from '../../organisms/OOverlayedMenu'
import { Container } from '@mantine/core'

export default function LGuestUserLayout(
  page: ReactElement<any, string | JSXElementConstructor<any>>
) {
  return (
    <>
      <OOverlayedMenu />
      <OHeaderGuestNav />
      <Container maw={410} pt={56} p={0} mb={160}>
        {page}
      </Container>
    </>
  )
}
