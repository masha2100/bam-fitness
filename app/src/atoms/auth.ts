import { atom } from 'jotai';

export const authTokenAtom = atom<string | null>(null);
export const isSignedInAtom = atom((get) => get(authTokenAtom) !== null);
export const forceLogoutAtom = atom(null, (get, set) => {
  set(authTokenAtom, null);
});