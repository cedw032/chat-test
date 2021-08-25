import { useState } from 'react'

import palette from '../config/palette'
import useKeyboard from '../hooks/useKeyboard'
import useKeyboardModifiers from '../hooks/useKeyboardModifiers'
import { isNonEmptyString, NonEmptyString } from '../common/NonEmptyString'

type MessageInputProps = {
  sendMessage: (message: NonEmptyString) => void
  style: React.CSSProperties
}

const messageInputStyle = {
  border: `1px solid ${palette.inputBorder}`,
  padding: 2,
  overflow: 'hidden',
}

const inputStyle = {
  height: '100%',
  border: 'none',
  outline: 'none',
  padding: 4,
  width: '100%',
  margin: 0,
}

export default function MessageInput({
  sendMessage,
  style,
}: MessageInputProps) {
  const [value, setValue] = useState('')

  const { Shift: ignoreKeystrokes } = useKeyboardModifiers()
  useKeyboard(
    {
      Enter: {
        up: () => {
          if (isNonEmptyString(value)) {
              sendMessage(value)
              setValue('')
          }
        },
      },
    },
    ignoreKeystrokes,
  )

  return (
    <div style={{ ...messageInputStyle, ...style }}>
      <input
        style={inputStyle}
        type={'text'}
        placeholder={'Type message'}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
}
