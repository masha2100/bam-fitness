import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#1A1A1A', borderTopColor: '#2A2A2A' },
        tabBarActiveTintColor: '#C8956C',
        tabBarInactiveTintColor: '#888888',
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'HOME' }} />
      <Tabs.Screen name="routines" options={{ title: 'TRAIN' }} />
    </Tabs>
  );
}