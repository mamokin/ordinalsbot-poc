'use client';
import './ErrorMessage.css';

export default function ErrorMesage({ error }: { error: string }) {
  return (
    <p
      aria-live="polite"
      className="error-message__message error"
      role="status"
    >
      Error: {error}
    </p>
  );
}
