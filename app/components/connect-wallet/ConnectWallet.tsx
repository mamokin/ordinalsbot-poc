'use client';
import QRCodeModal from '@walletconnect/qrcode-modal';
import Client from '@walletconnect/sign-client';
import { ProposalTypes, SessionTypes } from '@walletconnect/types';
import { useEffect, useState } from 'react';
import { ETH_MAINNET_CHAIN_ID } from '../../lib/constants/chain-ids';
import { getSessionMetrics } from '../../lib/utils/wallet-connect';
import ChainsList from '../chains-list/ChainsList';
import './ConnectWallet.css';

export function ConnectWallet() {
  const [client, setClient] = useState<Client | undefined>();
  const [session, setSession] = useState<SessionTypes.Struct | undefined>();
  const [showChains, setShowChains] = useState<boolean>(false);

  client?.on('session_proposal', (event) => {
    // Show session proposal data to the user i.e. in a modal with options to approve / reject it
    interface Event {
      id: number;
      params: {
        id: number;
        expiry: number;
        relays: Array<{
          protocol: string;
          data?: string;
        }>;
        proposer: {
          publicKey: string;
          metadata: {
            name: string;
            description: string;
            url: string;
            icons: string[];
          };
        };
        requiredNamespaces: Record<
          string,
          {
            chains: string[];
            methods: string[];
            events: string[];
          }
        >;
        pairingTopic?: string;
      };
    }
  });

  client?.on('session_event', (event) => {
    // Handle session events, such as "chainChanged", "accountsChanged", etc.

    interface Event {
      id: number;
      topic: string;
      params: {
        event: {
          name: string;
          data: any;
        };
        chainId: string;
      };
    }
  });

  client?.on('session_request', (event) => {
    // Handle session method requests, such as "eth_sign", "eth_sendTransaction", etc.

    interface Event {
      id: number;
      topic: string;
      params: {
        request: {
          method: string;
          params: any;
        };
        chainId: string;
      };
    }
  });

  client?.on('session_ping', (event) => {
    // React to session ping event

    interface Event {
      id: number;
      topic: string;
    }
  });

  client?.on('session_delete', (event) => {
    // React to session delete event

    interface Event {
      id: number;
      topic: string;
    }

    setSession(undefined);
    localStorage.removeItem('chain');
    sessionStorage.removeItem('session');
  });

  useEffect(() => {
    const initClient = async () => {
      const c = await Client.init({
        // logger: 'debug',
        relayUrl: 'wss://relay.walletconnect.com',
        projectId: process.env.NEXT_PUBLIC_PROJECT_ID, // Register at WalletConnect to get a project ID
        metadata: {
          name: 'ordinalsbot-poc',
          description: 'AppKit Example',
          url: 'https://web3modal.com', // origin must match your domain & subdomain
          icons: ['https://avatars.githubusercontent.com/u/37784886']
        }
      });
      setClient(c);
    };

    if (client === undefined) {
      initClient();
    } else {
      const lastKeyIndex = client.session.getAll().length - 1;
      const lastSession = client.session.getAll()[lastKeyIndex];

      setSession(lastSession);
    }
  }, [client]);

  const handleConnect = async (_chain: string) => {
    // ProposalTypes.RequiredNamespaces
    let requiredNamespaces: ProposalTypes.RequiredNamespaces = {};

    if (_chain.includes('stacks')) {
      // set namespaces config for stacks
      requiredNamespaces = {
        stacks: {
          methods: [
            'stacks_signMessage',
            'stacks_stxTransfer',
            'stacks_contractCall',
            'stacks_contractDeploy'
          ],
          chains: [_chain],
          events: []
        }
      };
    } else if (_chain === ETH_MAINNET_CHAIN_ID) {
      // set namespaces config for ethereum
      requiredNamespaces = {
        eip155: {
          methods: [
            'eth_sendTransaction',
            'eth_signTransaction',
            'eth_sign',
            'personal_sign',
            'eth_signTypedData'
          ],
          chains: [_chain],
          events: ['chainChanged', 'accountsChanged']
        }
      };
    } else if (_chain.includes('bip122')) {
      // set namespace config for bitcoin
      requiredNamespaces = {
        bip122: {
          methods: ['bitcoin_btcTransfer'],
          chains: [_chain],
          events: []
        }
      };
    } else {
      alert('The wallet you tried to connect is not supported.');
    }

    if (!client) {
      return;
    }

    // attempt a connection
    const { uri, approval } = await client.connect({
      pairingTopic: undefined,
      requiredNamespaces
    });

    if (uri) {
      QRCodeModal.open(uri, () => {
        console.info('QR Code Modal closed');
      });
    }

    const sessn = await approval();

    // store the session
    setSession(sessn);
    sessionStorage.setItem('session', JSON.stringify(sessn));
    localStorage.setItem('chain', _chain);

    // cleanup
    QRCodeModal.close();
    setShowChains(false);
  };

  if (session) {
    const { accountAddress, provider } = getSessionMetrics(session);

    const onDisconnectWallet = (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      client?.disconnect({
        topic: session.topic,
        reason: { code: 6000, message: 'User disconnected' }
      });

      setSession(undefined);
      setShowChains(false);
    };

    return (
      <article className="connect-wallet__stats-container">
        <button
          type="button"
          className="connect-wallet__button"
          onClick={onDisconnectWallet}
        >
          Disconnect Wallet
        </button>
        <div className="connect-wallet__stats">
          <p id="provider">Wallet provider: {provider}</p>
          <p id="address" className="connect-wallet__stats-address">
            Address: {accountAddress}
          </p>
        </div>
      </article>
    );
  }

  if (showChains) {
    return <ChainsList onClick={handleConnect} />;
  }

  return (
    <button
      type="button"
      className="connect-wallet__button"
      onClick={(e) => {
        e.preventDefault();
        setShowChains(true);
      }}
    >
      Connect Wallet
    </button>
  );
}
