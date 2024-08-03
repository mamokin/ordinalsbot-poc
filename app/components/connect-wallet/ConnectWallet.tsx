'use client';
import QRCodeModal from '@walletconnect/qrcode-modal';
import Client from '@walletconnect/sign-client';
import { SessionTypes } from '@walletconnect/types';
import { Suspense, useEffect, useState } from 'react';
import Loader from '../loader/Loader';
import './ConnectWallet.css';

export function ConnectWallet() {
  const [client, setClient] = useState<Client | undefined>(undefined);
  const [chain, setChain] = useState<string | undefined>(undefined);
  const [session, setSession] = useState<SessionTypes.Struct | undefined>(
    undefined
  );

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
    if (client) {
      const lastKeyIndex = client.session.getAll().length - 1;
      const lastSession = client.session.getAll()[lastKeyIndex];

      setSession(lastSession);
    }
  }, [client]);

  const handleConnect = async (_chain: string = 'eip155:1') => {
    setChain(undefined);

    if (_chain.includes('stacks')) {
      if (!client) {
        return;
      }

      const { uri, approval } = await client.connect({
        pairingTopic: undefined,
        requiredNamespaces: {
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
        }
      });

      if (uri) {
        QRCodeModal.open(uri, () => {
          console.info('QR Code Modal closed');
        });
      }

      const sessn = await approval();
      setSession(sessn);
      setChain(_chain);
      sessionStorage.setItem('session', JSON.stringify(sessn));
      localStorage.setItem('chain', _chain);

      QRCodeModal.close();
    } else {
      if (!client) {
        return;
      }

      const { uri, approval } = await client.connect({
        pairingTopic: undefined,
        requiredNamespaces: {
          // bip122: {
          //   methods: ['bitcoin_btcTransfer'],
          //   chains: [_chain],
          //   events: []
          // }
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
        }
      });

      if (uri) {
        QRCodeModal.open(uri, () => {
          console.info('QR Code Modal closed');
        });
      }

      const sessn = await approval();

      setSession(sessn);
      sessionStorage.setItem('session', JSON.stringify(sessn));
      localStorage.setItem('chain', _chain);
      QRCodeModal.close();
    }
  };

  useEffect(() => {
    const initClient = async () => {
      const c = await Client.init({
        // logger: 'debug',
        relayUrl: 'wss://relay.walletconnect.com',
        projectId: process.env.NEXT_PUBLIC_PROJECT_ID, // Register at WalletConnect to get a project ID
        metadata: {
          name: 'ordinals-poc',
          description: 'AppKit Example',
          url: 'https://web3modal.com', // origin must match your domain & subdomain
          icons: ['https://avatars.githubusercontent.com/u/37784886']
        }
      });
      setClient(c);
    };

    if (client === undefined) {
      initClient();
    }
  }, [client]);

  if (session) {
    const provider = session.peer.metadata.name;
    const address = session.namespaces.eip155.accounts[0].slice(9);
    const chain =
      session.namespaces.eip155.chains && session.namespaces.eip155.chains[0];

    return (
      <article className="connect-wallet__stats-container">
        <Suspense fallback={<Loader />}>
          <div className="connect-wallet__stats">
            <p id="provider">Wallet provider: {provider}</p>
            <p id="chain">Chain: {chain}</p>
            <p id="address" className="connect-wallet__stats-address">
              Address: {address}
            </p>
          </div>
        </Suspense>
      </article>
    );
  }

  return (
    <button
      type="button"
      className="connect-wallet__button"
      onClick={(e) => {
        e.preventDefault();
        handleConnect();
      }}
    >
      Connect Wallet
    </button>
  );
}
