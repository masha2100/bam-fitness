import { useMutation } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import * as SecureStore from 'expo-secure-store';
import { signIn } from '../../api/auth';
import { authTokenAtom } from '../../atoms/auth';

export const useSignInMutation = () => {
  const setToken = useSetAtom(authTokenAtom);

  return useMutation({
    mutationFn: signIn,
    onSuccess: async (data) => {
      console.log('Success! Token:', data.token);
      await SecureStore.setItemAsync('token', data.token);
      setToken(data.token);
      console.log('Token set in atom');
    },
    onError: (error) => {
      console.error('Sign in error:', error);
    },
  });
};