import { applicationProperties } from '../constants/applicationProperties'
import {
  Configuration,
  V1AuthenticationApi,
  V1S3ImagesApi,
  V1UserDevicesApi,
} from '../generated/rest-api'

export class RestApiClient {
  private config = new Configuration({
    basePath: applicationProperties.API_REST_URL,
  })

  public authentication = new V1AuthenticationApi(this.config)
  public v1s3Image = new V1S3ImagesApi(this.config)
  public userDevice = new V1UserDevicesApi(this.config)
}
