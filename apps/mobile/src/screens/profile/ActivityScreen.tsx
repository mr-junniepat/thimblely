import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import tw from 'twrnc';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { faker } from '@faker-js/faker';

// Import colors directly
const colors = {
  black: '#111113',
  greyText: '#68666F',
};

interface ActivityItem {
  id: string;
  userAvatar: string;
  action: string;
  time: string;
}

const activities: ActivityItem[] = [
  {
    id: '1',
    userAvatar: faker.image.avatar(),
    action: `${faker.person.fullName()} followed you back`,
    time: 'Just now',
  },
  {
    id: '2',
    userAvatar: faker.image.avatar(),
    action: `${faker.person.fullName()} liked your post`,
    time: '2 weeks ago',
  },
  {
    id: '3',
    userAvatar: faker.image.avatar(),
    action: `${faker.person.fullName()} followed you`,
    time: '2 weeks ago',
  },
  {
    id: '4',
    userAvatar: faker.image.avatar(),
    action: `${faker.person.fullName()} commented on your photo`,
    time: '1 week ago',
  },
  {
    id: '5',
    userAvatar: faker.image.avatar(),
    action: `${faker.person.fullName()} sent you a message`,
    time: '3 days ago',
  },
  {
    id: '6',
    userAvatar: faker.image.avatar(),
    action: `${faker.person.fullName()} shared your story`,
    time: '5 hours ago',
  },
  {
    id: '7',
    userAvatar: faker.image.avatar(),
    action: `${faker.person.fullName()} viewed your profile`,
    time: '1 day ago',
  },
  {
    id: '8',
    userAvatar: faker.image.avatar(),
    action: `${faker.person.fullName()} liked your story`,
    time: '4 hours ago',
  },
  {
    id: '9',
    userAvatar: faker.image.avatar(),
    action: `${faker.person.fullName()} mentioned you in a comment`,
    time: '6 hours ago',
  },
  {
    id: '10',
    userAvatar: faker.image.avatar(),
    action: `${faker.person.fullName()} started following you`,
    time: '1 day ago',
  },
];

export default function ActivityScreen({ navigation }: any) {
  return (
    <View style={tw`flex-1 bg-white`}>
      {/* Status Bar Space */}
      <View style={tw`h-12`} />

      {/* Header */}
      <View style={tw`px-6 py-4 flex-row items-center`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft size={24} color={colors.black} />
        </TouchableOpacity>
        <Text
          style={[
            tw`text-base font-bold ml-4`,
            {
              color: colors.black,
              fontFamily: 'Satoshi Variable',
            },
          ]}
        >
          Activity
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View style={tw`px-6 mt-6`}>
          {activities.map((activity, index) => (
            <TouchableOpacity
              key={activity.id}
              style={[
                tw`flex-row items-center py-6`,
                index < activities.length - 1 && {
                  borderBottomWidth: 1,
                  borderBottomColor: 'rgba(0,0,0,0.05)',
                },
              ]}
            >
              {/* Avatar */}
              <View style={tw`mr-3`}>
                <Image
                  source={{ uri: activity.userAvatar }}
                  style={tw`w-10 h-10 rounded-full`}
                />
              </View>

              {/* Content */}
              <View style={tw`flex-1`}>
                <Text
                  style={[
                    tw`text-sm mb-1`,
                    {
                      color: colors.black,
                      fontFamily: 'Satoshi Variable',
                    },
                  ]}
                >
                  {activity.action}
                </Text>
                <Text
                  style={[
                    tw`text-xs`,
                    {
                      color: colors.greyText,
                      fontFamily: 'Satoshi Variable',
                    },
                  ]}
                >
                  {activity.time}
                </Text>
              </View>

              {/* Arrow */}
              <ChevronRight size={20} color={colors.black} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
