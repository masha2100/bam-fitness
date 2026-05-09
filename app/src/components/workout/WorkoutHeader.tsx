import { View, Text, Pressable } from 'react-native';
import { useWorkoutTimer } from '../../hooks/useWorkoutTimer';

type Props = {
  title: string;
  isValid: boolean;
  onSave: () => void;
  isSaving: boolean;
  onBack: () => void;
};

export const WorkoutHeader = ({ title, isValid, onSave, isSaving, onBack }: Props) => {
  const { formatted } = useWorkoutTimer();

  return (
    <View className="mt-16 mb-2">
      <View className="flex-row justify-between items-center mb-2">
        <Pressable onPress={onBack}>
          <Text className="text-[#C8956C] text-base">← Back</Text>
        </Pressable>
        <Text className="text-white text-lg font-bold">{title}</Text>
        <Pressable
          onPress={onSave}
          disabled={!isValid || isSaving}
          className={`${isValid && !isSaving ? 'opacity-100' : 'opacity-30'}`}
        >
          <Text className="text-[#C8956C] text-base">
            {isSaving ? '...' : 'SAVE'}
          </Text>
        </Pressable>
      </View>
      <Text className="text-neutral-500 text-sm text-center">{formatted}</Text>
    </View>
  );
};