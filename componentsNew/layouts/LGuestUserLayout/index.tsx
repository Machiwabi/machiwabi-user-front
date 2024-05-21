import { JSXElementConstructor, ReactElement } from 'react'
import { OHeaderGuestNav } from '../../organisms/OHeaderGuestNav'
import { OOverlayedMenu } from '../../organisms/OOverlayedMenu'

export default function LGuestUserLayout(
  page: ReactElement<any, string | JSXElementConstructor<any>>
) {
  return (
    <>
      <OOverlayedMenu />
      <OHeaderGuestNav />
      {page}
    </>
  )
}
