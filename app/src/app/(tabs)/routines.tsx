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
      <Text style={{ color: '#FFFFFF', fontSize: 24, fontWeight: 'bold', marginTop: 60, marginBottom: 24 }}>
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
            style={{
              backgroundColor: '#1A1A1A',
              borderWidth: 1,
              borderColor: '#2A2A2A',
              borderRadius: 12,
              padding: 20,
              marginBottom: 12,
            }}
          >
            <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold', marginBottom: 4 }}>
              {item.name}
            </Text>
            <Text style={{ color: '#888888', fontSize: 14 }}>
              {item.exerciseCount} exercises · {item.estimatedMinutes} min
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
}