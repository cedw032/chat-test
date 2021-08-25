type ScrollViewProps = {
  children: JSX.Element | Array<JSX.Element>
  style?: React.CSSProperties
}

const scrollViewStyle = {
  overflow: 'auto',
}

export default function ScrollView({ children, style }: ScrollViewProps) {
  return <div style={{ ...scrollViewStyle, ...style }}>{children}</div>
}
