import type { User } from '../entities/user'
import UserAvatar from './UserAvatar'

type UserListItemProps = {
  user: User
  onClick: () => void
}

const itemStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'left',
  alignItems: 'center',
  width: '100%',
  marginBottom: 20,
  cursor: 'pointer',
} as const

const userInfoStyle = {
  marginLeft: 14,
}

const firstNameStyle = {
  fontSize: 24,
  fontWeight: 'bold',
} as const

const lastNameStyle = {
  fontSize: 18,
  fontWeight: 'bold',
} as const

export default function UserListItem({ user, onClick }: UserListItemProps) {
  return (
    <div style={itemStyle} onClick={onClick}>
      <UserAvatar size={100} user={user} />
      <div style={userInfoStyle}>
        <div style={firstNameStyle}>{user.firstName}</div>
        <div style={lastNameStyle}>{user.lastName}</div>
      </div>
    </div>
  )
}
