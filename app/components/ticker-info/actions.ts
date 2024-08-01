'use server';
import { parseGetTickerInfoForm, TickerInfo, tickerInfoSchema } from './schema';
import { TickerInfoFormState } from './TickerInfo';

/**
 * GET https://api.ordinalsbot.com/opi/v1/brc20/ticker_info
 */
export async function getTickerInfo(ticker: string) {
  return fetch(
    `https://api.ordinalsbot.com/opi/v1/brc20/ticker_info?ticker=${ticker}`,
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
    .then(async (tickerInfo: TickerInfo) => {
      const { success, data, error } =
        await tickerInfoSchema.safeParseAsync(tickerInfo);

      if (!success) {
        console.error('FAILED to GET TICKER INFO: ', error);
        return null;
      }

      return data;
    });
}

export async function getTickerInfoWithFormDataAction(
  prevState: TickerInfoFormState,
  formData: FormData
) {
  const { success, data, error } = parseGetTickerInfoForm({
    ticker: formData.get('ticker') as string
  });

  try {
    const response = await getTickerInfo(data?.ticker || '');

    if (response) {
      return {
        message: 'fetched data success',
        data: response.result as TickerInfo['result'],
        error: response.error || ''
      };
    }

    return { message: `fake success message` };
  } catch (e) {
    return { error: `fake failure message` };
  }
}
