import { View, Text, Pressable, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useTemplateQuery } from '../../../hooks/api/useTemplateQuery';
import { ExerciseLogTable } from '../../../components/workout/ExerciseLogTable';

export default function WorkoutLogScreen() {
  const { templateId } = useLocalSearchParams<{ templateId: string }>();
  const { data, isLoading } = useTemplateQuery(templateId);

  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#0D0D0D', alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color="#C8956C" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#0D0D0D', padding: 24 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 60, marginBottom: 24 }}>
        <Pressable onPress={() => router.back()}>
          <Text style={{ color: '#C8956C', fontSize: 16 }}>← Back</Text>
        </Pressable>
        <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' }}>
          {data?.name}
        </Text>
        <Pressable disabled style={{ opacity: 0.3 }}>
          <Text style={{ color: '#C8956C', fontSize: 16 }}>SAVE</Text>
        </Pressable>
      </View>

      <Text style={{ color: '#888888', fontSize: 14, textAlign: 'center', marginBottom: 24 }}>
        0h 00m 00s
      </Text>

      {data?.exercises && (
        <ExerciseLogTable exercises={data.exercises} />
      )}
    </View>
  );
}