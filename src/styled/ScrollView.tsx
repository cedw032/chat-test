import { useEffect } from 'react'
import { useRef } from 'react'

type ScrollViewProps = {
  children: JSX.Element | Array<JSX.Element>
  style?: React.CSSProperties
  setRef?: (r: ScrollViewInterface) => void
}

export type ScrollViewInterface = {
  scrollToBottom: () => void
}

const scrollViewStyle = {
  overflow: 'auto',
}

export default function ScrollView({
  children,
  style,
  setRef,
}: ScrollViewProps) {
  const divRef = useRef<HTMLDivElement>()

  useEffect(() => {
    if (setRef) {
      setRef({
        scrollToBottom: () => {
          if (divRef.current) {
            divRef.current.scrollTop = divRef.current.scrollHeight
          }
        },
      } as const)
    }
  }, [setRef])

  return (
    <div
      ref={(r) => (divRef.current = r || undefined)}
      style={{ ...scrollViewStyle, ...style }}
    >
      {children}
    </div>
  )
}
