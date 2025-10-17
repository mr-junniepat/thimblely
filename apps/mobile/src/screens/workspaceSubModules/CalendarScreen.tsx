import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Switch,
} from 'react-native';
import tw from 'twrnc';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Plus,
  Users2,
  Clock,
  Settings,
  X,
} from 'lucide-react-native';

// Import colors directly
const colors = {
  complimentary: '#A30552',
  black: '#111113',
  greyText: '#68666F',
  green: '#34C759',
  blue: '#1A73E8',
};

// Calendar data
const calendarDays = [
  { day: 1, hasEvent: false },
  { day: 2, hasEvent: true },
  { day: 3, hasEvent: false },
  { day: 4, hasEvent: false },
  { day: 5, hasEvent: true },
  { day: 6, hasEvent: true },
  { day: 7, hasEvent: false },
  { day: 8, hasEvent: true },
  { day: 9, hasEvent: false },
  { day: 10, hasEvent: true, isSelected: true },
  { day: 11, hasEvent: false },
  { day: 12, hasEvent: true },
  { day: 13, hasEvent: true },
  { day: 14, hasEvent: true },
  { day: 15, hasEvent: false },
  { day: 16, hasEvent: true },
  { day: 17, hasEvent: false },
  { day: 18, hasEvent: true },
  { day: 19, hasEvent: false },
  { day: 20, hasEvent: false },
  { day: 21, hasEvent: true },
  { day: 22, hasEvent: true },
  { day: 23, hasEvent: false },
  { day: 24, hasEvent: false },
  { day: 25, hasEvent: false },
  { day: 26, hasEvent: true },
  { day: 27, hasEvent: true },
  { day: 28, hasEvent: false },
  { day: 29, hasEvent: false },
  { day: 30, hasEvent: true },
  { day: 31, hasEvent: true },
];

// Mock events data
const upcomingEvents = [
  {
    id: '1',
    title: 'IDS Scrum Huddle',
    date: '02/09/2025, 2:20 PM',
    icon: Users2,
    iconBg: 'rgba(26,115,232,0.1)',
    iconColor: '#1A73E8',
  },
  {
    id: '2',
    title: 'IDS Scrum Huddle',
    date: '02/09/2025, 2:20 PM',
    icon: Clock,
    iconBg: 'rgba(52,199,89,0.1)',
    iconColor: '#34C759',
  },
];

