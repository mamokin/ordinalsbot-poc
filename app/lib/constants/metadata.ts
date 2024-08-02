import { Metadata } from 'next';

export const APP_NAME = 'Ordinals POC';

export const DEFAULT_METADATA: Metadata = {
  title: {
    default: `${APP_NAME}`,
    template: `${APP_NAME} | %s`
  },
  manifest: './manifest.json'
};
