export type NonEmptyString = string & {
  readonly __NonEmptyString: unique symbol
}

export function isNonEmptyString(a: any): a is NonEmptyString {
  const result = typeof a === 'string' && a.length !== 0
  console.log('isNonEmptyString', result)
  return result
}
