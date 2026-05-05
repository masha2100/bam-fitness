import { View, Text, Pressable, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { useHomeQuery } from '../../hooks/api/useHomeQuery';
import { WeeklyCalendar } from '../../components/home/WeeklyCalendar';
import { GoalProgressBar } from '../../components/home/GoalProgressBar';

export default function HomeScreen() {
  const { data, isLoading, isError, refetch } = useHomeQuery();

  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#0D0D0D', alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color="#C8956C" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={{ flex: 1, backgroundColor: '#0D0D0D', alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: '#888888', marginBottom: 16 }}>Щось пішло не так</Text>
        <Pressable onPress={() => refetch()}>
          <Text style={{ color: '#C8956C' }}>Спробувати знову</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#0D0D0D', padding: 24 }}>
      <Text style={{ color: '#FFFFFF', fontSize: 24, fontWeight: 'bold', marginTop: 60, marginBottom: 8 }}>
        Welcome Back, {data?.welcome.name}
      </Text>

      <GoalProgressBar
        completed={data?.goalProgress.completed || 0}
        target={data?.goalProgress.target || 5}
      />

      <WeeklyCalendar completed={data?.goalProgress.completed || 0} />

      <Pressable
        onPress={() => router.push('/(tabs)/routines')}
        style={{ backgroundColor: '#C8956C', borderRadius: 999, paddingVertical: 18, alignItems: 'center' }}
      >
        <Text style={{ color: '#FFFFFF', fontWeight: 'bold', letterSpacing: 4 }}>
          LET'S GO →
        </Text>
      </Pressable>
    </View>
  );
}