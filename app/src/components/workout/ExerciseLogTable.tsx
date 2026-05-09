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
  exerciseStartIndex?: number;
};

export const ExerciseLogTable = ({ exercises, exerciseStartIndex = 0 }: Props) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {exercises.map((exercise, index) => (
        <View key={exercise.id} className="mb-6">
          <Text className="text-white text-base font-bold mb-1">
            {exercise.name}
          </Text>
          <Text className="text-neutral-500 text-xs mb-3">
            {exercise.tags.join(' · ')}
          </Text>
          <View className="flex-row pb-2 border-b border-neutral-800">
            <Text className="text-neutral-500 w-8 text-xs">SET</Text>
            <Text className="flex-1 text-neutral-500 text-xs text-center">WEIGHT</Text>
            <Text className="flex-1 text-neutral-500 text-xs text-center">REPS</Text>
            <Text className="w-8 text-neutral-500 text-xs text-center">LOG</Text>
          </View>
          {exercise.defaultSets.map((set, setIndex) => (
            <SetRow
              key={setIndex}
              setNumber={setIndex + 1}
              exerciseIndex={exerciseStartIndex + index}
              setIndex={setIndex}
            />
          ))}
        </View>
      ))}
    </ScrollView>
  );
};