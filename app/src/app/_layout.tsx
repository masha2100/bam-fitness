import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider as JotaiProvider, useAtom } from 'jotai';
import { Stack } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { authTokenAtom, isSignedInAtom } from '../atoms/auth';

const queryClient = new QueryClient();

function RootLayout() {
  const [, setToken] = useAtom(authTokenAtom);
  const [isSignedIn] = useAtom(isSignedInAtom);

  useEffect(() => {
    SecureStore.getItemAsync('token').then((token) => {
      if (token) setToken(token);
    });
  }, []);

  return (
   <GestureHandlerRootView style={{ flex: 1 }}>
  <GluestackUIProvider config={config}>
    <Stack screenOptions={{ headerShown: false }} />
  </GluestackUIProvider>
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