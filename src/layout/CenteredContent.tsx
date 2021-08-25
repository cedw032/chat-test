import palette from '../config/palette'

type CenteredContentProps = {
  children: JSX.Element
}

const backgroundStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  height: '100%',
  width: '100%',
  backgroundColor: palette.bodyBackground,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
} as const

const contentStyle = {
  backgroundColor: palette.contentBackground,
  width: 560,
  height: 536,
  filter: `drop-shadow(0px 3px 20px ${palette.shadowColor}`,
  padding: 14,
  overflow: 'hidden',
} as const

export default function CenteredContent({ children }: CenteredContentProps) {
  return (
    <div style={backgroundStyle}>
      <div style={contentStyle}>{children}</div>
    </div>
  )
}
