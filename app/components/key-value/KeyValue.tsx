'use client';

/**
 * Utility component to render all keys and their respective values of a provided object.
 */
export default function KeyValue({
  object
}: {
  object: Record<string, string | boolean | number | null>;
}) {
  return (
    <>
      {Object.entries(object).map(([k, v]) => (
        <p key={k} className="key-value__statistic">
          <span style={{ fontWeight: 700 }}>{k}</span>: {v}
        </p>
      ))}
    </>
  );
}
