import { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClientProvider } from '@tanstack/react-query';
import { Provider as JotaiProvider, useAtom, useAtomValue } from 'jotai';
import { Stack } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import { View, Text } from 'react-native';
import { authTokenAtom, isSignedInAtom } from '../atoms/auth';
import { queryClient } from '../lib/queryClient';

function RootLayout() {
  const [, setToken] = useAtom(authTokenAtom);
  const isSignedIn = useAtomValue(isSignedInAtom);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const restoreToken = async () => {
      try {
        const token = await SecureStore.getItemAsync('token');
        if (token) {
          setToken(token);
        }
      } catch (error) {
        console.error('Error restoring token:', error);
      } finally {
        setIsReady(true);
      }
    };

    restoreToken();
  }, [setToken]);

  if (!isReady) {
    return null;
  }

  try {
    return (
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Stack screenOptions={{ headerShown: false }}>
            {isSignedIn ? (
              <Stack.Screen name="(tabs)" />
            ) : (
              <Stack.Screen name="(auth)/sign-in" />
            )}
          </Stack>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    );
  } catch (error) {
    console.error('RootLayout error:', error);
    return (
      <View style={{ flex: 1, backgroundColor: '#1a1a1a', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'white', fontSize: 16 }}>Error loading app</Text>
        <Text style={{ color: '#C8956C', fontSize: 12, marginTop: 10 }}>{String(error)}</Text>
      </View>
    );
  }
}

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <JotaiProvider>
        <QueryClientProvider client={queryClient}>
          <RootLayout />
        </QueryClientProvider>
      </JotaiProvider>
    </GluestackUIProvider>
  );
}