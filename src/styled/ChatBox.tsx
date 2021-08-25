import { isLoading } from '../common/Loading'
import type { UserId } from '../entities/user'

import { isServiceError } from '../errors/serviceError'

import useChatService from '../hooks/useChatService'
import Message from './Message'
import MessageInput from './MessageInput'
import ScrollView from './ScrollView'

type ChatBoxProps = {
  userId: UserId
}

const messageInputStyle = {
  height: '50px',
  bottom: 0
} as const

const scrollViewStyle = {
  height: `calc(100% - ${messageInputStyle.height})`,
} as const

export default function ChatBox({ userId }: ChatBoxProps) {
  const chatService = useChatService(userId)

  if (isServiceError(chatService)) {
    return <>{chatService.messageForUser}</>
  }

  if (isLoading(chatService)) {
    return <>Loading...</>
  }

  const { messages, sendMessage } = chatService

  return (
    <div style={{ height: '100%' }}>
      <ScrollView style={scrollViewStyle}>
        {messages.map((message, i) => (
          <Message
            key={i}
            message={message}
            isFromThisUser={message.userId === userId}
          />
        ))}
      </ScrollView>
      <MessageInput sendMessage={sendMessage} style={messageInputStyle} />
    </div>
  )
}
