import { View, Text } from 'react-native';

const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

type Props = {
  completed: number;
};

export const WeeklyCalendar = ({ completed }: Props) => {
  const currentDay = new Date().getDay();
  const adjustedDay = currentDay === 0 ? 6 : currentDay - 1;

  return (
    <View className="flex-row justify-between mb-8">
      {DAYS.map((day, index) => (
        <View key={day} className="items-center">
          <View className={`w-9 h-9 rounded-full items-center justify-center mb-1 ${index === adjustedDay ? 'bg-[#C8956C]' : 'bg-neutral-900'}`}>
            <Text className="text-white text-xs">
              {index <= adjustedDay && index > adjustedDay - completed ? '★' : '○'}
            </Text>
          </View>
          <Text className="text-neutral-500 text-[9px]">{day}</Text>
        </View>
      ))}
    </View>
  );
};