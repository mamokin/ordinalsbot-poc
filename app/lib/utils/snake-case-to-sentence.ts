/**
 * String utility method that is primarily used to format an object key into something presentable.
 *
 * @example snakeCaseToSentence('base_fee') => 'base fee'
 */
export function snakeCaseToSentence(variable: string) {
  return variable.replace(/_/g, ' ');
}
