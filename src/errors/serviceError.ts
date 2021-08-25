import type { NonEmptyString } from '../common/NonEmptyString'

import { isNonEmptyString } from '../common/NonEmptyString'

export type ServiceError = {
  messageForUser: NonEmptyString
}

export function isServiceError(a: any): a is ServiceError {
  return typeof a === 'object' && isNonEmptyString(a.messageForUser)
}

export function serviceError(message: string): ServiceError {
  if (isNonEmptyString(message)) {
    return {
      messageForUser: message,
    } as ServiceError
  }
  return {
    messageForUser: 'something went wrong, unfortunately that is all we know',
  } as ServiceError
}
