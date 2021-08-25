import { useState, useEffect } from 'react'

import type { Loading } from '../common/Loading'
import type { ServiceError } from '../errors/serviceError'
import type { User } from '../entities/user'

import { serviceError, isServiceError } from '../errors/serviceError'
import { loading } from '../common/Loading'

import api from '../api'

export default function useUserList(): Array<User> | ServiceError | Loading {
  const [hasLoaded, setHasLoaded] = useState(false)
  const [users, setUsers] = useState<Array<User>>([])
  const [error, setError] = useState<ServiceError>()

  useEffect(() => {
    api.users
      .list()
      .then((users) => {
        if (isServiceError(users)) {
          throw users
        }
        setUsers(users)
        setHasLoaded(true)
      })
      .catch((e) => {
        if (isServiceError(e)) {
          setError(e)
        } else {
          setError(serviceError('failed to load users'))
        }
      })
  }, [setHasLoaded, setUsers, setError])

  if (error) {
    return error
  }

  if (!hasLoaded) {
    return loading
  }

  return users
}
