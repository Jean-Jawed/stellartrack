import { useEffect, useState } from 'react';
import { useStore } from '../store';

export const useAutoRefresh = (callback, interval = 60000) => {
  const [timeLeft, setTimeLeft] = useState(interval / 1000);
  const setLastRefresh = useStore((state) => state.setLastRefresh);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          callback();
          setLastRefresh();
          return interval / 1000;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [callback, interval, setLastRefresh]);

  const manualRefresh = () => {
    callback();
    setLastRefresh();
    setTimeLeft(interval / 1000);
  };

  return { timeLeft, manualRefresh };
};
