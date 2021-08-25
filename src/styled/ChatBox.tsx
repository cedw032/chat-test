import { useRef, useEffect } from 'react'

import type { ScrollViewInterface } from './ScrollView'
import type { UserId } from '../entities/user'

import { isServiceError } from '../errors/serviceError'
import { isLoading } from '../common/Loading'

import useChatService from '../hooks/useChatService'
import Message from './Message'
import MessageInput from './MessageInput'
import ScrollView from './ScrollView'

type ChatBoxProps = {
  userId: UserId
}

const messageInputStyle = {
  height: '50px',
  bottom: 0,
} as const

const scrollViewStyle = {
  height: `calc(100% - ${messageInputStyle.height})`,
} as const

export default function ChatBox({ userId }: ChatBoxProps) {
  const chatService = useChatService(userId)
  const scrollViewRef = useRef<ScrollViewInterface>()
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToBottom()
    }
  }, [])

  if (isServiceError(chatService)) {
    return <>{chatService.messageForUser}</>
  }

  if (isLoading(chatService)) {
    return <>Loading...</>
  }

  const { messages, sendMessage } = chatService

  return (
    <div style={{ height: '100%' }}>
      <ScrollView
        style={scrollViewStyle}
        setRef={(r) => (scrollViewRef.current = r)}
      >
        {messages.map((message, i) => (
          <Message
            key={i}
            message={message}
            isFromThisUser={message.userId === userId}
          />
        ))}
      </ScrollView>
      <MessageInput
        sendMessage={(message) => {
          sendMessage(message)
          if (scrollViewRef.current) {
            scrollViewRef.current.scrollToBottom()
          }
        }}
        style={messageInputStyle}
      />
    </div>
  )
}
