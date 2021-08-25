import { useHistory } from 'react-router-dom'

import paths from '../config/paths'
import { isServiceError } from '../errors/serviceError'
import useUserList from '../hooks/useUserList'
import CenteredContent from '../layout/CenteredContent'
import UserListItem from '../styled/UserListItem'

const userListStyle = {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
} as const

export default function UsersPage() {
  const userListOrError = useUserList()
  const history = useHistory()

  if (isServiceError(userListOrError)) {
    const serviceError = userListOrError
    return (
      <CenteredContent>
        <>{serviceError.messageForUser}</>
      </CenteredContent>
    )
  }

  const userList = userListOrError

  return (
    <CenteredContent>
      <div style={userListStyle}>
        <div>
          {userList.map((user, i) => (
            <UserListItem key={i} user={user} onClick={() => {
              history.push(paths.chat.replace(':userId', user.id));
            }} />
          ))}
        </div>
      </div>
    </CenteredContent>
  )
}
