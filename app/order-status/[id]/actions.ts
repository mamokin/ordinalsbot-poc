'use server';
import { OrderStatus, orderStatusSchema } from './schema';

/**
 * GET https://api.ordinalsbot.com/order
 */
export async function getOrderStatus(id: string) {
  return fetch(`https://api.ordinalsbot.com/order?id=${id}`, {
    method: 'GET',
    // @ts-expect-error - 'x-api-key' custom header in use
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.API_KEY // TODO: not needed according to docs, confirm
    }
  })
    .then((res) => res.json())
    .then(async (orderStatus: OrderStatus) => {
      console.log('orderStatus', orderStatus);
      if (orderStatus.status === 'error' && !!orderStatus.error) {
        console.error('FAILED to GET ORDER STATUS: ', orderStatus.error);
        return { error: orderStatus.error };
      }
      const { success, data, error } =
        await orderStatusSchema.safeParseAsync(orderStatus);

      if (!success) {
        console.error('FAILED to parse ORDER STATUS: ', error);
        return null;
      }

      return { data };
    });
}
