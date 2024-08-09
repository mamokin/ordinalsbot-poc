import { SessionTypes } from '@walletconnect/types';
import {
  BTC_MAINNET_CHAIN_ID,
  STACKS_MAINNET_CHAIN_ID,
  STACKS_TESTNET_CHAIN_ID
} from '../constants/chain-ids';
import { shortenAddress } from './address';

export function getSessionMetrics(session: SessionTypes.Struct) {
  const isStacksAccount = !!session.namespaces?.stacks;
  const isEip155Account = !!session.namespaces?.eip155;
  const isBip122Account = !!session.namespaces?.bip122;
  const provider = session.peer.metadata.name;

  let accountAddress = '';
  let account = null;
  let chainId = null;

  if (isStacksAccount) {
    account = session.namespaces.stacks.accounts[0];

    if (account.includes(STACKS_TESTNET_CHAIN_ID)) {
      chainId = STACKS_TESTNET_CHAIN_ID;
      accountAddress = session.namespaces.stacks.accounts[0].slice(9);
    }

    if (account.includes(STACKS_MAINNET_CHAIN_ID)) {
      chainId = STACKS_MAINNET_CHAIN_ID;
      accountAddress = session.namespaces.stacks.accounts[0].slice(9);
    }
  }

  if (isEip155Account) {
    account = session.namespaces?.eip155?.accounts[0];
    chainId =
      session.namespaces.eip155.chains && session.namespaces.eip155.chains[0];
    accountAddress = account.slice(9);
  }

  if (isBip122Account) {
    account = session.namespaces?.bip122?.accounts[0];
    chainId = BTC_MAINNET_CHAIN_ID;
    console.log('account', account);
    accountAddress = account.split(':')[2];
  }

  return {
    provider,
    accountAddress: shortenAddress(accountAddress),
    chainId
  } as const;
}
