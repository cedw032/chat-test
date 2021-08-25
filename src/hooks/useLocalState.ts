import { useState, useRef } from 'react'

export default function useLocalState<T>(key: string, initial: T) {
  const isFirstRun = useRef(true)
  if (isFirstRun.current) {
    isFirstRun.current = false
    const s = localStorage.getItem(key)
    if (s !== null) {
      initial = JSON.parse(s) as any
    }
  }

  let [state, setState] = useState<T>(initial)

  return [
    state,
    (newState: T) => {
      localStorage.setItem(key, JSON.stringify(newState))
      setState(newState)
    },
  ] as const
}
