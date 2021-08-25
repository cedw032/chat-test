import { useParams } from 'react-router-dom'

import CenteredContent from '../layout/CenteredContent'
import ChatBox from '../styled/ChatBox'
import { isUserId } from '../entities/user'

export default function ChatPage() {
  const { userId } = useParams<{ userId: any }>()

  if (isUserId(userId)) {
    return (
      <CenteredContent>
        <ChatBox userId={userId} />
      </CenteredContent>
    )
  }

  return (
    <CenteredContent>
      <>User id is not valid</>
    </CenteredContent>
  )
}
