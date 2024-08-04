'use client';
import { useFormStatus } from 'react-dom';
import { ClipLoader } from 'react-spinners';
import './SubmitButton.css';

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="submit-button"
      aria-disabled={pending}
      disabled={pending}
    >
      {pending ? <ClipLoader size="1rem" /> : 'Submit'}
    </button>
  );
}
