/**
 * String utility method that is primarily used to format an object key into something presentable.
 *
 * @example camelCaseToSentend('baseFee') => 'base fee'
 */
export function camelCaseToSentence(input: string) {
  return input
    .replace(/([A-Z]+)/g, ',$1')
    .replace(/^,/, '')
    .split(',')
    .join(' ')
    .toLowerCase();
}
