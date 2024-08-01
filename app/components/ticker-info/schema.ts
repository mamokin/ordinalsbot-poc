import { z } from 'zod';

/**
 * GET https://api.ordinalsbot.com/opi/v1/brc20/ticker_info
 */
export const tickerInfoSchema = z.object({
  error: z.string().min(1).nullable(),
  result: z
    .object({
      id: z.string(),
      original_tick: z.string(),
      tick: z.string(),
      max_supply: z.string(),
      decimals: z.number(),
      limit_per_mint: z.string(),
      remaining_supply: z.string(),
      burned_supply: z.string(),
      is_self_mint: z.boolean(),
      deploy_inscription_id: z.string(),
      block_height: z.number()
    })
    .nullable()
});

export type TickerInfo = z.infer<typeof tickerInfoSchema>;

export const getTickerInfoFormData = z.object({
  ticker: z.string().min(3)
});

export type GetTickerInfoFormData = z.infer<typeof getTickerInfoFormData>;

export function parseGetTickerInfoForm({ ticker }: GetTickerInfoFormData) {
  return getTickerInfoFormData.safeParse({ ticker });
}
