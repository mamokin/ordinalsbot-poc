'use server';
import { parseZodErrors } from '../../lib/utils/parse-zod-errors';
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

  if (!success) {
    return { message: '', error: parseZodErrors(error), data: null };
  }

  try {
    const response = await getTickerInfo(data?.ticker || '');

    if (response) {
      return {
        message: 'fetched data success',
        error: response.error || '',
        data: response.result as TickerInfo['result']
      };
    }

    return {
      message: '',
      error: 'Failed to fetch ticker info.',
      data: null
    };
  } catch (e) {
    return {
      message: '',
      error: 'Failed to fetch ticker info.',
      data: null
    };
  }
}
