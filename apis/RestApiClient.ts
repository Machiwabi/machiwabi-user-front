import { applicationProperties } from '../constants/applicationProperties'
import {
  V1AuthenticationApi,
  Configuration,
  V1S3ImagesApi,
} from '../generated/rest-api'

export class RestApiClient {
  private config = new Configuration({
    basePath: applicationProperties.API_REST_URL,
  })

  public authentication = new V1AuthenticationApi(this.config)
  public v1s3Image = new V1S3ImagesApi(this.config)
}
