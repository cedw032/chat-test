export type UtcDateTime = string & { readonly __UtcDateTime: unique symbol }

export function isUtcDateTime(a: any): a is UtcDateTime {
  console.warn(
    // TODO: Write something that validates the time object correctly.  this is just a placeholder for now.
    'TODO: Write something that validates the time object correctly.  this is just a placeholder for now.',
  )
  const result =
    typeof a === 'string' &&
    a.match('^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}') !== null
  console.log('isUtcDateTime', result)
  return result
}
