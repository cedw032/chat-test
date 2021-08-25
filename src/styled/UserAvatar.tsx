import type { User } from '../entities/user'

type UserAvatarProps = {
  user: User
  size: number
}

const style = {
  borderRadius: '50%',
}

export default function UserAvatar({ user, size }: UserAvatarProps) {
  const altText = `avatar for ${user.firstName} ${user.lastName}`
  return (
    <img alt={altText} src={user.avatar} style={{ ...style, height: size }} />
  )
}
