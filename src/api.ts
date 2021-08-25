import type { Message } from './entities/message'
import type { User } from './entities/user'
import { serviceError, isServiceError } from './errors/serviceError'
import { fromApiMessage, isMessage } from './entities/message'
import { isUser } from './entities/user'

const baseUrl = 'https://610b713652d56400176b0255.mockapi.io'

async function get(path: string) {
  const response = await fetch(`${baseUrl}/${path}`)
  if (response.ok) {
    try {
      return await response.json()
    } catch (e: any) {
      return serviceError(`Failed to decode API response for path ${path}`)
    }
  }
  return serviceError(`API response status is not ok for path ${path}`)
}

const api = {
  messages: {
    list: async () => {
      const data = await get('messages')
      if (isServiceError(data)) {
        return data
      }
      if (Array.isArray(data)) {
        const transformed = data.map(fromApiMessage)
        if (transformed.every(isMessage)) {
          return transformed as Array<Message>
        }
      }
      return serviceError('unexpected response when requesting messages')
    },
  },
  users: {
    list: async () => {
      const data = await get('users')
      if (isServiceError(data)) {
        return data
      }
      if (Array.isArray(data)) {
        if (data.every(isUser)) {
          return data as Array<User>
        }
      }
      return serviceError('unexpected response when requesting users')
    },
  },
} as const

export default api
