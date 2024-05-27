import { RestApiClient } from '../apis/RestApiClient'
import { AwsS3PresignedUrlEntity } from '../generated/rest-api'

const getPresignedUrl = async (
  fileName: string,
  accessToken: string
): Promise<AwsS3PresignedUrlEntity> => {
  const client = new RestApiClient()
  try {
    const result = await client.v1s3Image.getSignedUrl(fileName, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    const s3PresignedUrl: AwsS3PresignedUrlEntity = result.data

    return s3PresignedUrl
  } catch (e) {
    throw e
  }
}

export const AdminS3PresignedUrlRepository = {
  getPresignedUrl,
}
