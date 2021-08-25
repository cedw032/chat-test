import { useState, useEffect } from 'react'
import useLocalState from './useLocalState'

import type { Loading } from '../common/Loading'
import { isServiceError, ServiceError } from '../errors/serviceError'
import type { Message, MessageId } from '../entities/message'
import type { UserId } from '../entities/user'
import type { NonEmptyString } from '../common/NonEmptyString'
import type { UtcDateTime } from '../time/UtcDateTime'

import { serviceError } from '../errors/serviceError'
import { isMessage } from '../entities/message'
import { loading } from '../common/Loading'
import api from '../api'
import { transform } from '@babel/core'

type ChatService = {
  messages: Array<Message>
  sendMessage: (message: NonEmptyString) => void
}

export default function useChatService(
  userId: UserId,
): ChatService | ServiceError | Loading {
  const [newMessages, setNewMessages] = useLocalState<Array<Message>>(
    'chat-messages',
    [],
  )

  const [hasLoaded, setHasLoaded] = useState(false)
  const [remoteMessages, setRemoteMessages] = useState<Array<Message>>([])
  const [error, setError] = useState<ServiceError>()

  useEffect(() => {
    api.messages
      .list()
      .then((messages) => {
        if (isServiceError(messages)) {
          throw messages
        }
        setRemoteMessages(messages)
        setHasLoaded(true)
      })
      .catch((e) => {
        if (isServiceError(e)) {
          setError(e)
        } else {
          setError(serviceError('failed to load messages'))
        }
      })
  }, [setHasLoaded, setRemoteMessages, setError])

  function sendMessage(message: NonEmptyString): void {
    setNewMessages([
      ...newMessages,
      {
        createdAt: new Date().toISOString() as UtcDateTime,
        message,
        userId,
        id: `${remoteMessages.length + newMessages.length}` as MessageId,
      },
    ])
  }

  if (error) {
    return error
  }

  if (!hasLoaded) {
    return loading
  }

  return {
    sendMessage: sendMessage,
    messages: [...remoteMessages, ...newMessages],
  }
}
