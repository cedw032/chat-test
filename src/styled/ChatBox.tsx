import { isLoading } from '../common/Loading'
import type { UserId } from '../entities/user'

import { isServiceError } from '../errors/serviceError'

import useChatService from '../hooks/useChatService'
import Message from '../styled/Message'

type ChatBoxProps = {
  userId: UserId
}

export default function ChatBox({ userId }: ChatBoxProps) {
  const chatService = useChatService(userId)

  if (isServiceError(chatService)) {
    return <>{chatService.messageForUser}</>
  }

  if (isLoading(chatService)) {
    return <>Loading...</>
  }

  const { messages } = chatService

  return (
    <>
      {messages.map((message) => (
        <Message message={message} isFromThisUser={message.userId === userId} />
      ))}
    </>
  )
}
