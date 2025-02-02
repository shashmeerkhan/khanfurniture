export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-22'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)
export const token = assertValue(
  "skUZustyooTqPSJlJz86WR3aiutskxloTeOays3Bu1B4yPpdFFg9oFGhumekVrf7hDMgXEKO5aYHe9aFzqk75nHv5zzPhVY1rlV7dGIShyA8vGq2oJZ0ytt7bvxuFBcYTtwjIZMr3EcPxCSOKUf8GZgea56W6jseUHn4CaRBp3wHup4NE7xo"
 , 'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)
function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
