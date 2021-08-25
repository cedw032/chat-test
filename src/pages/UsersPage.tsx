import { useHistory } from 'react-router-dom'

import paths from '../config/paths'
import { isServiceError } from '../errors/serviceError'
import { isLoading } from '../common/Loading'
import useUserList from '../hooks/useUserList'
import CenteredContent from '../layout/CenteredContent'
import UserListItem from '../styled/UserListItem'
import ScrollView from '../styled/ScrollView'

const userListStyle = {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
} as const

export default function UsersPage() {
  const userList = useUserList()
  const history = useHistory()

  if (isServiceError(userList)) {
    return (
      <CenteredContent>
        <>{userList.messageForUser}</>
      </CenteredContent>
    )
  }

  if (isLoading(userList)) {
    return (
      <CenteredContent>
        <>Loading...</>
      </CenteredContent>
    )
  }

  return (
    <CenteredContent>
      <div style={userListStyle}>
        <ScrollView>
          {userList.map((user, i) => (
            <UserListItem
              key={i}
              user={user}
              onClick={() => {
                history.push(paths.chat.replace(':userId', user.id))
              }}
            />
          ))}
        </ScrollView>
      </div>
    </CenteredContent>
  )
}
