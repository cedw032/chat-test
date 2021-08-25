import type { UserId } from '../entities/user'

import { isServiceError } from '../errors/serviceError'

import useChatService from '../hooks/useChatService'

type ChatBoxProps = {
  userId: UserId
}

export default function ChatBox({ userId }: ChatBoxProps) {
  const chatService = useChatService(userId)

  if (isServiceError(chatService)) {
    return <>Failed to load chatbox due to bad data</>
  }

  return <div>CHAT BOX</div>
}
