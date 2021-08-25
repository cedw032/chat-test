import type { Message as MessageEntity } from '../entities/message'

import palette from '../config/palette'

type MessageProps = {
  message: MessageEntity
  isFromThisUser: boolean
}

const blockStyle = {
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
} as const

const bubbleStyle = {
  fontSize: 14,
  width: 268,
  padding: 14,
  borderRadius: 15,
  marginBottom: 14,
  letterSpacing: 0,
  color: palette.messageBubble.text,
} as const

export default function Message({ message, isFromThisUser }: MessageProps) {
  return (
    <div
      style={
        {
          ...blockStyle,
          justifyContent: isFromThisUser ? 'flex-end' : 'flex-start',
        } as const
      }
    >
      <div
        style={{
          ...bubbleStyle,
          backgroundColor: isFromThisUser
            ? palette.messageBubble.background.thisUser
            : palette.messageBubble.background.otherUser,
        }}
      >
        {message.message}
      </div>
    </div>
  )
}
