import { isServiceError } from '../errors/serviceError'
import useUserList from '../hooks/useUserList'
import CenteredContent from '../layout/CenteredContent'

export default function UsersPage() {
  const userListOrError = useUserList()

  if (isServiceError(userListOrError)) {
    return (
      <CenteredContent>
        <>{userListOrError.messageForUser}</>
      </CenteredContent>
    )
  }

  return (
    <CenteredContent>
      <pre>{JSON.stringify(userListOrError, null, 2)}</pre>
    </CenteredContent>
  )
}
