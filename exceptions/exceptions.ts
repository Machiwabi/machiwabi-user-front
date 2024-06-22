export class NotFoundError extends Error {
  constructor(message: string) {
    super(`NotFoundError : ${message}`)
  }
}

export class AlreadyWaitingError extends Error {
  constructor() {
    super(`AlreadyWaitingError`)
  }
}

export class NotSuitableEventError extends Error {
  constructor() {
    super(`NotSuitableEventError`)
  }
}

export class NotSuitableUserError extends Error {
  constructor() {
    super(`NotSuitableUserError`)
  }
}

export class WaitingNotStartedError extends Error {
  constructor(message: string) {
    super(`WaitingNotStartedError: ${message}`)
  }
}

export class EventNotJoinableError extends Error {
  constructor(message: string) {
    super(`EventNotJoinableError: ${message}`)
  }
}

export class UserNotJoinableError extends Error {
  constructor(message?: string) {
    super(`UserNotJoinableError: ${message}`)
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

export class NotEnoughTotalPointError extends Error {
  constructor(message = '') {
    super(`NotEnoughTotalPointError : ${message}`)
  }
}

export class NotEnoughWaitingPointError extends Error {
  constructor(message = '') {
    super(`NotEnoughWaitingPointError : ${message}`)
  }
}

export class RewardOutOfStockError extends Error {
  constructor(message = '') {
    super(`RewardOutOfStockError : ${message}`)
  }
}

export class RewardOutOfStockPerWaitingError extends Error {
  constructor(message = '') {
    super(`RewardOutOfStockPerWaitingError : ${message}`)
  }
}

export class RedeemNotStartedError extends Error {
  constructor(message = '') {
    super(`RedeemNotStartedError : ${message}`)
  }
}

export class RedeemEndedError extends Error {
  constructor(message = '') {
    super(`RedeemEndedError : ${message}`)
  }
}
