import { atom } from 'jotai';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storage = createJSONStorage(() => AsyncStorage);

export const timerStartAtAtom = atomWithStorage<number | null>(
  'workout-timer-start',
  null,
  storage
);

export const startTimerAtom = atom(
  null,
  (get, set) => {
    set(timerStartAtAtom, Date.now());
  }
);

export const stopTimerAtom = atom(
  null,
  (get, set) => {
    set(timerStartAtAtom, null);
  }
);