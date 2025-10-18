import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import tw from 'twrnc';
import {
  ChevronLeft,
  Mail,
  Phone,
  Users,
  MessageCircle,
  Chat,
} from 'lucide-react-native';

// Import colors directly
const colors = {
  complimentary: '#A30552',
  black: '#111113',
  greyText: '#68666F',
  navy40: '#587484',
  backgroundWhite: '#FAFAFA',
};

export default function HelpSupportScreen({ navigation }: any) {
  const handleEmailPress = (email: string) => {
    Linking.openURL(`mailto:${email}`);
  };

  const handlePhonePress = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleJoinCommunity = () => {
    console.log('Join Community pressed');
    // Add community forum logic here
  };

  const handleSubmitFeedback = () => {
    console.log('Submit Feedback pressed');
    // Add feedback submission logic here
  };

  const handleChatSupport = () => {
    console.log('Chat Support pressed');
    // Add chat support logic here
  };

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
          HELP & SUPPORT
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View style={tw`px-6 mt-8`}>
          {/* Contact Support Section */}
          <View style={tw`mb-8`}>
            <Text
              style={[
                tw`text-base font-bold mb-2`,
                {
                  color: colors.black,
                  fontFamily: 'Satoshi Variable',
                },
              ]}
            >
              Contact Support
            </Text>

            {/* Email Section */}
            <View
              style={[
                tw`py-4`,
                {
                  borderBottomWidth: 1,
                  borderBottomColor: 'rgba(0,0,0,0.09)',
                },
              ]}
            >
              <View style={tw`flex-row items-center mb-4`}>
                <Mail size={16} color={colors.black} />
                <Text
                  style={[
                    tw`text-sm font-medium ml-2`,
                    {
                      color: colors.black,
                      fontFamily: 'Satoshi Variable',
                    },
                  ]}
                >
                  Email Address
                </Text>
              </View>
              <View style={tw`gap-4`}>
                <TouchableOpacity
                  onPress={() => handleEmailPress('care@emailsupport.com')}
                >
                  <Text
                    style={[
                      tw`text-sm`,
                      {
                        color: colors.black,
                        fontFamily: 'Satoshi Variable',
                      },
                    ]}
                  >
                    care@emailsupport.com
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleEmailPress('support@emailsupport.com')}
                >
                  <Text
                    style={[
                      tw`text-sm`,
                      {
                        color: colors.black,
                        fontFamily: 'Satoshi Variable',
                      },
                    ]}
                  >
                    support@emailsupport.com
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Phone Section */}
            <View style={tw`py-6`}>
              <View style={tw`flex-row items-center mb-4`}>
                <Phone size={16} color={colors.black} />
                <Text
                  style={[
                    tw`text-sm font-medium ml-2`,
                    {
                      color: colors.black,
                      fontFamily: 'Satoshi Variable',
                    },
                  ]}
                >
                  Phone Number
                </Text>
              </View>
              <View style={tw`gap-4`}>
                <TouchableOpacity
                  onPress={() => handlePhonePress('+18005550199')}
                >
                  <Text
                    style={[
                      tw`text-sm`,
                      {
                        color: colors.black,
                        fontFamily: 'Satoshi Variable',
                      },
                    ]}
                  >
                    +1 800 555 0199
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handlePhonePress('+2349034588495')}
                >
                  <Text
                    style={[
                      tw`text-sm`,
                      {
                        color: colors.black,
                        fontFamily: 'Satoshi Variable',
                      },
                    ]}
                  >
                    +234 9034588495
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Community Section */}
          <View style={tw`mb-8`}>
            <Text
              style={[
                tw`text-base font-bold mb-2`,
                {
                  color: colors.black,
                  fontFamily: 'Satoshi Variable',
                },
              ]}
            >
              Community
            </Text>

            <View
              style={[
                tw`py-4`,
                {
                  borderBottomWidth: 1,
                  borderBottomColor: 'rgba(0,0,0,0.09)',
                },
              ]}
            >
              <View style={tw`flex-row items-center mb-4`}>
                <Users size={24} color={colors.black} />
                <Text
                  style={[
                    tw`text-sm font-medium ml-2`,
                    {
                      color: colors.black,
                      fontFamily: 'Satoshi Variable',
                    },
                  ]}
                >
                  Community Forum
                </Text>
              </View>

              <View style={tw`mb-4`}>
                <Text
                  style={[
                    tw`text-sm mb-2`,
                    {
                      color: colors.black,
                      fontFamily: 'Satoshi Variable',
                    },
                  ]}
                >
                  Join our community of tailors and designers:
                </Text>
                <View style={tw`ml-4`}>
                  <Text
                    style={[
                      tw`text-sm mb-1`,
                      {
                        color: colors.black,
                        fontFamily: 'Satoshi Variable',
                      },
                    ]}
                  >
                    • Ask questions
                  </Text>
                  <Text
                    style={[
                      tw`text-sm mb-1`,
                      {
                        color: colors.black,
                        fontFamily: 'Satoshi Variable',
                      },
                    ]}
                  >
                    • Share tips & tricks
                  </Text>
                  <Text
                    style={[
                      tw`text-sm mb-1`,
                      {
                        color: colors.black,
                        fontFamily: 'Satoshi Variable',
                      },
                    ]}
                  >
                    • Connect with peers
                  </Text>
                  <Text
                    style={[
                      tw`text-sm`,
                      {
                        color: colors.black,
                        fontFamily: 'Satoshi Variable',
                      },
                    ]}
                  >
                    • Get inspiration
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={[
                  tw`py-4 px-2 rounded-full items-center`,
                  {
                    backgroundColor: 'rgba(163,5,82,0.09)',
                    borderRadius: 32,
                  },
                ]}
                onPress={handleJoinCommunity}
              >
                <Text
                  style={[
                    tw`text-sm font-bold`,
                    {
                      color: colors.complimentary,
                      fontFamily: 'Satoshi Variable',
                    },
                  ]}
                >
                  Join Community
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Submit Feedback Section */}
          <TouchableOpacity
            style={[
              tw`flex-row items-center p-4 rounded-lg`,
              {
                backgroundColor: '#F5F5F7',
                borderRadius: 10,
              },
            ]}
            onPress={handleSubmitFeedback}
          >
            <MessageCircle size={24} color={colors.complimentary} />
            <View style={tw`ml-4 flex-1`}>
              <Text
                style={[
                  tw`text-sm font-bold mb-1`,
                  {
                    color: colors.complimentary,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                Submit Feedback
              </Text>
              <Text
                style={[
                  tw`text-xs`,
                  {
                    color: colors.navy40,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                Send us your thoughts
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Floating Chat Button */}
      <TouchableOpacity
        style={[
          tw`absolute bottom-6 right-6 w-14 h-14 rounded-full items-center justify-center`,
          {
            backgroundColor: colors.complimentary,
            borderRadius: 28,
          },
        ]}
        onPress={handleChatSupport}
      >
        <Chat size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
}
