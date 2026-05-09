import { View, Text, TextInput, Pressable } from 'react-native';
import { useFormContext, Controller } from 'react-hook-form';
import { WorkoutLogForm } from '../../lib/validators/workoutLog';

type Props = {
  setNumber: number;
  exerciseIndex: number;
  setIndex: number;
};

export const SetRow = ({ setNumber, exerciseIndex, setIndex }: Props) => {
  const { control, setValue, watch } = useFormContext<WorkoutLogForm>();
  const completed = watch(`exercises.${exerciseIndex}.sets.${setIndex}.completed`);

  return (
    <View className="flex-row items-center py-2 border-b border-neutral-800">
      <Text className="text-neutral-500 w-8 text-sm">{setNumber}</Text>
      <Controller
        control={control}
        name={`exercises.${exerciseIndex}.sets.${setIndex}.weight`}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View className="flex-1 mx-1">
            <View className={`bg-neutral-900 rounded-lg p-2 border ${error ? 'border-red-500' : 'border-neutral-800'}`}>
              <TextInput
                className="text-white text-sm text-center"
                value={String(value || '')}
                onChangeText={onChange}
                keyboardType="numeric"
              />
            </View>
          </View>
        )}
      />
      <Controller
        control={control}
        name={`exercises.${exerciseIndex}.sets.${setIndex}.reps`}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View className="flex-1 mx-1">
            <View className={`bg-neutral-900 rounded-lg p-2 border ${error ? 'border-red-500' : 'border-neutral-800'}`}>
              <TextInput
                className="text-white text-sm text-center"
                value={String(value || '')}
                onChangeText={onChange}
                keyboardType="numeric"
              />
            </View>
          </View>
        )}
      />
      <Pressable
        onPress={() => setValue(`exercises.${exerciseIndex}.sets.${setIndex}.completed`, !completed)}
        className={`w-8 h-8 rounded-full border items-center justify-center ${completed ? 'border-[#C8956C] bg-[#C8956C]/10' : 'border-neutral-800 bg-transparent'}`}
      >
        <Text className={completed ? 'text-[#C8956C]' : 'text-neutral-500'}>✓</Text>
      </Pressable>
    </View>
  );
};