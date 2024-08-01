'use server';

import {
  TickerInfo,
  tickerInfoSchema
} from '../../components/ticker-info/schema';

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
      if (!tickerInfo.result) {
        return null;
      }

      const { success, data, error } =
        await tickerInfoSchema.safeParseAsync(tickerInfo);

      if (!success) {
        console.error('FAILED to GET TICKER INFO: ', error);
        return null;
      }

      return data;
    });
}
