const loading = Symbol.for('__loading__')
export type Loading = typeof loading
export function isLoading(a: any): a is Loading {
  return a === loading
}
