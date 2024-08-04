import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { Card } from '../../components/card/Card';
import ErrorMesage from '../../components/error-message/ErrorMessage';
import KeyValue from '../../components/key-value/KeyValue';
import Loader from '../../components/loader/Loader';
import fakeDelay from '../../lib/utils/fake-delay';
import { getTickerInfo } from './actions';

async function getData(ticker: string) {
  const response = await getTickerInfo(ticker);
  await fakeDelay();

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
