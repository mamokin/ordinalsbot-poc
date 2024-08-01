import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import KeyValue from '../../components/key-value/KeyValue';
import Loader from '../../components/loader/Loader';
import { getTickerInfo } from './actions';

async function getData(ticker: string) {
  const response = await getTickerInfo(ticker);
  await new Promise((resolve) => setTimeout(resolve, 7000));

  return response;
}

export default async function Page({ params }: { params: { ticker: string } }) {
  if (!params.ticker) {
    redirect('/');
  }

  const response = await getData(params.ticker);

  return (
    <article>
      <h3>Ticker: {params.ticker}</h3>

      <Suspense fallback={<Loader />}>
        {response?.error && (
          <p className="ticker-info__error">{response.error}</p>
        )}
        {!response?.error && response?.result && (
          <KeyValue object={response.result} />
        )}
      </Suspense>
    </article>
  );
}
