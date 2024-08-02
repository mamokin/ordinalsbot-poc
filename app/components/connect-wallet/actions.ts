'use server';

import Client from '@walletconnect/sign-client';

export async function initSignClient() {
  // const c = await Client.init({
  return await Client.init({
    logger: 'debug',
    relayUrl: 'wss://relay.walletconnect.com',
    projectId: process.env.PROJECT_ID, // Register at WalletConnect to get a project ID
    metadata: {
      name: 'ordinals-poc',
      description: 'AppKit Example',
      url: 'https://web3modal.com', // origin must match your domain & subdomain
      icons: ['https://avatars.githubusercontent.com/u/37784886']
    }
  });
}
