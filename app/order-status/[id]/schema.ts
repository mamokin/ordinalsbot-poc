import { z } from 'zod';

const orderStatusTxSchema = z
  .object({
    commit: z.string().optional(),
    inscription: z.string().optional(),
    reveal: z.string().optional(),
    fees: z.string().optional(), // not marked optional in docs
    total_fees: z.number().optional(), // not documented
    updated_at: z.string().optional() // not documented
  })
  .optional();

const orderStatusFileSchema = z
  .object({
    completed: z.boolean().optional(),
    inscriptionId: z.string().optional(),
    iqueued: z.boolean().optional(),
    iqueuedAt: z.number().optional(),
    name: z.string().optional(),
    processing: z.boolean().optional(),
    s3Key: z.string().optional(),
    sent: z.string().optional(),
    size: z.number().optional(),
    status: z.string().optional(),
    tx: orderStatusTxSchema.optional(),
    type: z.string().optional(),
    url: z.string().optional(),
    webhookUrl: z.string().optional()
  })
  .optional();

const orderStatusLightningInvoiceSchema = z
  .object({
    expires_at: z.number().optional(),
    payreq: z.string().optional()
  })
  .optional();

const orderStatusChainInvoiceSchema = z
  .object({
    address: z.string().optional()
  })
  .optional();

const orderStatusChargeSchema = z
  .object({
    address: z.string().optional(),
    amount: z.number().optional(),
    auto_settle: z.boolean().optional(),
    chain_invoice: orderStatusChainInvoiceSchema,
    created_at: z.number().optional(),
    currency: z.string().optional(),
    desc_hash: z.boolean().optional(),
    description: z.string().optional(),
    fiat_value: z.number().optional(),
    hosted_checkout_url: z.string().optional(),
    id: z.string().optional(),
    lightning_invoice: orderStatusLightningInvoiceSchema,
    source_fiat_value: z.number().optional(),
    status: z.string().optional(),
    ttl: z.number().optional(),
    uri: z.string().optional(),
    callback_url: z.string().optional()
  })
  .optional();
/**
 * GET https://api.ordinalsbot.com/order
 *
 * @see https://docs.ordinalsbot.com/api/get-order-status
 * - docs are missing most of the schema
 */
export const orderStatusSchema = z.object({
  reason: z.string().optional(), // internal server error schema
  error: z.string().optional(), // OK error schema
  status: z.string().optional(), // OK normal, OK error, & internal server error schemas
  paid: z.boolean().optional(),
  underpaid: z.boolean().optional(),
  expired: z.boolean().optional(),
  tx: orderStatusTxSchema,
  sent: z.string().optional(),
  baseFee: z.union([z.number().optional(), z.string().optional()]),
  chainFee: z.number().optional(),
  charge: orderStatusChargeSchema.optional(),
  completed: z.boolean().optional(),
  createdAt: z.number().optional(),
  fee: z.union([z.number().optional(), z.string()]),
  files: z.array(orderStatusFileSchema).optional(),
  id: z.string().optional(),
  inscribedCount: z.number().optional(),
  lowPostage: z.boolean().optional(),
  orderType: z.string().optional(),
  // paid: z.object({}),
  paidAt: z.number().optional(),
  postage: z.number().optional(),
  processing: z.boolean().optional(),
  processingAt: z.number().optional(),
  rareSatsFee: z.number().optional(),
  receiveAddress: z.string().optional(),
  serviceFee: z.number().optional(),
  state: z.string().optional()
});

export type OrderStatus = z.infer<typeof orderStatusSchema>;

export const orderStatusFormData = z.object({
  id: z.string().min(3)
});

export type GetOrderStatusFormData = z.infer<typeof orderStatusFormData>;

export function parseGetTickerInfoForm({ id }: GetOrderStatusFormData) {
  return orderStatusFormData.safeParse({ id });
}
