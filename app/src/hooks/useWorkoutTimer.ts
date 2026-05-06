import { useEffect, useState } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { timerStartAtAtom, startTimerAtom } from '../atoms/workoutTimer';

const formatTime = (seconds: number): string => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h}h ${String(m).padStart(2, '0')}m ${String(s).padStart(2, '0')}s`;
};

export const useWorkoutTimer = () => {
  const timerStartAt = useAtomValue(timerStartAtAtom);
  const startTimer = useSetAtom(startTimerAtom);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (timerStartAt === null) {
      startTimer();
    }
  }, []);

  useEffect(() => {
    if (timerStartAt === null) return;

    const interval = setInterval(() => {
      setElapsed(Math.floor((Date.now() - timerStartAt) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [timerStartAt]);

  return {
    elapsed,
    formatted: formatTime(elapsed),
  };
};