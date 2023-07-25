export function isArrayLike(x) {
  return x && typeof x.length === 'number' && typeof x !== 'function'
}