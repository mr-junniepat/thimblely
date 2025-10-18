import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

// Import colors directly
const colors = {
  complimentary: '#A30552',
  black: '#111113',
  greyText: '#68666F',
};

interface CalendarDay {
  day: number | null;
  hasEvent: boolean;
  isSelected: boolean;
  date?: Date;
}

interface CalendarGridProps {
  days: CalendarDay[];
  onDayPress: (day: CalendarDay) => void;
}

export default function CalendarGrid({ days, onDayPress }: CalendarGridProps) {
  const renderCalendarDay = (day: CalendarDay, index: number) => {
    if (!day.day) {
      return <View key={index} style={tw`w-10 h-10`} />;
    }

    if (day.isSelected) {
      return (
        <TouchableOpacity
          key={index}
          style={tw`w-10 h-10`}
          onPress={() => onDayPress(day)}
        >
          <View
            style={[
              tw`w-10 h-10 rounded-full items-center justify-center rounded-full`,
              {
                backgroundColor: colors.complimentary,
              },
            ]}
          >
            <Text
              style={[
                tw`text-xs font-normal text-center text-white`,
                {
                  fontFamily: 'Satoshi Variable',
                },
              ]}
            >
              {day.day}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }

    if (day.hasEvent) {
      return (
        <TouchableOpacity
          key={index}
          style={tw`w-10 h-10`}
          onPress={() => onDayPress(day)}
        >
          <View
            style={[
              tw`w-10 h-10 rounded-full items-center justify-center rounded-full`,
              {
                borderWidth: 1,
                borderColor: colors.complimentary,
              },
            ]}
          >
            <Text
              style={[
                tw`text-xs font-normal text-center`,
                {
                  color: colors.black,
                  fontFamily: 'Satoshi Variable',
                },
              ]}
            >
              {day.day}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        key={index}
        style={tw`w-10 h-10`}
        onPress={() => onDayPress(day)}
      >
        <View
          style={tw`w-10 h-10 rounded-full items-center justify-center rounded-full`}
        >
          <Text
            style={[
              tw`text-xs font-normal text-center`,
              {
                color: colors.black,
                fontFamily: 'Satoshi Variable',
              },
            ]}
          >
            {day.day}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[tw`flex-row flex-wrap justify-between`, { gap: 17 }]}>
      {days.map((day, index) => renderCalendarDay(day, index))}
    </View>
  );
}
