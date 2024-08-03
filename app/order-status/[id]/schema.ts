import { z } from 'zod';

const orderStatusTxSchema = z.object({
  commit: z.string(),
  inscription: z.string(),
  reveal: z.string(),
  fees: z.string().optional(), // not marked optional in docs
  total_fees: z.number().optional(), // not documented
  updated_at: z.string().optional() // not documented
});

const orderStatusFileSchema = z.object({
  completed: z.boolean(),
  inscriptionId: z.string(),
  iqueued: z.boolean(),
  iqueuedAt: z.number(),
  name: z.string(),
  processing: z.boolean(),
  s3Key: z.string(),
  sent: z.string(),
  size: z.number(),
  status: z.string(),
  tx: orderStatusTxSchema.optional(),
  type: z.string(),
  url: z.string(),
  webhookUrl: z.string()
});

const orderStatusLightningInvoiceSchema = z.object({
  expires_at: z.number(),
  payreq: z.string()
});

const orderStatusChainInvoiceSchema = z.object({
  address: z.string()
});

const orderStatusChargeSchema = z.object({
  address: z.string(),
  amount: z.number(),
  auto_settle: z.boolean(),
  chain_invoice: orderStatusChainInvoiceSchema,
  created_at: z.number(),
  currency: z.string(),
  desc_hash: z.boolean(),
  description: z.string(),
  fiat_value: z.number(),
  hosted_checkout_url: z.string(),
  id: z.string(),
  lightning_invoice: orderStatusLightningInvoiceSchema,
  source_fiat_value: z.number(),
  status: z.string(),
  ttl: z.number(),
  uri: z.string(),
  callback_url: z.string()
});
/**
 * GET https://api.ordinalsbot.com/order
 *
 * @see https://docs.ordinalsbot.com/api/get-order-status
 * - docs are missing most of the schema
 */
export const orderStatusSchema = z.object({
  reason: z.string().optional(), // internal server error schema
  error: z.string().optional(), // OK error schema
  status: z.string(), // OK normal, OK error, & internal server error schemas
  paid: z.boolean(),
  underpaid: z.boolean().optional(),
  expired: z.boolean().optional(),
  tx: orderStatusTxSchema.optional(),
  sent: z.string().optional(),
  baseFee: z.number(),
  chainFee: z.number(),
  charge: orderStatusChargeSchema.optional(),
  completed: z.boolean(),
  createdAt: z.number(),
  fee: z.number(),
  files: z.array(orderStatusFileSchema).optional(),
  id: z.string(),
  inscribedCount: z.number(),
  lowPostage: z.boolean(),
  orderType: z.string(),
  // paid: z.object({}),
  paidAt: z.number(),
  postage: z.number(),
  processing: z.boolean(),
  processingAt: z.number(),
  rareSatsFee: z.number(),
  receiveAddress: z.string(),
  serviceFee: z.number(),
  state: z.string()
});

export type OrderStatus = z.infer<typeof orderStatusSchema>;

export const orderStatusFormData = z.object({
  id: z.string().min(3)
});

export type GetOrderStatusFormData = z.infer<typeof orderStatusFormData>;

export function parseGetTickerInfoForm({ id }: GetOrderStatusFormData) {
  return orderStatusFormData.safeParse({ id });
}
