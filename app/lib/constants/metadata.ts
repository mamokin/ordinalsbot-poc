import { Metadata } from 'next';

export const APP_NAME = 'Ordinalsbot POC';

export const DEFAULT_METADATA: Metadata = {
  title: {
    default: `${APP_NAME}`,
    template: `${APP_NAME} | %s`
  }
};
