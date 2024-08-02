import { Card } from './components/card/Card';
import TickerInfo from './components/ticker-info/TickerInfo';
import WalletBalance from './components/wallet-balance/WalletBalance';
import styles from './page.module.css';

export default function Home() {
  return (
    <article>
      <Card className={styles.card}>
        <TickerInfo />
      </Card>

      <Card>
        <WalletBalance />
      </Card>
    </article>
  );
}
