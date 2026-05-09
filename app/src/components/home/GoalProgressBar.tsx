import { View, Text } from 'react-native';

type Props = {
  completed: number;
  target: number;
};

export const GoalProgressBar = ({ completed, target }: Props) => {
  const progress = target > 0 ? completed / target : 0;

  return (
    <View className="mb-4">
      <Text className="text-neutral-500 text-xs mb-2">
        THIS WEEK'S GOAL — {completed}/{target} WORKOUTS
      </Text>
      <View className="h-1 bg-neutral-900 rounded-sm">
        <View
          className="h-1 bg-[#C8956C] rounded-sm"
          style={{ width: `${progress * 100}%` }}
        />
      </View>
    </View>
  );
};