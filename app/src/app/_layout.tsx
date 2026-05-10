import { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClientProvider } from '@tanstack/react-query';
import { Provider as JotaiProvider, useAtom, useAtomValue } from 'jotai';
import { Stack } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { authTokenAtom, isSignedInAtom } from '../atoms/auth';
import { queryClient } from '../lib/queryClient';
import { jotaiStore } from '../lib/store';

function RootLayout() {
  const [, setToken] = useAtom(authTokenAtom);
  const isSignedIn = useAtomValue(isSignedInAtom);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const restoreToken = async () => {
      try {
        const token = await SecureStore.getItemAsync('token');
        if (token) setToken(token);
      } catch (error) {
        console.error('Error restoring token:', error);
      } finally {
        setIsReady(true);
      }
    };
    restoreToken();
  }, [setToken]);



   return (
  <SafeAreaProvider>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={isSignedIn}>
          <Stack.Screen name="(tabs)" />
        </Stack.Protected>
        <Stack.Protected guard={!isSignedIn}>
          <Stack.Screen name="(auth)/sign-in" />
        </Stack.Protected>
      </Stack>
    </GestureHandlerRootView>
  </SafeAreaProvider>
);
}

export default function App() {
  return (
    <JotaiProvider store={jotaiStore}>
      <QueryClientProvider client={queryClient}>
        <RootLayout />
      </QueryClientProvider>
    </JotaiProvider>
  );
}