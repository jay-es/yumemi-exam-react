export const isNonNullable = <T>(v: T): v is NonNullable<T> =>
  v !== null && v !== undefined
