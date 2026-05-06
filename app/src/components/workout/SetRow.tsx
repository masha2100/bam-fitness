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
    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#2A2A2A' }}>
      <Text style={{ color: '#888888', width: 30, fontSize: 14 }}>{setNumber}</Text>

      <Controller
        control={control}
        name={`exercises.${exerciseIndex}.sets.${setIndex}.weight`}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View style={{ flex: 1, marginHorizontal: 4 }}>
            <View style={{ backgroundColor: '#1A1A1A', borderRadius: 8, padding: 8, borderWidth: 1, borderColor: error ? '#FF4444' : '#2A2A2A' }}>
              <TextInput
                style={{ color: '#FFFFFF', fontSize: 14, textAlign: 'center' }}
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
          <View style={{ flex: 1, marginHorizontal: 4 }}>
            <View style={{ backgroundColor: '#1A1A1A', borderRadius: 8, padding: 8, borderWidth: 1, borderColor: error ? '#FF4444' : '#2A2A2A' }}>
              <TextInput
                style={{ color: '#FFFFFF', fontSize: 14, textAlign: 'center' }}
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
        style={{ width: 30, height: 30, borderRadius: 15, borderWidth: 1, borderColor: completed ? '#C8956C' : '#2A2A2A', alignItems: 'center', justifyContent: 'center', backgroundColor: completed ? '#C8956C22' : 'transparent' }}
      >
        <Text style={{ color: completed ? '#C8956C' : '#888888' }}>✓</Text>
      </Pressable>
    </View>
  );
};