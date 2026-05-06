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
    <View style={{ marginTop: 60, marginBottom: 8 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        
        <Pressable onPress={onBack}>
          <Text style={{ color: '#C8956C', fontSize: 16 }}>← Back</Text>
        </Pressable>

        <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' }}>
          {title}
        </Text>

        <Pressable
          onPress={onSave}
          disabled={!isValid || isSaving}
          style={{ opacity: isValid && !isSaving ? 1 : 0.3 }}
        >
          <Text style={{ color: '#C8956C', fontSize: 16 }}>
            {isSaving ? '...' : 'SAVE'}
          </Text>
        </Pressable>

      </View>

      <Text style={{ color: '#888888', fontSize: 14, textAlign: 'center' }}>
        {formatted}
      </Text>
    </View>
  );
};