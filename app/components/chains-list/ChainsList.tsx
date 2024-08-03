import { CHAIN_IDS } from '../../lib/constants/chain-ids';
import './ChainsList.css';

export default function ChainsList({
  onClick
}: {
  onClick: (chain: string) => void;
}) {
  const onSelectChain = (
    event: React.MouseEvent<HTMLElement>,
    chain: string
  ) => {
    event.preventDefault();
    onClick(chain);
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
