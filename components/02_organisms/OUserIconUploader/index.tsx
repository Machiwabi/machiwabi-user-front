import { Box, Flex, FlexProps, Input } from '@mantine/core'
import { notifications, showNotification } from '@mantine/notifications'
import axios from 'axios'
import Image from 'next/image'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { AdminS3PresignedUrlRepository } from '../../../repositories/AwsS3PresignedUrlRepository'
import { colorScheme } from '../../../theme/colorScheme'
import { EButton } from '../../01_elements/EButton'

type Props = FlexProps & {
  methods: UseFormReturn<any, any>
  schemaName: string
  secretJwt: string
  label?: React.ReactNode
  initialImage?: string | null
}

const Component: React.FC<Props> = ({
  methods,
  label,
  schemaName,
  initialImage,
  secretJwt,
  ...props
}) => {
  const errors = methods.formState.errors[schemaName]
  // validationチェック関数
  const { trigger } = methods

  // const toast = useToast()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  // const [images, setImages] = useState<ImageItem[]>(initialImages)
  const [image, setImage] = useState<string | undefined | null>(initialImage)

  // アップロードボタンをタップした時に、hiddenにしたinputタグを
  const fileInputRef = useRef<HTMLInputElement>(null)
  const handleUploadButtonClick = () => {
    fileInputRef.current?.click()
  }
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0])
    }
  }

  // ファイルアップロード処理
  useEffect(() => {
    handleFileUpload()
  }, [selectedFile])

  // ファイルアップロード処理
  const handleFileUpload = async () => {
    if (!selectedFile) {
      return
    }

    // ファイルタイプが画像であるかの判定
    if (!selectedFile.type.startsWith('image/')) {
      notifications.show({
        title: '画像ではないためアップロードできませんでした',
        message: selectedFile.name,
        color: colorScheme.scheme1.notice.alert,
      })
      return
    }

    if (!secretJwt) {
      alert('ログインできていないため、リロードしてください')
      return
    }

    const s3PresignedUrl = await AdminS3PresignedUrlRepository.getPresignedUrl(
      selectedFile.name,
      secretJwt
    )

    try {
      const response = await axios.put(s3PresignedUrl.url, selectedFile, {
        headers: {
          'Content-Type': selectedFile.type,
        },
      })

      if (!response) {
        notifications.show({
          title: '画像のアップロードに失敗しました',
          message: selectedFile.name,
          color: colorScheme.scheme1.notice.alert,
        })
        throw new Error('File upload failed')
      }

      const urlObject = new URL(s3PresignedUrl.url)

      const uploadUrl =
        urlObject.protocol + '//' + urlObject.host + urlObject.pathname

      setSelectedFile(null)

      setImage(uploadUrl)
      methods.setValue(schemaName, uploadUrl)
      trigger(schemaName)

      notifications.show({
        title: '画像をアップロードしました',
        message: selectedFile.name,
      })
    } catch (error) {
      console.error(error)

      showNotification({
        message: '画像のアップロードに失敗しました',
        color: colorScheme.scheme1.notice.alert,
      })
    }
  }

  // アップロード画像を登録
  useEffect(() => {
    methods.register(schemaName)
  }, [methods, schemaName])

  return (
    <>
      <Flex align="center" {...props}>
        <Flex
          w={72}
          h={72}
          bg={colorScheme.scheme1.surface2.surface}
          style={{ overflow: 'hidden', borderRadius: 72 }}
        >
          <Image
            src={
              image ||
              '/assets/images/picture/picture_user-profile-fallback.png'
            }
            width={72}
            height={72}
            alt="user picture"
          />
        </Flex>
        <Box ml={16}>
          <EButton.Sm onClick={handleUploadButtonClick}>
            + アップロード
          </EButton.Sm>
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            display="none"
          />
        </Box>
      </Flex>

      {errors ? <Box mt={3}>{errors?.message?.toString()}</Box> : null}
    </>
  )
}

export { Component as OUserIconUploader }
