'use server';
import { parseZodErrors } from '../../lib/utils/parse-zod-errors';
import { OrderStatus, orderStatusSchema } from './schema';

/**
 * GET https://api.ordinalsbot.com/order
 */
export async function getOrderStatus(id: string) {
  return fetch(`https://api.ordinalsbot.com/order?id=${id}`, {
    method: 'GET'
  })
    .then((res) => res.json())
    .then(async (orderStatus: OrderStatus) => {
      if (orderStatus.status === 'error' && !!orderStatus.error) {
        return { error: orderStatus.error, data: undefined };
      }

      const { success, data, error } =
        await orderStatusSchema.safeParseAsync(orderStatus);

      if (!success) {
        return {
          error: `Schema parsing error: ${parseZodErrors(error)}`,
          data: undefined
        };
      }

      return { error: '', data };
    });
}
