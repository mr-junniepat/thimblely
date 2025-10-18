import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  Switch,
  Alert,
  Image,
} from 'react-native';
import tw from 'twrnc';
import * as Calendar from 'expo-calendar';
import { useNavigation } from '@react-navigation/native';
import { Input, CalendarGrid, FloatingButton } from '../../components';
import {
  Calendar as CalendarIcon,
  Plus,
  Settings,
  X,
  ChevronRight,
  ChevronLeft,
  AlertCircle,
} from 'lucide-react-native';
// Import calendar images directly
const apple_cal = require('../../../../../libs/shared/src/images/apple_cal.png');
const gcal = require('../../../../../libs/shared/src/images/gcal.png');

// Import colors directly
const colors = {
  complimentary: '#A30552',
  black: '#111113',
  greyText: '#68666F',
  green: '#34C759',
  blue: '#1A73E8',
};

export default function CalendarScreen() {
  const navigation = useNavigation();
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [showSyncModal, setShowSyncModal] = useState(false);
  const [isAllDay, setIsAllDay] = useState(false);
  const [calendarPermission, setCalendarPermission] = useState(false);
  const [calendars, setCalendars] = useState<Calendar.Calendar[]>([]);
  const [events, setEvents] = useState<Calendar.Event[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Form state
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventStartTime, setEventStartTime] = useState('');
  const [eventEndTime, setEventEndTime] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [selectedColor, setSelectedColor] = useState('#A30552');

  useEffect(() => {
    requestCalendarPermission();
  }, []);

  useEffect(() => {
    if (calendarPermission) {
      loadCalendars();
    }
  }, [calendarPermission]);

  useEffect(() => {
    if (calendarPermission && calendars.length > 0) {
      loadEvents();
    }
  }, [calendarPermission, calendars, currentMonth]);

  const requestCalendarPermission = async () => {
    try {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === 'granted') {
        setCalendarPermission(true);
      } else {
        Alert.alert(
          'Calendar Permission Required',
          'Please grant calendar permission to use this feature.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Error requesting calendar permission:', error);
    }
  };

  const loadCalendars = async () => {
    try {
      const calendarList = await Calendar.getCalendarsAsync(
        Calendar.EntityTypes.EVENT
      );
      setCalendars(calendarList);
    } catch (error) {
      console.error('Error loading calendars:', error);
    }
  };

  const loadEvents = async () => {
    try {
      const startOfMonth = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        1
      );
      const endOfMonth = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + 1,
        0
      );

      const eventsList = await Calendar.getEventsAsync(
        calendars.map((cal) => cal.id),
        startOfMonth,
        endOfMonth
      );
      setEvents(eventsList);
    } catch (error) {
      console.error('Error loading events:', error);
    }
  };

  const createEvent = async () => {
    if (!eventTitle.trim()) {
      Alert.alert('Error', 'Please enter an event title');
      return;
    }

    try {
      const startDate = new Date(selectedDate);
      const endDate = new Date(selectedDate);

      if (!isAllDay && eventStartTime && eventEndTime) {
        const [startHour, startMinute] = eventStartTime.split(':').map(Number);
        const [endHour, endMinute] = eventEndTime.split(':').map(Number);

        startDate.setHours(startHour, startMinute, 0, 0);
        endDate.setHours(endHour, endMinute, 0, 0);
      } else {
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);
      }

      const eventDetails = {
        title: eventTitle,
        startDate,
        endDate,
        allDay: isAllDay,
        notes: eventDescription,
        location: eventLocation,
        color: selectedColor,
      };

      if (calendars.length > 0) {
        await Calendar.createEventAsync(calendars[0].id, eventDetails);
        Alert.alert('Success', 'Event created successfully!');
        setShowAddEventModal(false);
        resetForm();
        loadEvents(); // Refresh events
      } else {
        Alert.alert('Error', 'No calendar available');
      }
    } catch (error) {
      console.error('Error creating event:', error);
      Alert.alert('Error', 'Failed to create event');
    }
  };

  const resetForm = () => {
    setEventTitle('');
    setEventDescription('');
    setEventStartTime('');
    setEventEndTime('');
    setEventLocation('');
    setSelectedColor('#A30552');
    setIsAllDay(false);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = new Date(currentMonth);
    if (direction === 'prev') {
      newMonth.setMonth(newMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1);
    }
    setCurrentMonth(newMonth);
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push({ day: null, hasEvent: false, isSelected: false });
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayDate = new Date(year, month, day);
      const hasEvent = events.some((event) => {
        const eventDate = new Date(event.startDate);
        return eventDate.toDateString() === dayDate.toDateString();
      });
      const isSelected = dayDate.toDateString() === selectedDate.toDateString();

      days.push({ day, hasEvent, isSelected, date: dayDate });
    }

    return days;
  };

  const getEventsForSelectedDate = () => {
    return events.filter((event) => {
      const eventDate = new Date(event.startDate);
      return eventDate.toDateString() === selectedDate.toDateString();
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleDayPress = (day: any) => {
    if (day.date) {
      setSelectedDate(day.date);
    }
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      {/* Status Bar Space */}
      <View style={tw`h-12`} />

      {/* Header */}
      <View style={tw`px-6 py-4 flex-row items-center justify-between`}>
        <View style={tw`flex-row items-center gap-5`}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ChevronLeft size={24} color={colors.black} />
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
        <TouchableOpacity onPress={() => setShowSyncModal(true)}>
          <Settings size={24} color={colors.greyText} />
        </TouchableOpacity>
      </View>

      {/* Calendar Section - Fill the screen */}
      <View style={tw`flex-1 px-6`}>
        {/* Month Navigation */}
        <View style={tw`mb-6`}>
          <View style={tw`flex-row items-center justify-between mb-6`}>
            <TouchableOpacity onPress={() => navigateMonth('prev')}>
              <ChevronLeft size={32} color={colors.complimentary} />
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
              {currentMonth.toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric',
              })}
            </Text>
            <TouchableOpacity onPress={() => navigateMonth('next')}>
              <ChevronRight size={32} color={colors.complimentary} />
            </TouchableOpacity>
          </View>

          {/* Calendar Grid */}
          <CalendarGrid
            days={getDaysInMonth(currentMonth)}
            onDayPress={handleDayPress}
          />
        </View>

        {/* Events Section */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {/* Events for Selected Date */}
          <View style={{ marginBottom: 24 }}>
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
              Events for {formatDate(selectedDate)}
            </Text>

            {getEventsForSelectedDate().length > 0 ? (
              <View style={tw`gap-2`}>
                {getEventsForSelectedDate().map((event) => (
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
                          backgroundColor: 'rgba(163,5,82,0.1)',
                        },
                      ]}
                    >
                      <CalendarIcon size={16} color={colors.complimentary} />
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
                        {new Date(event.startDate).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                        {event.location && ` • ${event.location}`}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            ) : (
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
                  <CalendarIcon size={50} color={colors.greyText} />
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
            )}
          </View>
        </ScrollView>
      </View>

      {/* Floating Add Button */}
      <FloatingButton
        onPress={() => setShowAddEventModal(true)}
        icon={Plus}
        iconSize={24}
        backgroundColor={colors.complimentary}
        size={56}
        bottom={32}
        right={24}
      />

      {/* Add Event Modal */}
      <Modal
        visible={showAddEventModal}
        transparent={true}
        animationType="slide"
        presentationStyle="overFullScreen"
        onRequestClose={() => setShowAddEventModal(false)}
      >
        <View
          style={[
            tw`flex-1 justify-end`,
            {
              backgroundColor: 'rgba(0,0,0,0.3)',
            },
          ]}
        >
          <View
            style={[
              tw`bg-white rounded-t-lg w-full`,
              {
                height: 776,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
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
              <Input
                label="Event Title"
                placeholder="Title"
                value={eventTitle}
                onChangeText={setEventTitle}
              />

              {/* Description */}
              <Input
                label="Description"
                placeholder="Description"
                value={eventDescription}
                onChangeText={setEventDescription}
                multiline
                numberOfLines={3}
              />

              {/* Date */}
              <Input
                label="Date"
                value={formatDate(selectedDate)}
                editable={false}
                rightIcon={<ChevronRight size={16} color={colors.greyText} />}
              />

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
                    <Input
                      label="Start Time"
                      placeholder="9:00"
                      value={eventStartTime}
                      onChangeText={setEventStartTime}
                      containerStyle={{ marginBottom: 0 }}
                    />
                  </View>
                  <View style={tw`flex-1`}>
                    <Input
                      label="End Time"
                      placeholder="10:00"
                      value={eventEndTime}
                      onChangeText={setEventEndTime}
                      containerStyle={{ marginBottom: 0 }}
                    />
                  </View>
                </View>
              </View>

              {/* Location */}
              <Input
                label="Location"
                placeholder="Room 24"
                value={eventLocation}
                onChangeText={setEventLocation}
              />

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
                          borderWidth: selectedColor === color ? 2 : 0,
                          borderColor: '#FFFFFF',
                        },
                      ]}
                      onPress={() => setSelectedColor(color)}
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
                onPress={createEvent}
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

      {/* Calendar Sync Modal */}
      <Modal
        visible={showSyncModal}
        transparent={true}
        animationType="slide"
        presentationStyle="overFullScreen"
        onRequestClose={() => setShowSyncModal(false)}
      >
        <View
          style={[
            tw`flex-1 justify-end`,
            {
              backgroundColor: 'rgba(0,0,0,0.3)',
            },
          ]}
        >
          <View
            style={[
              tw`bg-white rounded-t-lg w-full`,
              {
                height: 564,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
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
                Calendar Sync
              </Text>
              <TouchableOpacity onPress={() => setShowSyncModal(false)}>
                <X size={24} color={colors.black} />
              </TouchableOpacity>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 20 }}
            >
              {/* Permission Request Section - Only show when permission is needed */}
              {!calendarPermission && (
                <View style={tw`mb-6 px-6`}>
                  <View style={tw`flex-row items-center gap-2 mb-2`}>
                    <AlertCircle size={19} color="#FF383C" />
                    <Text
                      style={[
                        tw`text-sm font-bold`,
                        {
                          color: '#FF383C',
                          fontFamily: 'Satoshi Variable',
                        },
                      ]}
                    >
                      Calendar Access Required
                    </Text>
                  </View>
                  <Text
                    style={[
                      tw`text-xs font-normal mb-4`,
                      {
                        color: colors.black,
                        fontFamily: 'Satoshi Variable',
                      },
                    ]}
                  >
                    Allow access to sync with your device calendar
                  </Text>
                  <TouchableOpacity
                    style={[
                      tw`py-2 px-4 w-40 rounded-full items-center`,
                      {
                        backgroundColor: colors.complimentary,
                      },
                    ]}
                    onPress={requestCalendarPermission}
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
                      Grant Permission
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

              {/* Sync Status */}
              <View style={tw`py-4 border-t border-b border-gray-200 mb-4`}>
                <View style={tw`flex-row items-center justify-between px-6`}>
                  <Text
                    style={[
                      tw`text-sm font-normal`,
                      {
                        color: colors.black,
                        fontFamily: 'Satoshi Variable',
                      },
                    ]}
                  >
                    Sync Status
                  </Text>
                  <Text
                    style={[
                      tw`text-sm font-normal`,
                      {
                        color: colors.greyText,
                        fontFamily: 'Satoshi Variable',
                      },
                    ]}
                  >
                    {calendarPermission ? 'Connected' : 'Disconnected'}
                  </Text>
                </View>
              </View>

              {/* Calendar Options */}
              <View style={tw`mb-6 px-6`}>
                <Text
                  style={[
                    tw`text-sm font-normal mb-4`,
                    {
                      color: colors.black,
                      fontFamily: 'Satoshi Variable',
                    },
                  ]}
                >
                  Calendar Sync
                </Text>

                {/* Google Calendar */}
                <View
                  style={[
                    tw`bg-white p-3 rounded-lg flex-row items-center gap-4 mb-2`,
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
                      tw`w-12 h-12 rounded-full items-center justify-center`,
                      {
                        backgroundColor: '#F5F5F7',
                      },
                    ]}
                  >
                    <Image
                      source={gcal}
                      style={tw`w-8 h-8`}
                      resizeMode="contain"
                    />
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
                      Google Calendar
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
                      Via device calendar integration
                    </Text>
                  </View>
                </View>

                {/* iCal Calendar */}
                <View
                  style={[
                    tw`bg-white p-3 rounded-lg flex-row items-center gap-4`,
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
                      tw`w-12 h-12 rounded-full items-center justify-center`,
                      {
                        backgroundColor: '#F5F5F7',
                      },
                    ]}
                  >
                    <Image
                      source={apple_cal}
                      style={tw`w-8 h-8`}
                      resizeMode="contain"
                    />
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
                      iCal Calendar
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
                      Via device calendar integration
                    </Text>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}
