import { View, Text } from 'react-native';

const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

type Props = {
  completed: number;
};

export const WeeklyCalendar = ({ completed }: Props) => {
  const currentDay = new Date().getDay();
  const adjustedDay = currentDay === 0 ? 6 : currentDay - 1;

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 32 }}>
      {DAYS.map((day, index) => (
        <View key={day} style={{ alignItems: 'center' }}>
          <View style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            backgroundColor: index === adjustedDay ? '#C8956C' : '#1A1A1A',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 4,
          }}>
            <Text style={{ color: '#FFFFFF', fontSize: 10 }}>
              {index < completed ? '★' : '○'}
            </Text>
          </View>
          <Text style={{ color: '#888888', fontSize: 10 }}>{day}</Text>
        </View>
      ))}
    </View>
  );
};