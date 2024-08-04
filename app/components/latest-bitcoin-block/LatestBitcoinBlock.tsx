'use client';
import { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { getLatestBTCBlock } from '../../lib/utils/btc-chain';
import fakeDelay from '../../lib/utils/fake-delay';
import Countdown from '../countdown/Countdown';
import KeyValue from '../key-value/KeyValue';
import Loader from '../loader/Loader';
import './LatestBitcoinBlock.css';

export default function LatestBitcoinBlock() {
  const DELAY = 120000; // 2 mins
  const [data, setData] = useState<
    Record<string, string | number | boolean | object | null> | undefined
  >();
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fakeDelay();
        return await getLatestBTCBlock();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const interval = setInterval(async () => {
      if (!loading) {
        // subsequent request loader indicator
        setLoading(true);

        const newData = await fetchData();
        setData(newData);

        // disable loaders
        setLoading(false);
        setInitialLoading(false);
      } else {
        console.warn('already loading data...');
      }
    }, DELAY);

    return () => clearInterval(interval);
  }, []);

  return (
    <article className="latest-bitcoin-block__container">
      <div className="latest-bitcoin-block__header">
        <h3>
          Latest BTC Block Info&nbsp;
          <br />
          <sup>Auto-refreshes every two minutes</sup>
        </h3>

        <div className="latest-bitcoin-block__indicator">
          {loading ? (
            <span>
              <ClipLoader size="1rem" />
            </span>
          ) : (
            <Countdown seconds={DELAY / 1000} />
          )}
        </div>
      </div>
      {initialLoading ? <Loader color="black" /> : <KeyValue object={data} />}
    </article>
  );
}
