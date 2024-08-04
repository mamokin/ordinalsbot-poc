'use client';
import { useFormStatus } from 'react-dom';

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" aria-disabled={pending} disabled={pending}>
      {pending ? 'Loading...' : 'Submit'}
    </button>
  );
}
