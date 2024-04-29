export class NotFoundError extends Error {
  constructor(message: string) {
    super(`NotFoundError : ${message}`)
  }
}

export class Web3AuthNotConnectedError extends Error {
  constructor(message = '') {
    super(`Web3AuthNotConnectedError : ${message}`)
  }
}

export class Web3AuthAlreadyConnectedError extends Error {
  constructor(message = '') {
    super(`Web3AuthAlreadyConnectedError : ${message}`)
  }
}
