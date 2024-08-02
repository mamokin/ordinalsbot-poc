import { ZodError } from 'zod';

/**
 * Zod Error Parser
 * @returns a string containing any/all errors
 */
export function parseZodErrors(error: ZodError): string {
  const errors: string[] = [];
  const flat = error.flatten();

  Object.entries(flat.fieldErrors).forEach(([k, v]) => {
    errors.push(`${k}: ${v?.join('\n')}`);
  });

  return errors.join('\n');
}
