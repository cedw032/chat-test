import type { Loading } from '../common/Loading'
import type { ServiceError } from '../errors/serviceError'
import type { User } from '../entities/user'
import type { NonEmptyString } from '../common/NonEmptyString'

import { isUser } from '../entities/user'

const mockUsers = [
  {
    createdAt: '2021-08-04T22:08:33.505Z',
    avatar: 'https://cdn.fakercloud.com/avatars/osvaldas_128.jpg',
    firstName: 'Eusebio',
    lastName: 'Mante',
    id: '1',
  },
  {
    createdAt: '2021-08-05T03:26:56.798Z',
    avatar: 'https://cdn.fakercloud.com/avatars/thiagovernetti_128.jpg',
    firstName: 'Dangelo',
    lastName: 'Cormier',
    id: '2',
  },
  {
    createdAt: '2021-08-16T15:54:37.321Z',
    avatar: 'https://cdn.fakercloud.com/avatars/xiel_128.jpg',
    firstName: 'Ben',
    lastName: 'Dover',
    id: '3',
  },
] as Array<any>

export default function useUserList(): Array<User> | ServiceError | Loading {
  if (mockUsers.every(isUser)) {
    return mockUsers
  }

  return {
    messageForUser: 'user list from api contained bad data' as NonEmptyString,
  } as const
}
