type SiweJwtType = {
  accessToken: string
  expiresAt: number
  expiresIn: number
  tokenType: string
}

export class SiweJwt implements SiweJwtType {
  accessToken: string
  expiresAt: number
  expiresIn: number
  tokenType: string

  constructor(SiweJwt: SiweJwtType) {
    this.accessToken = SiweJwt.accessToken
    this.expiresAt = SiweJwt.expiresAt
    this.expiresIn = SiweJwt.expiresIn
    this.tokenType = SiweJwt.tokenType
  }

  public isExpired(): boolean {
    return this.expiresAt < Date.now()
  }
}
