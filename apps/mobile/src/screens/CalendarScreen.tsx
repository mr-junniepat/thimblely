// Temporarily disabled entire CalendarScreen to fix Hermes errors
/*
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import {
  ChevronLeft,
  ChevronLeft,
  ChevronRight,
  Plus,
  MoreVertical,
  Users,
  Settings,
  Calendar as CalendarIcon,
} from 'lucide-react-native';
// import * as Calendar from 'expo-calendar';
import { colors } from '@mobile/constants/colors';
import tw from 'twrnc';
import {
  AddEventModal,
  EventFormData,
} from '@mobile/components/calendar/AddEventModal';
import { CalendarSyncModal } from '@mobile/components/calendar/CalendarSyncModal';

interface CalendarScreenProps {
  onBack: () => void;
}

export function CalendarScreen({ onBack }: CalendarScreenProps) {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today.getDate());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [hasCalendarPermission, setHasCalendarPermission] = useState(false);
  const [events, setEvents] = useState<any[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [showSyncModal, setShowSyncModal] = useState(false);

  useEffect(() => {
    // Temporarily disabled expo-calendar
    // (async () => {
    //   const { status } = await Calendar.requestCalendarPermissionsAsync();
    //   if (status === 'granted') {
    //     setHasCalendarPermission(true);
    //     loadEvents();
    //     const upcoming = await loadUpcomingEvents();
    //     setUpcomingEvents(upcoming);
    //   }
    // })();
  }, []);

  useEffect(() => {
    if (hasCalendarPermission) {
      loadEvents();
    }
  }, [selectedDate, currentMonth, currentYear, hasCalendarPermission]);

  const loadEvents = async () => {
    try {
      // const calendars = await Calendar.getCalendarsAsync(
      //   Calendar.EntityTypes.EVENT
      // );
      if (calendars.length > 0) {
        const startDate = new Date(
          currentYear,
          currentMonth,
          selectedDate,
          0,
          0,
          0
        );
        const endDate = new Date(
          currentYear,
          currentMonth,
          selectedDate,
          23,
          59,
          59
        );

        const calendarIds = calendars.map((cal) => cal.id);
        const fetchedEvents = await Calendar.getEventsAsync(
          calendarIds,
          startDate,
          endDate
        );
        setEvents(fetchedEvents);
      }
    } catch (error) {
      console.error('Error loading events:', error);
    }
  };

  const loadUpcomingEvents = async () => {
    try {
      const calendars = await Calendar.getCalendarsAsync(
        Calendar.EntityTypes.EVENT
      );
      if (calendars.length > 0) {
        const startDate = new Date();
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + 30); // Next 30 days

        const calendarIds = calendars.map((cal) => cal.id);
        const fetchedEvents = await Calendar.getEventsAsync(
          calendarIds,
          startDate,
          endDate
        );
        return fetchedEvents.slice(0, 5); // Return max 5 upcoming events
      }
      return [];
    } catch (error) {
      console.error('Error loading upcoming events:', error);
      return [];
    }
  };

  const handleAddEvent = () => {
    if (!hasCalendarPermission) {
      Alert.alert(
        'Calendar Permission',
        'Please grant calendar permission to add events',
        [{ text: 'OK' }]
      );
      return;
    }
    setShowAddEventModal(true);
  };

  const handleCreateEvent = async (eventData: EventFormData) => {
    try {
      const calendars = await Calendar.getCalendarsAsync(
        Calendar.EntityTypes.EVENT
      );
      const defaultCalendar =
        calendars.find((cal) => cal.allowsModifications) || calendars[0];

      if (defaultCalendar) {
        // Parse start and end times
        const [startHour, startMinute] = eventData.startTime
          .split(':')
          .map(Number);
        const [endHour, endMinute] = eventData.endTime.split(':').map(Number);

        const startDate = new Date(
          eventData.date.getFullYear(),
          eventData.date.getMonth(),
          eventData.date.getDate(),
          startHour || 0,
          startMinute || 0
        );

        const endDate = new Date(
          eventData.date.getFullYear(),
          eventData.date.getMonth(),
          eventData.date.getDate(),
          endHour || startHour + 1,
          endMinute || startMinute
        );

        await Calendar.createEventAsync(defaultCalendar.id, {
          title: eventData.title,
          startDate,
          endDate,
          timeZone: 'UTC',
          notes: eventData.description || undefined,
          location: eventData.location || undefined,
          allDay: eventData.isAllDay,
        });

        Alert.alert('Success', 'Event added to calendar');
        loadEvents();
        const upcoming = await loadUpcomingEvents();
        setUpcomingEvents(upcoming);
      }
    } catch (error) {
      console.error('Error creating event:', error);
      Alert.alert('Error', 'Failed to add event');
    }
  };

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const getDaysInMonth = () => {
    return new Date(currentYear, currentMonth + 1, 0).getDate();
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  const getDaysWithEvents = async () => {
    try {
      const calendars = await Calendar.getCalendarsAsync(
        Calendar.EntityTypes.EVENT
      );
      if (calendars.length > 0) {
        const startDate = new Date(currentYear, currentMonth, 1);
        const endDate = new Date(currentYear, currentMonth + 1, 0, 23, 59, 59);

        const calendarIds = calendars.map((cal) => cal.id);
        const monthEvents = await Calendar.getEventsAsync(
          calendarIds,
          startDate,
          endDate
        );

        const daysSet = new Set<number>();
        monthEvents.forEach((event) => {
          const eventDate = new Date(event.startDate);
          if (
            eventDate.getMonth() === currentMonth &&
            eventDate.getFullYear() === currentYear
          ) {
            daysSet.add(eventDate.getDate());
          }
        });

        return Array.from(daysSet);
      }
      return [];
    } catch (error) {
      console.error('Error loading days with events:', error);
      return [];
    }
  };

  const [daysWithEvents, setDaysWithEvents] = useState<number[]>([]);

  useEffect(() => {
    (async () => {
      if (hasCalendarPermission) {
        const days = await getDaysWithEvents();
        setDaysWithEvents(days);
      }
    })();
  }, [currentMonth, currentYear, hasCalendarPermission]);

  const formatEventTime = (startDate: Date, endDate: Date) => {
    const formatTime = (date: Date) => {
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      return `${formattedHours}:${formattedMinutes} ${ampm}`;
    };
    return `${formatTime(startDate)} - ${formatTime(endDate)}`;
  };

  const formatDateTime = (date: Date) => {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${month}/${day}/${year}, ${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  const eventColors = ['#1A73E8', '#FF383C', '#34C759', '#CF1B2B', '#A30552'];

  const getEventColor = (index: number) => {
    return eventColors[index % eventColors.length];
  };

  const getEventBgColor = (color: string) => {
    return `${color}1A`; // Adding alpha for transparency
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      <ScrollView style={tw`flex-1`} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={tw`px-6 pt-12 pb-4`}>
          <View style={tw`flex-row items-center justify-between mb-6`}>
            <View style={tw`flex-row items-center gap-5`}>
              <TouchableOpacity onPress={onBack}>
                <ChevronLeft size={24} color={colors.black} />
              </TouchableOpacity>
              <Text
                style={[
                  tw`text-base font-bold`,
                  { fontFamily: 'System', color: colors.black },
                ]}
              >
                Calendar
              </Text>
            </View>
            <TouchableOpacity onPress={() => setShowSyncModal(true)}>
              <Settings size={24} color={colors.greyText} />
            </TouchableOpacity>
          </View>

          {/* Month Navigation */}
          <View style={tw`flex-row items-center justify-between mb-6`}>
            <TouchableOpacity onPress={() => navigateMonth('prev')}>
              <ChevronLeft size={32} color={colors.black} />
            </TouchableOpacity>
            <Text
              style={[
                tw`text-sm font-bold`,
                { fontFamily: 'System', color: colors.black },
              ]}
            >
              {monthNames[currentMonth]} {currentYear}
            </Text>
            <TouchableOpacity onPress={() => navigateMonth('next')}>
              <ChevronRight size={32} color={colors.black} />
            </TouchableOpacity>
          </View>

          {/* Calendar Grid */}
          <View style={tw`flex-row flex-wrap gap-4 mb-6`}>
            {Array.from({ length: getDaysInMonth() }, (_, i) => i + 1).map(
              (day) => {
                const isSelected = day === selectedDate;
                const hasEvent = daysWithEvents.includes(day);

                return (
                  <TouchableOpacity
                    key={day}
                    style={[
                      tw`w-10 h-10 rounded-full items-center justify-center`,
                      isSelected && { backgroundColor: colors.complimentary },
                      hasEvent && !isSelected && tw`border-2 border-pink-600`,
                    ]}
                    onPress={() => setSelectedDate(day)}
                  >
                    <Text
                      style={[
                        tw`text-xs`,
                        {
                          fontFamily: 'System',
                          color: isSelected ? colors.white : colors.black,
                        },
                      ]}
                    >
                      {day}
                    </Text>
                  </TouchableOpacity>
                );
              }
            )}
          </View>
        </View>

        {/* Events for Selected Date */}
        <View style={tw`px-6 mb-6`}>
          <Text
            style={[
              tw`text-base font-bold mb-6`,
              { fontFamily: 'System', color: colors.black },
            ]}
          >
            Events for {monthNames[currentMonth]} {selectedDate}
          </Text>
          {events.length > 0 ? (
            <View
              style={tw`bg-white border border-gray-100 rounded-xl p-4 gap-6`}
            >
              {events.map((event, index) => {
                const eventColor = getEventColor(index);
                const eventBgColor = getEventBgColor(eventColor);
                const startDate = new Date(event.startDate);
                const endDate = new Date(event.endDate);

                return (
                  <View
                    key={event.id}
                    style={[
                      tw`gap-3`,
                      index < events.length - 1 &&
                        tw`border-b border-gray-100 pb-6`,
                    ]}
                  >
                    <View style={tw`flex-row items-center justify-between`}>
                      <View style={tw`flex-row items-center gap-4 flex-1`}>
                        <View
                          style={[
                            tw`w-10 h-10 rounded-full items-center justify-center`,
                            { backgroundColor: eventBgColor },
                          ]}
                        >
                          <Users size={16} color={eventColor} />
                        </View>
                        <View style={tw`flex-1`}>
                          <Text
                            style={[
                              tw`text-sm font-bold mb-1`,
                              { fontFamily: 'System', color: eventColor },
                            ]}
                          >
                            {event.title}
                          </Text>
                          {event.notes && (
                            <Text
                              style={[
                                tw`text-xs`,
                                {
                                  fontFamily: 'System',
                                  color: colors.greyText,
                                },
                              ]}
                              numberOfLines={1}
                            >
                              {event.notes}
                            </Text>
                          )}
                        </View>
                      </View>
                      <TouchableOpacity>
                        <MoreVertical size={24} color={colors.greyText} />
                      </TouchableOpacity>
                    </View>
                    <View style={tw`flex-row gap-3 flex-wrap`}>
                      <View style={tw`flex-row items-center gap-1.5`}>
                        <Text
                          style={[
                            tw`text-xs font-bold`,
                            { fontFamily: 'System', color: colors.black },
                          ]}
                        >
                          Time :
                        </Text>
                        <Text
                          style={[
                            tw`text-xs`,
                            { fontFamily: 'System', color: colors.black },
                          ]}
                        >
                          {formatEventTime(startDate, endDate)}
                        </Text>
                      </View>
                      {event.location && (
                        <View style={tw`flex-row items-center gap-1.5`}>
                          <Text
                            style={[
                              tw`text-xs font-bold`,
                              { fontFamily: 'System', color: colors.black },
                            ]}
                          >
                            Venue :
                          </Text>
                          <Text
                            style={[
                              tw`text-xs`,
                              { fontFamily: 'System', color: colors.black },
                            ]}
                            numberOfLines={1}
                          >
                            {event.location}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                );
              })}
            </View>
          ) : (
            <View
              style={tw`bg-white border border-gray-100 rounded-xl h-52 items-center justify-center`}
            >
              <View style={tw`items-center gap-4`}>
                <CalendarIcon
                  size={50}
                  color={colors.greyText}
                  strokeWidth={1.5}
                />
                <Text
                  style={[
                    tw`text-xs`,
                    { fontFamily: 'System', color: colors.greyText },
                  ]}
                >
                  No Events Scheduled Today
                </Text>
                <TouchableOpacity
                  style={[
                    tw`px-4 py-2 rounded-full flex-row items-center gap-2`,
                    { backgroundColor: `${colors.complimentary}15` },
                  ]}
                  onPress={handleAddEvent}
                >
                  <Plus size={16} color={colors.complimentary} />
                  <Text
                    style={[
                      tw`text-xs`,
                      { fontFamily: 'System', color: colors.complimentary },
                    ]}
                  >
                    Add Event
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        {/* Upcoming Events */}
        <View style={tw`px-6 pb-24`}>
          <Text
            style={[
              tw`text-base font-bold mb-6`,
              { fontFamily: 'System', color: colors.black },
            ]}
          >
            Upcoming Events
          </Text>
          {upcomingEvents.length > 0 ? (
            <View style={tw`gap-2`}>
              {upcomingEvents.map((event, index) => {
                const eventColor = getEventColor(index);
                const eventBgColor = getEventBgColor(eventColor);
                const eventDate = new Date(event.startDate);

                return (
                  <View
                    key={event.id}
                    style={tw`bg-white rounded-xl p-4 shadow-sm flex-row items-center gap-4`}
                  >
                    <View
                      style={[
                        tw`w-10 h-10 rounded-full items-center justify-center`,
                        { backgroundColor: eventBgColor },
                      ]}
                    >
                      <Users size={16} color={eventColor} />
                    </View>
                    <View style={tw`flex-1`}>
                      <Text
                        style={[
                          tw`text-sm mb-1`,
                          { fontFamily: 'System', color: colors.black },
                        ]}
                      >
                        {event.title}
                      </Text>
                      <Text
                        style={[
                          tw`text-xs`,
                          { fontFamily: 'System', color: colors.greyText },
                        ]}
                      >
                        {formatDateTime(eventDate)}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          ) : (
            <View style={tw`bg-white rounded-xl p-8 shadow-sm items-center`}>
              <Text
                style={[
                  tw`text-sm`,
                  { fontFamily: 'System', color: colors.greyText },
                ]}
              >
                No upcoming events
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Floating Add Button */}
      <TouchableOpacity
        style={[
          tw`absolute bottom-34 right-6 w-14 h-14 rounded-full items-center justify-center shadow-lg`,
          { backgroundColor: colors.complimentary },
        ]}
        onPress={handleAddEvent}
      >
        <Plus size={24} color={colors.white} />
      </TouchableOpacity>

      {/* Add Event Modal */}
      <AddEventModal
        visible={showAddEventModal}
        onClose={() => setShowAddEventModal(false)}
        onSubmit={handleCreateEvent}
        selectedDate={new Date(currentYear, currentMonth, selectedDate)}
      />

      {/* Calendar Sync Modal */}
      <CalendarSyncModal
        visible={showSyncModal}
        onClose={() => setShowSyncModal(false)}
        hasPermission={hasCalendarPermission}
        onPermissionGranted={async () => {
          setHasCalendarPermission(true);
          loadEvents();
          const upcoming = await loadUpcomingEvents();
          setUpcomingEvents(upcoming);
        }}
      />
    </View>
  );
}
*/
