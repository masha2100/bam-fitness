import { View, Text } from 'react-native';

type Props = {
  completed: number;
  target: number;
};

export const GoalProgressBar = ({ completed, target }: Props) => {
  const progress = target > 0 ? completed / target : 0;

  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={{ color: '#888888', fontSize: 12, marginBottom: 8 }}>
        THIS WEEK'S GOAL — {completed}/{target} WORKOUTS
      </Text>
      <View style={{ height: 4, backgroundColor: '#1A1A1A', borderRadius: 2 }}>
        <View style={{
          height: 4,
          backgroundColor: '#C8956C',
          borderRadius: 2,
          width: `${progress * 100}%`,
        }} />
      </View>
    </View>
  );
};