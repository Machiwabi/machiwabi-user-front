import { Box, Button, Flex, Heading, SimpleGrid } from '@chakra-ui/react'
import Link from 'next/link'
import { FC } from 'react'
import { Wrapper } from '../../../_old-cmp/elements/Wrapper'
import { WaitingProgressCircle } from '../../../_old-cmp/organisms/WaitingProgressCircle'
import { LoadingTemplate } from '../../../_old-cmp/templates/LoadingTemplate'
import { WalletLoginTemplate } from '../../../_old-cmp/templates/WalletLoginTemplate'
import { useWaitings } from '../../../hooks/resources/useWaitings'
import ApplicationLayout from '../../../partials/common/ApplicationLayout'
import { useAuthenticatedStore } from '../../../recoil/authenticatedStore/useAuthenticatedStore'
import { dateConverter } from '../../../utils/dateConverter'
import { NextPageWithLayout } from '../../_app'

const Page: NextPageWithLayout = () => {
  return (
    <>
      <MainBlock />
    </>
  )
}

Page.getLayout = ApplicationLayout

export default Page

// private components -------------------------

const MainBlock: FC = () => {
  const { authenticated } = useAuthenticatedStore()
  const { waitings, waitingsError, waitingsIsLoading } = useWaitings()

  if (authenticated === 'unauthenticated') return <WalletLoginTemplate />
  if (waitingsError) return <>読み込みエラー</>
  if (!waitings || waitingsIsLoading) return <LoadingTemplate />

  if (waitings.length === 0)
    return (
      <>
        <Wrapper.W2xl mt={12}>
          <Box as="h5" fontSize={18} fontWeight="bold" textAlign="center">
            待ち侘びているイベントはありません
          </Box>
          <Box
            mt={1}
            as="h3"
            fontSize={24}
            fontWeight="black"
            textAlign="center"
          >
            待ち侘びたいイベントを探そう！
          </Box>
          <Flex justify="center" mt={6}>
            <Button
              as="a"
              href="/events"
              px={12}
              h="56px"
              color="project.surface3.object.high"
              bgColor="project.surface3.surface"
            >
              イベントを探す
            </Button>
          </Flex>
        </Wrapper.W2xl>
      </>
    )

  const totalPoint = waitings
    .map((waiting) => waiting.totalPoint)
    .reduce((a, b) => a + b)

  return (
    <>
      <Flex
        align="center"
        justify="center"
        direction="column"
        maxW="2xl"
        mx="auto"
        mt={3}
        mb={12}
        p={9}
        bg="white"
        borderWidth="1px"
        borderColor="project.border.border1"
        borderRadius={8}
      >
        <Box fontSize={18} fontWeight="black" lineHeight={1}>
          合計残高
        </Box>
        <Box my={3} fontSize={48} fontWeight="black" lineHeight={1}>
          {totalPoint}
        </Box>
        <Box fontSize={18} fontWeight="black" lineHeight={1}>
          WABI
        </Box>
      </Flex>
      <SimpleGrid rowGap={12} maxW="2xl" mx="auto" columns={2}>
        {waitings.map((waiting) => {
          return (
            // eslint-disable-next-line react/jsx-key
            <Link href={`/waitings/${waiting.uniqueKey}`}>
              <Flex
                key={waiting.uniqueKey}
                align="center"
                justify="center"
                direction="column"
                _hover={{ opacity: 0.2 }}
                cursor="hover"
                transitionDuration="0.2s"
              >
                <Heading as="h3" fontSize={18} fontWeight="black">
                  {waiting.event?.name}
                </Heading>
                <Box mt={2} fontSize={12}>
                  START: {waiting.event?.startAt}
                </Box>
                <Box mt={3}>
                  <Box>
                    待ち時間：
                    {dateConverter.msToMMDDSS(waiting?.waitingDuration)}
                  </Box>
                </Box>
                <Box mt={6}>
                  <WaitingProgressCircle totalPoint={waiting.totalPoint} />
                </Box>
              </Flex>
            </Link>
          )
        })}
      </SimpleGrid>
    </>
  )
}
