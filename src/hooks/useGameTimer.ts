import { useState, useEffect, useRef, useCallback } from "react";

interface UseGameTimerProps {
  duration: number;
  onTimeUp: () => void;
  isActive: boolean;
}

interface UseGameTimerReturn {
  timeLeft: number;
  resetTimer: () => void;
}

export function useGameTimer({
  duration,
  onTimeUp,
  isActive,
}: UseGameTimerProps): UseGameTimerReturn {
  const [timeLeft, setTimeLeft] = useState<number>(duration);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const onTimeUpRef = useRef(onTimeUp);

  // Keep onTimeUp ref updated
  onTimeUpRef.current = onTimeUp;

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const resetTimer = useCallback(() => {
    clearTimer();
    setTimeLeft(duration);
  }, [duration, clearTimer]);

  useEffect(() => {
    clearTimer();

    if (!isActive) {
      return;
    }

    setTimeLeft(duration);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearTimer();
          onTimeUpRef.current();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return clearTimer;
  }, [isActive, duration, clearTimer]);

  return { timeLeft, resetTimer };
}
