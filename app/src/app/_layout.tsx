import { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider as JotaiProvider, useAtom } from 'jotai';
import { Stack, router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { authTokenAtom, isSignedInAtom } from '../atoms/auth';

const queryClient = new QueryClient();

function RootLayout() {
  const [, setToken] = useAtom(authTokenAtom);
  const [isSignedIn] = useAtom(isSignedInAtom);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    SecureStore.getItemAsync('token').then((token) => {
      if (token) setToken(token);
      setIsReady(true);
    });
  }, []);

  useEffect(() => {
    if (!isReady) return;
    if (isSignedIn) {
      router.replace('/(tabs)');
    } else {
      router.replace('/(auth)/sign-in');
    }
  }, [isSignedIn, isReady]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }} />
    </GestureHandlerRootView>
  );
}

export default function App() {
  return (
    <JotaiProvider>
      <QueryClientProvider client={queryClient}>
        <RootLayout />
      </QueryClientProvider>
    </JotaiProvider>
  );
}