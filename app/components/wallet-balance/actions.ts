'use server';
import {
  parseGetWalletBalanceForm,
  WalletBalance,
  walletBalanceSchema
} from './schema';
import { WalletBalanceFormState } from './WalletBalance';

/**
 * GET https://api.ordinalsbot.com/opi/v1/brc20/get_current_balance_of_wallet
 */
export async function getWalletBalance(ticker: string, address: string) {
  return fetch(
    `https://api.ordinalsbot.com/opi/v1/brc20/get_current_balance_of_wallet?address=${address},ticker=${ticker}`,
    {
      method: 'GET',
      // @ts-expect-error - 'x-api-key' custom header in use
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY
      }
    }
  )
    .then((res) => res.json())
    .then(async (walletBalance: WalletBalance) => {
      const { success, data, error } =
        await walletBalanceSchema.safeParseAsync(walletBalance);

      if (!success) {
        console.error('FAILED to GET WALLET BALANCE: ', error);
      }

      return data;
    });
}

export async function getWalletBalanceWithFormDataAction(
  prevState: WalletBalanceFormState,
  formData: FormData
) {
  const { success, data, error } = parseGetWalletBalanceForm({
    ticker: formData.get('ticker') as string,
    address: formData.get('address') as string
  });

  try {
    const response = await getWalletBalance(
      data?.ticker || '',
      data?.address || ''
    );

    if (response) {
      return {
        message: 'fetched data success',
        data: response.result as WalletBalance['result'],
        error: response.error || ''
      };
    }

    return { message: `fake success message` };
  } catch (e) {
    return { error: `fake failure message` };
  }
}
