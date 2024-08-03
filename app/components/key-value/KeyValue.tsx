'use client';
import { camelCaseToSentence } from '../../lib/utils/camel-case-to-sentence';
import { snakeCaseToSentence } from '../../lib/utils/snake-case-to-sentence';
import './KeyValue.css';

/**
 * Utility component to render all keys and their respective values of a provided object.
 * Note: nested objects are ignored
 */
export default function KeyValue({
  object
}: {
  object: Record<string, object | string | boolean | number | null>;
}) {
  const idRegex = /\bid\b/gi; // match words case insensitive 'id'

  const renderValueByTypeOrKey = (
    key: string,
    value: string | boolean | number | null
  ) => {
    const valueType = typeof value;
    const formattedValue = value?.toString();

    switch (valueType) {
      case 'boolean':
        return (
          <span className={formattedValue === 'true' ? 'success' : 'error'}>
            {formattedValue}
          </span>
        );
      case 'number':
        return <span className="info">{value}</span>;
      default:
        const isID = idRegex.test(key) || key.includes('_id');
        const isAddress = key.includes('_address');

        // underline IDs and addresses
        if (formattedValue && (isID || isAddress)) {
          return <span className="underline">{formattedValue}</span>;
        }

        return formattedValue;
    }
  };

  const renderKV = (k: string, v: string | boolean | number | null) => {
    const prettyKey = snakeCaseToSentence(k);

    return (
      <p key={k} className="key-value__statistic">
        <span className="key-value__statistic-key bold capitalize">
          {camelCaseToSentence(prettyKey).replace(idRegex, 'ID')}
        </span>
        &nbsp;
        {renderValueByTypeOrKey(k, v)}
      </p>
    );
  };

  return (
    <>
      {Object.entries(object).map(([k, v]) => {
        if (v && typeof v !== 'object') {
          return renderKV(k, v);
        }

        return null;
      })}
    </>
  );
}
