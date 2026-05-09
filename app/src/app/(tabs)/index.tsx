import { View, Text, Pressable, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { useHomeQuery } from '../../hooks/api/useHomeQuery';
import { WeeklyCalendar } from '../../components/home/WeeklyCalendar';
import { GoalProgressBar } from '../../components/home/GoalProgressBar';

export default function HomeScreen() {
  const { data, isLoading, isError, refetch } = useHomeQuery();

  if (isLoading) {
    return (
      <View className="flex-1 bg-neutral-950 items-center justify-center">
        <ActivityIndicator color="#C8956C" />
      </View>
    );
  }
  

  if (isError) {
    return (
      <View className="flex-1 bg-neutral-950 items-center justify-center">
        <Text className="text-neutral-500 mb-4">Щось пішло не так</Text>
        <Pressable onPress={() => refetch()}>
          <Text className="text-[#C8956C]">Спробувати знову</Text>
        </Pressable>
      </View>
    );
  }
  return (
  <View className="flex-1 bg-neutral-950 px-6 pt-16">
    <Text className="text-white text-2xl font-bold mb-2">
      Welcome Back, {data?.welcome.name}
    </Text>
    <GoalProgressBar
      completed={data?.goalProgress.completed || 0}
      target={data?.goalProgress.target || 5}
    />
    <WeeklyCalendar completed={data?.goalProgress.completed || 0} />
    <Pressable
      onPress={() => router.push('/(tabs)/routines')}
      className="bg-[#C8956C] rounded-full py-5 items-center"
    >
      <Text className="text-white font-bold tracking-widest">
        LET'S GO →
      </Text>
    </Pressable>
  </View>
  
);
}