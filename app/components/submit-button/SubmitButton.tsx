'use client';
import { useFormStatus } from 'react-dom';

export function SubmitButton() {
  const { pending, method } = useFormStatus();

  return (
    <button
      type="submit"
      aria-disabled={pending}
      disabled={pending}
      className=""
    >
      Submit
    </button>
  );
}
