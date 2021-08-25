import type { UtcDateTime } from '../time/UtcDateTime'
import type { ImageUri } from '../common/ImageUri'
import type { NonEmptyString } from '../common/NonEmptyString'

import { isUtcDateTime } from '../time/UtcDateTime'
import { isImageUri } from '../common/ImageUri'
import { isNonEmptyString } from '../common/NonEmptyString'

export type UserId = string & { readonly __UserId: unique symbol }
export type User = {
  createdAt: UtcDateTime
  avatar: ImageUri
  firstName: NonEmptyString
  lastName: NonEmptyString
  id: UserId
}

export function isUserId(a: any): a is UserId {
  return (
    typeof a === 'string' && !isNaN(+a - +a) && a.indexOf('.') === -1 && +a > 0
  )
}

export function isUser(a: any): a is User {
  return (
    typeof a === 'object' &&
    isUtcDateTime(a.createdAt) &&
    isImageUri(a.avatar) &&
    isNonEmptyString(a.firstName) &&
    isNonEmptyString(a.lastName) &&
    isUserId(a.id)
  )
}
