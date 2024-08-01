import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import KeyValue from '../../components/key-value/KeyValue';
import Loader from '../../components/loader/Loader';
import { getOrderStatus } from './actions';
import { OrderStatus as TOrderStatus } from './schema';

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

  // KeyValue component does not handle nested objects, clone the response and remove tx
  const properties = { ...response } as Partial<TOrderStatus>;
  if (!!properties.tx) {
    delete properties.tx;
  }

  const tx = response.data?.tx;

  return (
    <article className="order-status__container">
      <h3>Order ID: {params.id}</h3>

      <Suspense fallback={<Loader />}>
        {properties && (
          <KeyValue object={properties as Omit<TOrderStatus, 'tx'>} />
        )}
        {tx && <KeyValue object={tx} />}
      </Suspense>
    </article>
  );
}
