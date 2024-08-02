'use server';
import { parseZodErrors } from '../../lib/utils/parse-zod-errors';
import {
  parseGetWalletBalanceForm,
  WalletBalance,
  walletBalanceSchema
} from './schema';
import { WalletBalanceFormState } from './WalletBalance';

/**
 * GET https://api.ordinalsbot.com/opi/v1/brc20/get_current_balance_of_wallet
 */
export async function getWalletBalance(address: string, ticker?: string) {
  let req = `https://api.ordinalsbot.com/opi/v1/brc20/get_current_balance_of_wallet?address=${address}`;

  if (ticker) {
    req += `ticker=${ticker}`;
  }

  return fetch(req, {
    method: 'GET',
    // @ts-expect-error - 'x-api-key' custom header in use
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.API_KEY
    }
  })
    .then((res) => res.json())
    .then(async (walletBalance: WalletBalance) => {
      const { success, data, error } =
        await walletBalanceSchema.safeParseAsync(walletBalance);

      if (!success) {
        console.error('FAILED to GET WALLET BALANCE: ', parseZodErrors(error));
      }

      return data;
    });
}

export async function getWalletBalanceWithFormDataAction(
  prevState: WalletBalanceFormState,
  formData: FormData
) {
  const { success, data, error } = parseGetWalletBalanceForm({
    ticker: (formData.get('ticker') as string) || undefined,
    address: formData.get('address') as string
  });

  if (!success) {
    return { error: 'Error:' + parseZodErrors(error) };
  }

  try {
    if (data?.address) {
      const response = await getWalletBalance(data.address, data?.ticker);

      if (response) {
        return {
          message: 'Success: retrieved wallet balance',
          data: response.result as WalletBalance['result'],
          error: response.error || ''
        };
      }
    }

    return { error: 'Error: Missing address.' };
  } catch (e) {
    return { error: 'Something went wrong...' };
  }
}
