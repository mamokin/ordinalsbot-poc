'use client';

import { camelCaseToSentence } from '../../lib/utils/camel-case-to-sentence';
import { snakeCaseToSentence } from '../../lib/utils/snake-case-to-sentence';

/**
 * Utility component to render all keys and their respective values of a provided object.
 * Note: nested objects are ignored
 */
export default function KeyValue({
  object
}: {
  object: Record<string, object | string | boolean | number | null>;
}) {
  const renderValueByKey = (
    key: string,
    value: string | boolean | number | null
  ) => {
    switch (key) {
      case 'id':
        return <span className="uppercase">{value}</span>;
      case 'baseFee':
      case 'chainFee':
      case 'createdAt':
      case 'inscribedCount':
      case 'paidAt':
      case 'postage':
      case 'processingAt':
      case 'serviceFee':
      case 'fee':
      case 'inscribedCount':
        return <span className="number">{value}</span>;
      case 'receiveAddress':
        return <span className="underline">{value}</span>;
      default:
        const formatted = value?.toString();

        if (formatted === 'true') {
          return <span className="success">{formatted}</span>;
        } else if (formatted === 'false') {
          return <span className="error">{formatted}</span>;
        }

        return formatted;
    }
  };

  const renderKV = (k: string, v: string | boolean | number | null) => {
    const prettyKey = snakeCaseToSentence(k);

    return (
      <p key={k} className="key-value__statistic">
        <span className={`${k === 'id' ? 'uppercase' : 'capitalize'} bold`}>
          {camelCaseToSentence(prettyKey)}
        </span>
        :&nbsp;
        {renderValueByKey(k, v)}
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
