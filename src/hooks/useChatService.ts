import useLocalState from './useLocalState'

import type { Loading } from '../common/Loading'
import type { ServiceError } from '../errors/serviceError'
import type { Message, MessageId } from '../entities/message'
import type { UserId } from '../entities/user'
import type { NonEmptyString } from '../common/NonEmptyString'
import type { UtcDateTime } from '../time/UtcDateTime'

import { isMessage } from '../entities/message'

const mockMessages = [
  {
    createdAt: '2021-08-04T08:46:08.782Z',
    message: 'Ducimus qui a nisi necessitatibus fugit ullam. In sint est ab.',
    userID: 1,
    id: '1',
  },
  {
    createdAt: '2021-08-04T06:36:24.326Z',
    message:
      'Ut autem minus sed est doloribus odit suscipit vero et. Nobis distinctio et commodi consequatur amet eveniet. Voluptas minima velit labore deleniti et quos reiciendis ut numquam. Ut aut aut ut deleniti officia. Et autem harum molestiae mollitia consequatur aut dolorem fugit accusantium.',
    userID: 1,
    id: '2',
  },
  {
    createdAt: '2021-08-05T02:29:09.287Z',
    message:
      'Inventore ut occaecati vel quia. Fugit quidem consequatur. Vel qui accusamus quaerat quo ut iste numquam sequi. Necessitatibus voluptas pariatur qui illum maiores. Sed nihil aut consectetur aperiam sint aspernatur amet libero adipisci. Unde recusandae qui omnis et.',
    userID: 2,
    id: '3',
  },
  {
    createdAt: '2021-08-04T14:16:13.089Z',
    message:
      'Eveniet quis architecto modi quibusdam id accusamus. Et illo est in. Esse maxime quia odio voluptates. Laudantium similique provident eveniet nihil recusandae quae illo.',
    userID: 1,
    id: '4',
  },
  {
    createdAt: '2021-08-04T15:42:24.328Z',
    message:
      'Velit corrupti illum minus cupiditate sed. Est occaecati et quos ut dolore. Laudantium non suscipit nemo aut fugit.',
    userID: 1,
    id: '5',
  },
  {
    createdAt: '2021-08-05T01:33:26.258Z',
    message:
      'Ut ea voluptatibus libero eum facere consequatur repellendus consequatur. Dolores aut ratione vero ipsam blanditiis tempore. Et voluptatem dolore ea eaque sequi cum ut qui cum.',
    userID: 2,
    id: '6',
  },
] as Array<any>

function transformApiMessage(a: any): object {
  return {
    createdAt: a?.createdAt,
    message: a?.message,
    userId: `${a?.userID}`,
    id: a?.id,
  }
}

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

  function sendMessage(message: NonEmptyString): void {
    setNewMessages([
      ...newMessages,
      {
        createdAt: new Date().toISOString() as UtcDateTime,
        message,
        userId,
        id: `${mockMessages.length + newMessages.length}` as MessageId,
      },
    ])
  }

  if (mockMessages.every(isMessage)) {
    return {
      messages: [...mockMessages, ...newMessages],
      sendMessage,
    }
  }

  console.warn(
    'API is returning inconsistent types for user id, that si why we have to do this',
  )
  const transformed = mockMessages.map(transformApiMessage)
  if (transformed.every(isMessage)) {
    return {
      messages: [...transformed, ...newMessages],
      sendMessage,
    }
  }

  return {
    messageForUser: 'unexpected data from api' as NonEmptyString,
  } as const
}
