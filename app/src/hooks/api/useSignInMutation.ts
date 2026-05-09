import { useMutation } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import * as SecureStore from 'expo-secure-store';
import { signIn } from '../../api/auth';
import { authTokenAtom } from '../../atoms/auth';
import { router } from 'expo-router';

export const useSignInMutation = () => {
  const setToken = useSetAtom(authTokenAtom);

  return useMutation({
    mutationFn: signIn,
    onSuccess: async (data) => {
      await SecureStore.setItemAsync('token', data.token);
      setToken(data.token);
      router.replace('/(tabs)');
    },
    onError: (error) => {
      console.error('Sign in error:', error);
    },
  });
};