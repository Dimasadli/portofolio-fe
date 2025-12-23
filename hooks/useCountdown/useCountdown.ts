import { useState, useEffect } from "react";

interface CountdownReturn {
  minutes: number;
  seconds: number;
  isComplete: boolean;
}

const useCountdown = (isoDate: string): CountdownReturn => {
  const [countdown, setCountdown] = useState({
    minutes: 0,
    seconds: 0,
    isComplete: false,
  });

  useEffect(() => {
    const target = new Date(isoDate);
    const endTime = target.getTime() + 5 * 60 * 1000; // Add 5 minutes

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime - now;

      if (distance <= 0) {
        clearInterval(interval);
        setCountdown({ minutes: 0, seconds: 0, isComplete: true });
        return;
      }

      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdown({ minutes, seconds, isComplete: false });
    }, 1000);

    return () => clearInterval(interval);
  }, [isoDate]);

  return countdown;
};

export default useCountdown;