export default function CalendarScreen() {
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [isAllDay, setIsAllDay] = useState(false);

  const renderCalendarDay = (day: any) => {
    if (day.isSelected) {
      return (
        <View
          style={[
            tw`w-10 h-10 rounded-full items-center justify-center`,
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
      );
    }

    if (day.hasEvent) {
      return (
        <View
          style={[
            tw`w-10 h-10 rounded-full items-center justify-center`,
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
      );
    }

    return (
      <View style={tw`w-10 h-10 rounded-full items-center justify-center`}>
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
    );
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      {/* Status Bar Space */}
      <View style={tw`h-12`} />

      {/* Header */}
      <View style={tw`px-6 py-4 flex-row items-center justify-between`}>
        <View style={tw`flex-row items-center gap-5`}>
          <TouchableOpacity>
            <ArrowLeft size={24} color={colors.black} />
          </TouchableOpacity>
          <Text
            style={[
              tw`text-base font-bold`,
              {
                color: colors.black,
                fontFamily: 'Satoshi Variable',
                letterSpacing: -0.64,
              },
            ]}
          >
            Calendar
          </Text>
        </View>
        <TouchableOpacity>
          <Settings size={24} color={colors.greyText} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Month Navigation */}
        <View style={tw`px-6 mb-6`}>
          <View style={tw`flex-row items-center justify-between mb-6`}>
            <TouchableOpacity>
              <ArrowLeft size={32} color={colors.black} />
            </TouchableOpacity>
            <Text
              style={[
                tw`text-sm font-bold`,
                {
                  color: colors.black,
                  fontFamily: 'Satoshi Variable',
                },
              ]}
            >
              August 2025
            </Text>
            <TouchableOpacity>
              <ArrowRight size={32} color={colors.black} />
            </TouchableOpacity>
          </View>

          {/* Calendar Grid */}
          <View style={tw`flex-row flex-wrap gap-4`}>
            {calendarDays.map((day, index) => (
              <TouchableOpacity key={index} style={tw`w-10 h-10`}>
                {renderCalendarDay(day)}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Events for Selected Date */}
        <View style={tw`px-6 mb-6`}>
          <Text
            style={[
              tw`text-base font-bold mb-6`,
              {
                color: colors.black,
                fontFamily: 'Satoshi Variable',
                letterSpacing: -0.64,
              },
            ]}
          >
            Events for September 10
          </Text>
          <View
            style={[
              tw`bg-white rounded-lg h-52 items-center justify-center`,
              {
                borderWidth: 1,
                borderColor: 'rgba(0,0,0,0.05)',
              },
            ]}
          >
            <View style={tw`items-center gap-4`}>
              <Calendar size={50} color={colors.greyText} />
              <Text
                style={[
                  tw`text-xs font-normal text-center`,
                  {
                    color: colors.greyText,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                No Events Scheduled Today
              </Text>
              <TouchableOpacity
                style={[
                  tw`px-4 py-2 rounded-full flex-row items-center gap-2`,
                  {
                    backgroundColor: 'rgba(163,5,82,0.09)',
                  },
                ]}
                onPress={() => setShowAddEventModal(true)}
              >
                <Plus size={16} color={colors.complimentary} />
                <Text
                  style={[
                    tw`text-xs font-normal`,
                    {
                      color: colors.complimentary,
                      fontFamily: 'Satoshi Variable',
                    },
                  ]}
                >
                  Add Event
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Upcoming Events */}
        <View style={tw`px-6 mb-6`}>
          <Text
            style={[
              tw`text-base font-bold mb-6`,
              {
                color: colors.black,
                fontFamily: 'Satoshi Variable',
                letterSpacing: -0.64,
              },
            ]}
          >
            Upcoming Events
          </Text>
          <View style={tw`gap-2`}>
            {upcomingEvents.map((event) => (
              <View
                key={event.id}
                style={[
                  tw`bg-white p-4 rounded-lg flex-row items-center gap-4`,
                  {
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.1,
                    shadowRadius: 10,
                    elevation: 4,
                  },
                ]}
              >
                <View
                  style={[
                    tw`w-5 h-5 rounded-full items-center justify-center`,
                    {
                      backgroundColor: event.iconBg,
                    },
                  ]}
                >
                  <event.icon size={16} color={event.iconColor} />
                </View>
                <View style={tw`flex-1`}>
                  <Text
                    style={[
                      tw`text-sm font-normal mb-1`,
                      {
                        color: colors.black,
                        fontFamily: 'Satoshi Variable',
                      },
                    ]}
                  >
                    {event.title}
                  </Text>
                  <Text
                    style={[
                      tw`text-xs font-normal`,
                      {
                        color: colors.greyText,
                        fontFamily: 'Satoshi Variable',
                      },
                    ]}
                  >
                    {event.date}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Floating Add Button */}
      <TouchableOpacity
        style={[
          tw`absolute bottom-8 right-6 w-14 h-14 rounded-full items-center justify-center`,
          {
            backgroundColor: colors.complimentary,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 12 },
            shadowOpacity: 0.1,
            shadowRadius: 16,
            elevation: 8,
          },
        ]}
        onPress={() => setShowAddEventModal(true)}
      >
        <Plus size={24} color="white" />
      </TouchableOpacity>

      {/* Add Event Modal */}
      <Modal
        visible={showAddEventModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowAddEventModal(false)}
      >
        <View
          style={[
            tw`flex-1 justify-center items-center`,
            {
              backgroundColor: 'rgba(0,0,0,0.3)',
            },
          ]}
        >
          <View
            style={[
              tw`bg-white rounded-lg w-full mx-6`,
              {
                height: 776,
              },
            ]}
          >
            {/* Modal Header */}
            <View style={tw`px-6 py-6 flex-row items-center justify-between`}>
              <Text
                style={[
                  tw`text-base font-normal`,
                  {
                    color: colors.black,
                    fontFamily: 'Satoshi Variable',
                    letterSpacing: -0.64,
                  },
                ]}
              >
                Add New Event
              </Text>
              <TouchableOpacity onPress={() => setShowAddEventModal(false)}>
                <X size={24} color={colors.black} />
              </TouchableOpacity>
            </View>

            <ScrollView
              style={tw`px-6`}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 20 }}
            >
              {/* Event Title */}
              <View style={tw`mb-6`}>
                <Text
                  style={[
                    tw`text-sm font-bold mb-2`,
                    {
                      color: colors.black,
                      fontFamily: 'Satoshi Variable',
                    },
                  ]}
                >
                  Event Title
                </Text>
                <View
                  style={[
                    tw`border rounded-lg px-4 py-3`,
                    {
                      borderColor: 'rgba(0,0,0,0.1)',
                    },
                  ]}
                >
                  <TextInput
                    placeholder="Title"
                    placeholderTextColor={colors.greyText}
                    style={[
                      tw`text-sm font-normal`,
                      {
                        color: colors.black,
                        fontFamily: 'Satoshi Variable',
                      },
                    ]}
                  />
                </View>
              </View>

              {/* Description */}
              <View style={tw`mb-6`}>
                <Text
                  style={[
                    tw`text-sm font-bold mb-2`,
                    {
                      color: colors.black,
                      fontFamily: 'Satoshi Variable',
                    },
                  ]}
                >
                  Description
                </Text>
                <View
                  style={[
                    tw`border rounded-lg px-4 py-3`,
                    {
                      borderColor: 'rgba(0,0,0,0.1)',
                    },
                  ]}
                >
                  <TextInput
                    placeholder="Description"
                    placeholderTextColor={colors.greyText}
                    style={[
                      tw`text-sm font-normal`,
                      {
                        color: colors.black,
                        fontFamily: 'Satoshi Variable',
                      },
                    ]}
                  />
                </View>
              </View>

              {/* Date */}
              <View style={tw`mb-6`}>
                <Text
                  style={[
                    tw`text-sm font-bold mb-2`,
                    {
                      color: colors.black,
                      fontFamily: 'Satoshi Variable',
                    },
                  ]}
                >
                  Date
                </Text>
                <View
                  style={[
                    tw`border rounded-lg px-4 py-3 flex-row items-center justify-between`,
                    {
                      borderColor: 'rgba(0,0,0,0.1)',
                    },
                  ]}
                >
                  <Text
                    style={[
                      tw`text-sm font-normal`,
                      {
                        color: colors.greyText,
                        fontFamily: 'Satoshi Variable',
                      },
                    ]}
                  >
                    10th September, 2025
                  </Text>
                  <ArrowRight size={16} color={colors.greyText} />
                </View>
              </View>

              {/* Time */}
              <View style={tw`mb-6`}>
                <View style={tw`flex-row items-center justify-between mb-2`}>
                  <Text
                    style={[
                      tw`text-sm font-bold`,
                      {
                        color: colors.black,
                        fontFamily: 'Satoshi Variable',
                      },
                    ]}
                  >
                    Time
                  </Text>
                  <View style={tw`flex-row items-center gap-1`}>
                    <Switch
                      value={isAllDay}
                      onValueChange={setIsAllDay}
                      trackColor={{
                        false: '#D9D9D9',
                        true: colors.complimentary,
                      }}
                      thumbColor="#FFFFFF"
                    />
                    <Text
                      style={[
                        tw`text-xs font-normal`,
                        {
                          color: colors.black,
                          fontFamily: 'Satoshi Variable',
                        },
                      ]}
                    >
                      All day
                    </Text>
                  </View>
                </View>
                <View style={tw`flex-row gap-2`}>
                  <View style={tw`flex-1`}>
                    <Text
                      style={[
                        tw`text-sm font-normal mb-2`,
                        {
                          color: colors.black,
                          fontFamily: 'Satoshi Variable',
                        },
                      ]}
                    >
                      Start Time
                    </Text>
                    <View
                      style={[
                        tw`border rounded-lg px-4 py-3`,
                        {
                          borderColor: 'rgba(0,0,0,0.1)',
                        },
                      ]}
                    >
                      <TextInput
                        placeholder="9:00"
                        placeholderTextColor={colors.greyText}
                        style={[
                          tw`text-sm font-normal`,
                          {
                            color: colors.black,
                            fontFamily: 'Satoshi Variable',
                          },
                        ]}
                      />
                    </View>
                  </View>
                  <View style={tw`flex-1`}>
                    <Text
                      style={[
                        tw`text-sm font-normal mb-2`,
                        {
                          color: colors.black,
                          fontFamily: 'Satoshi Variable',
                        },
                      ]}
                    >
                      End Time
                    </Text>
                    <View
                      style={[
                        tw`border rounded-lg px-4 py-3`,
                        {
                          borderColor: 'rgba(0,0,0,0.1)',
                        },
                      ]}
                    >
                      <TextInput
                        placeholder="10:00"
                        placeholderTextColor={colors.greyText}
                        style={[
                          tw`text-sm font-normal`,
                          {
                            color: colors.black,
                            fontFamily: 'Satoshi Variable',
                          },
                        ]}
                      />
                    </View>
                  </View>
                </View>
              </View>

              {/* Location */}
              <View style={tw`mb-6`}>
                <Text
                  style={[
                    tw`text-sm font-bold mb-2`,
                    {
                      color: colors.black,
                      fontFamily: 'Satoshi Variable',
                    },
                  ]}
                >
                  Location
                </Text>
                <View
                  style={[
                    tw`border rounded-lg px-4 py-3`,
                    {
                      borderColor: 'rgba(0,0,0,0.1)',
                    },
                  ]}
                >
                  <TextInput
                    placeholder="Room 24"
                    placeholderTextColor={colors.greyText}
                    style={[
                      tw`text-sm font-normal`,
                      {
                        color: colors.black,
                        fontFamily: 'Satoshi Variable',
                      },
                    ]}
                  />
                </View>
              </View>

              {/* Color */}
              <View style={tw`mb-6`}>
                <Text
                  style={[
                    tw`text-sm font-bold mb-2`,
                    {
                      color: colors.black,
                      fontFamily: 'Satoshi Variable',
                    },
                  ]}
                >
                  Color
                </Text>
                <View style={tw`h-10 flex-row items-center gap-3`}>
                  {[
                    '#A30552',
                    '#1A73E8',
                    '#34C759',
                    '#FF6B35',
                    '#8B4513',
                    '#6A2374',
                  ].map((color) => (
                    <TouchableOpacity
                      key={color}
                      style={[
                        tw`w-8 h-8 rounded-full`,
                        {
                          backgroundColor: color,
                        },
                      ]}
                    />
                  ))}
                </View>
              </View>

              {/* Create Event Button */}
              <TouchableOpacity
                style={[
                  tw`py-4 rounded-full items-center`,
                  {
                    backgroundColor: colors.complimentary,
                  },
                ]}
                onPress={() => setShowAddEventModal(false)}
              >
                <Text
                  style={[
                    tw`text-sm font-normal`,
                    {
                      color: 'white',
                      fontFamily: 'Satoshi Variable',
                    },
                  ]}
                >
                  Create Event
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}
