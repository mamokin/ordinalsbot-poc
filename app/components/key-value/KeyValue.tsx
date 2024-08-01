export default async function KeyValue({
  object
}: {
  object: Record<string, string | boolean | number | null>;
}) {
  return (
    <>
      {Object.entries(object).map(([k, v]) => (
        <p key={k} className="key-value__statistic">
          {k}: {v}
        </p>
      ))}
    </>
  );
}
