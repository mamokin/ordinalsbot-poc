/**
 * Utility method to simulate a slow connection or to inject a delay on anything.
 * Can be used to demonstrate suspenseful components.
 * Defaults to waiting for **seven** seconds.
 */
export default async function fakeDelay(ms = 7000) {
  console.info(`Performing a fake delay of ${ms / 1000}s`);
  return await new Promise((resolve) => setTimeout(resolve, ms));
}
