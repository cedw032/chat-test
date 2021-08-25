export type NonEmptyString = string & {
  readonly __NonEmptyString: unique symbol
}

export function isNonEmptyString(a: any): a is NonEmptyString {
  return typeof a === 'string' && a.length !== 0
}
