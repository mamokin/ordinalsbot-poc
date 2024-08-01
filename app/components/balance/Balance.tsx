'use client';

export interface BalanceProps {
  balance?: number;
  element?: 'div' | 'span' | 'p';
}

/**
 * client component
 */
export default function Balance({ balance = 0, element = 'p' }: BalanceProps) {
  switch (element) {
    case 'div':
      return <div className="balance">{balance}</div>;
    case 'p':
      return <p className="balance">{balance}</p>;
    case 'span':
      return <span className="balance">{balance}</span>;
  }
}
