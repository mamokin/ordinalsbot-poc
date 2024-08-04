'use server';
import { DEFAULT_HEADERS } from '../../lib/constants/fetch';
import fakeDelay from '../../lib/utils/fake-delay';
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

  await fakeDelay();

  return fetch(req, {
    ...DEFAULT_HEADERS,
    method: 'GET'
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
    return { error: parseZodErrors(error) };
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

    return { error: 'Missing address.' };
  } catch (e) {
    return { error: 'Something went wrong...' };
  }
}
