import { FC } from 'react'
import { useCast } from '../../../hooks/resources/useCast'
import { TErrorTemplate } from '../../03_templates/TErrorTemplate'
import { TLoadingTemplate } from '../../03_templates/TLoadingTemplate'
import { Seo } from '../../99_seo/events/Seo'
import { TCastShowTemplate } from '../../03_templates/TCastShowTemplate'

type Props = {
  uniqueKey: string
}

const Component: FC<Props> = ({ uniqueKey }) => {
  const { cast, castError, castIsLoading } = useCast({
    uniqueKey,
  })

  if (castError) return <TErrorTemplate />
  if (castIsLoading || !cast) return <TLoadingTemplate />

  return (
    <>
      <Seo
        eventTitle={cast.pageMetaTitle || ''}
        eventDescription={cast.pageDescription || ''}
        eventImageUrl={cast.pageOgpImageUrl || ''}
      />
      <TCastShowTemplate cast={cast} />
      {/* <TEventShowTemplate event={event} /> */}
    </>
  )
}

export { Component as SCastScreen }
