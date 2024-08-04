'use server';

import fakeDelay from './fake-delay';

export async function getLatestBTCBlock() {
  await fakeDelay();

  return fetch(
    'https://api.blockcypher.com/v1/btc/main?token=' +
      process.env.BLOCK_CYPHER_API_TOKEN,
    { method: 'GET' }
  )
    .then((res) => res.json())
    .then((result) => {
      return result;
    });
}
