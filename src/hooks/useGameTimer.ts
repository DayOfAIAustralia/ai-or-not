import { useState, useEffect, useRef, useCallback } from "react";

interface UseGameTimerProps {
  duration: number;
  onTimeUp: () => void;
  onTick?: (timeLeft: number) => void;
  isActive: boolean;
}

interface UseGameTimerReturn {
  timeLeft: number;
  resetTimer: () => void;
}

export function useGameTimer({
  duration,
  onTimeUp,
  onTick,
  isActive,
}: UseGameTimerProps): UseGameTimerReturn {
  const [timeLeft, setTimeLeft] = useState<number>(duration);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const onTimeUpRef = useRef(onTimeUp);
  const onTickRef = useRef(onTick);

  // Keep refs updated
  onTimeUpRef.current = onTimeUp;
  onTickRef.current = onTick;

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
        const next = prev - 1;
        onTickRef.current?.(next);
        return next;
      });
    }, 1000);

    return clearTimer;
  }, [isActive, duration, clearTimer]);

  return { timeLeft, resetTimer };
}
