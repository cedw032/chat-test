import type { UserId } from './user'
import type { UtcDateTime } from '../time/UtcDateTime'
import type { NonEmptyString } from '../common/NonEmptyString'

import { isUtcDateTime } from '../time/UtcDateTime'
import { isUserId } from './user'
import { isNonEmptyString } from '../common/NonEmptyString'

export type MessageId = string & { readonly __MessageId: unique symbol }
export type Message = {
  createdAt: UtcDateTime
  message: NonEmptyString
  userId: UserId
  id: MessageId
}

export function isMessage(a: any): a is Message {
  return (
    typeof a === 'object' &&
    isUtcDateTime(a.createdAt) &&
    isNonEmptyString(a.message) &&
    isUserId(a.userId) &&
    isMessageId(a.id)
  )
}

export function isMessageId(a: any): a is UserId {
  return (
    typeof a === 'string' && !isNaN(+a - +a) && a.indexOf('.') === -1 && +a > 0
  )
}

export function fromApiMessage(a: any): object {
  return {
    createdAt: a?.createdAt,
    message: a?.message,
    userId: `${a?.userID}`,
    id: a?.id,
  }
}
