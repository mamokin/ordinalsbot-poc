export const ETH_MAINNET_CHAIN_ID = 'eip155:1';
export const STACKS_MAINNET_CHAIN_ID = 'stacks:1';
export const STACKS_TESTNET_CHAIN_ID = 'stacks:2147483648';
export const BTC_MAINNET_CHAIN_ID = 'bip122:000000000019d6689c085ae165831e93';
export const BTC_TESTNET_CHAIN_ID = 'bip122:000000000933ea01ad0ee984209779ba';

export const CHAIN_IDS = [
  { chainId: ETH_MAINNET_CHAIN_ID, label: 'Ethereum Mainnet' },
  { chainId: STACKS_MAINNET_CHAIN_ID, label: 'Stacks Mainnet' },
  { chainId: STACKS_TESTNET_CHAIN_ID, label: 'Stacks Testnet' },
  { chainId: BTC_MAINNET_CHAIN_ID, label: 'BTC Mainnet' },
  { chainId: BTC_TESTNET_CHAIN_ID, label: 'BTC Testnet' }
] as const;
