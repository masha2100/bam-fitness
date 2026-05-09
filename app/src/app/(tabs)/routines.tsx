import { View, Text, Pressable, FlatList, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { useQueryClient } from '@tanstack/react-query';
import { useRoutinesQuery } from '../../hooks/api/useRoutinesQuery';
import { qk } from '../../lib/queryKeys';
import { getRoutine } from '../../api/workout';

export default function RoutinesScreen() {
  const { data, isLoading, isError, refetch } = useRoutinesQuery();
  const queryClient = useQueryClient();

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
    <View className="flex-1 bg-neutral-950 p-6">
      <Text className="text-white text-2xl font-bold mt-16 mb-6">
        Choose Routine
      </Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            onPressIn={() => {
              queryClient.prefetchQuery({
                queryKey: qk.workout.routine(item.id),
                queryFn: () => getRoutine(item.id),
              });
            }}
            onPress={() => router.push(`/(workout)/log/${item.id}`)}
            className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 mb-3"
          >
            <Text className="text-white text-lg font-bold mb-1">
              {item.name}
            </Text>
            <Text className="text-neutral-500 text-sm">
              {item.exerciseCount} exercises · {item.estimatedMinutes} min
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
}