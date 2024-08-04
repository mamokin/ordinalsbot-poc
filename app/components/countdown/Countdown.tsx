'use client';

import { useEffect, useState } from 'react';

export default function Countdown({ seconds }: { seconds: number }) {
  const [timeRemaining, setTimeRemaining] = useState(seconds);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime === 0) {
          clearInterval(timerInterval);
          return 0;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(timerInterval);
  }, []);

  // Convert seconds to hours, minutes, and seconds
  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const s = timeRemaining % 60;

  const hrsSpan = hours > 0 && <span>{hours}h&nbsp;</span>;
  const minutesSpan = minutes > 0 && <span>{minutes}m&nbsp;</span>;
  const secondsSpan = s > 0 && <span>{s}s</span>;

  return (
    <span>
      {hrsSpan}
      {minutesSpan}
      {secondsSpan}
    </span>
  );
}
