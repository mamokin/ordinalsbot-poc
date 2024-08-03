import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { Card } from '../../components/card/Card';
import ErrorMesage from '../../components/error-message/ErrorMessage';
import KeyValue from '../../components/key-value/KeyValue';
import Loader from '../../components/loader/Loader';
import { getTickerInfo } from './actions';

async function getData(ticker: string) {
  const response = await getTickerInfo(ticker);
  // fake delay to demonstrate SSR Suspenseful component in action
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
      <Card>
        <h3>Ticker: {params.ticker}</h3>

        <Suspense fallback={<Loader />}>
          {response?.error && <ErrorMesage error={response.error} />}
          {!response?.error && response?.result && (
            <KeyValue object={response.result} excludeKeys={['tick']} />
          )}
        </Suspense>
      </Card>
    </article>
  );
}
