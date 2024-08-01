import { z } from 'zod';

/**
 * GET https://api.ordinalsbot.com/order
 */
export const orderStatusSchema = z.object({
  error: z.string().min(1).optional(),
  status: z.string().min(1).nullable(),
  paid: z.boolean(),
  underpaid: z.boolean(),
  expired: z.boolean(),
  tx: z
    .object({
      commit: z.string(),
      fees: z.string(),
      inscription: z.string(),
      reveal: z.string()
    })
    .nullable(),
  sent: z.string().min(1).nullable()
});

export type OrderStatus = z.infer<typeof orderStatusSchema>;

export const orderStatusFormData = z.object({
  id: z.string().min(3)
});

export type GetOrderStatusFormData = z.infer<typeof orderStatusFormData>;

export function parseGetTickerInfoForm({ id }: GetOrderStatusFormData) {
  return orderStatusFormData.safeParse({ id });
}
