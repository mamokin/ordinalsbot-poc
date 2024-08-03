import { SessionTypes } from '@walletconnect/types';
import {
  STACKS_MAINNET_CHAIN_ID,
  STACKS_TESTNET_CHAIN_ID
} from '../constants/chain-ids';

export function getSessionMetrics(session: SessionTypes.Struct) {
  const isStacksAccount = !!session.namespaces?.stacks;
  const isEip155Account = !!session.namespaces?.eip155;
  const provider = session.peer.metadata.name;

  const accountAddress = isStacksAccount
    ? session.namespaces.stacks.accounts[0].slice(9)
    : isEip155Account
      ? session.namespaces?.eip155?.accounts[0].slice(9)
      : null;

  let chainId = null;

  if (isStacksAccount) {
    if (
      session.namespaces.stacks.accounts[0].includes(STACKS_TESTNET_CHAIN_ID)
    ) {
      chainId = STACKS_TESTNET_CHAIN_ID;
    }
    if (
      session.namespaces.stacks.accounts[0].includes(STACKS_MAINNET_CHAIN_ID)
    ) {
      chainId = STACKS_MAINNET_CHAIN_ID;
    }
    if (isEip155Account) {
      chainId =
        session.namespaces.eip155.chains && session.namespaces.eip155.chains[0];
    }
  }

  return {
    provider,
    accountAddress,
    chainId
  } as const;
}
