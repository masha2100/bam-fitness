import { View, Text, ScrollView } from 'react-native';
import { SetRow } from './SetRow';

type DefaultSet = { reps: number; weight: number };

type Exercise = {
  id: string;
  name: string;
  tags: string[];
  defaultSets: DefaultSet[];
};

type Props = {
  exercises: Exercise[];
};

export const ExerciseLogTable = ({ exercises }: Props) => {
  return (
    <ScrollView>
      {exercises.map((exercise) => (
        <View key={exercise.id} style={{ marginBottom: 24 }}>
          <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 'bold', marginBottom: 4 }}>
            {exercise.name}
          </Text>
          <Text style={{ color: '#888888', fontSize: 12, marginBottom: 12 }}>
            {exercise.tags.join(' · ')}
          </Text>

          <View style={{ flexDirection: 'row', paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: '#2A2A2A' }}>
            <Text style={{ color: '#888888', width: 30, fontSize: 12 }}>SET</Text>
            <Text style={{ flex: 1, color: '#888888', fontSize: 12, textAlign: 'center' }}>WEIGHT</Text>
            <Text style={{ flex: 1, color: '#888888', fontSize: 12, textAlign: 'center' }}>REPS</Text>
            <Text style={{ width: 30, color: '#888888', fontSize: 12, textAlign: 'center' }}>LOG</Text>
          </View>

          {exercise.defaultSets.map((set, index) => (
            <SetRow
              key={index}
              setNumber={index + 1}
              reps={set.reps}
              weight={set.weight}
            />
          ))}
        </View>
      ))}
    </ScrollView>
  );
};