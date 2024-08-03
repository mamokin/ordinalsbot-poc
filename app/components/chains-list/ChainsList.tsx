'use client';
import { useState } from 'react';
import { CHAIN_IDS } from '../../lib/constants/chain-ids';
import './ChainsList.css';

export default function ChainsList({
  callback
}: {
  callback: (chain: string) => void;
}) {
  const [selectedChain, setSelectedChain] = useState<string | undefined>();

  const onSelectChain = (
    event: React.MouseEvent<HTMLElement>,
    chain: string
  ) => {
    event.preventDefault();
    setSelectedChain(chain);
    callback(chain);
  };

  return (
    <ol>
      {CHAIN_IDS.map(({ chainId, label }) => (
        <li
          key={chainId}
          onClick={(e) => onSelectChain(e, chainId)}
          className="chains-list__item"
        >
          {label}
        </li>
      ))}
    </ol>
  );
}
