import { View, Text, TextInput, Pressable } from 'react-native';

type Props = {
  setNumber: number;
  reps: number;
  weight: number;
};

export const SetRow = ({ setNumber, reps, weight }: Props) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#2A2A2A' }}>
      <Text style={{ color: '#888888', width: 30, fontSize: 14 }}>{setNumber}</Text>

      <View style={{ flex: 1, backgroundColor: '#1A1A1A', borderRadius: 8, padding: 8, marginHorizontal: 4 }}>
        <TextInput
          style={{ color: '#FFFFFF', fontSize: 14, textAlign: 'center' }}
          defaultValue={String(weight)}
          keyboardType="numeric"
        />
      </View>

      <View style={{ flex: 1, backgroundColor: '#1A1A1A', borderRadius: 8, padding: 8, marginHorizontal: 4 }}>
        <TextInput
          style={{ color: '#FFFFFF', fontSize: 14, textAlign: 'center' }}
          defaultValue={String(reps)}
          keyboardType="numeric"
        />
      </View>

      <Pressable style={{ width: 30, height: 30, borderRadius: 15, borderWidth: 1, borderColor: '#2A2A2A', alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: '#888888' }}>✓</Text>
      </Pressable>
    </View>
  );
};