export const DEFAULT_HEADERS: RequestInit = {
  // @ts-expect-error - 'x-api-key' custom header in use
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': process.env.API_KEY
  }
};
