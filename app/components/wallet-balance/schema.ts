import { z } from 'zod';

/**
 * GET https://api.ordinalsbot.com/opi/v1/brc20/get_current_balance_of_wallet
 */
export const walletBalanceSchema = z.object({
  error: z.string().min(1).nullable(),
  result: z
    .array(
      z.object({
        overall_balance: z.string(),
        available_balance: z.string(),
        block_height: z.number(),
        tick: z.string()
      })
    )
    .nullable()
});

export type WalletBalance = z.infer<typeof walletBalanceSchema>;

export const getWalletBalanceFormData = z.object({
  ticker: z.string().min(3),
  address: z.string().min(3)
});

export type GetWalletBalanceFormData = z.infer<typeof getWalletBalanceFormData>;

export function parseGetWalletBalanceForm(formData: GetWalletBalanceFormData) {
  return getWalletBalanceFormData.safeParse(formData);
}
