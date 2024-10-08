import { Card } from './components/card/Card';
import LatestBitcoinBlock from './components/latest-bitcoin-block/LatestBitcoinBlock';
import TickerInfo from './components/ticker-info/TickerInfo';
import WalletBalance from './components/wallet-balance/WalletBalance';
import styles from './page.module.css';

export default function Home() {
  return (
    <article className={styles.home__container}>
      <Card className={styles.card}>
        <TickerInfo />
      </Card>

      <Card className={styles.card}>
        <WalletBalance />
      </Card>

      <Card className={styles.card}>
        <LatestBitcoinBlock />
      </Card>
    </article>
  );
}
