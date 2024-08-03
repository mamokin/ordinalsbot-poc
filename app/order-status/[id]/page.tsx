import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { Card } from '../../components/card/Card';
import KeyValue from '../../components/key-value/KeyValue';
import Loader from '../../components/loader/Loader';
import { getOrderStatus } from './actions';
import './page.css';

export default async function OrderStatus({
  params
}: {
  params: { id: string };
}) {
  if (!params.id) {
    redirect('/');
  }

  const response = await getOrderStatus(params.id);

  if (!response) {
    return null;
  }

  return (
    <article className="order-status__container">
      <Card>
        <h3>Order ID: {params.id}</h3>

        <Suspense fallback={<Loader />}>
          {!response.error && response.data && (
            <KeyValue object={response.data} />
          )}
          {response.error && (
            <p
              aria-live="polite"
              className="order-info__error error"
              role="status"
            >
              Error: {response.error}
            </p>
          )}
        </Suspense>
      </Card>
    </article>
  );
}
