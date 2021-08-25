export type ImageUri = string & { readonly __ImageUri: unique symbol }

export function isImageUri(a: any): a is ImageUri {
  console.warn(
    // TODO: Write something that validates the URI properly.  This is just a place holder for now.
    'TODO: Write something that validates the URI properly.  This is just a place holder for now.',
  )
  return typeof a === 'string' && a.match(`^http`) !== null
}
