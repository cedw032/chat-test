import type { NonEmptyString } from '../common/NonEmptyString'

import { isNonEmptyString } from '../common/NonEmptyString'

export type ServiceError = {
  messageForUser: NonEmptyString
}

export function isServiceError(a: any): a is ServiceError {
  return typeof a === 'object' && isNonEmptyString(a.messageForUser)
}
