import { applicationProperties } from '../constants/applicationProperties'
import { V1AuthenticationApi, Configuration } from '../generated/rest-api'

export class RestApiClient {
  private config = new Configuration({
    basePath: applicationProperties.API_REST_URL,
  })

  public authentication = new V1AuthenticationApi(this.config)
}
