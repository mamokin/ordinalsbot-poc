'use server';

import {
  TickerInfo,
  tickerInfoSchema
} from '../../components/ticker-info/schema';
import { DEFAULT_HEADERS } from '../../lib/constants/fetch';

/**
 * GET https://api.ordinalsbot.com/opi/v1/brc20/ticker_info
 */
export async function getTickerInfo(ticker: string) {
  return fetch(
    `https://api.ordinalsbot.com/opi/v1/brc20/ticker_info?ticker=${ticker}`,
    {
      ...DEFAULT_HEADERS,
      method: 'GET'
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
