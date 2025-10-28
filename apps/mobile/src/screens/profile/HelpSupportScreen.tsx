import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import tw from 'twrnc';
import { useLazyQuery, gql } from '@apollo/client';
import {
  ChevronLeft,
  Mail,
  Phone,
  Users,
  MessageCircle,
  MessageSquare,
} from 'lucide-react-native';

// Import colors directly
const colors = {
  complimentary: '#A30552',
  black: '#111113',
  greyText: '#68666F',
  navy40: '#587484',
  backgroundWhite: '#FAFAFA',
};

// GraphQL query to fetch support contacts
const GET_SUPPORT_CONTACTS = gql`
  query GetSupportContacts {
    support_contactsCollection(
      filter: { is_active: { eq: true } }
      orderBy: { display_order: AscNullsLast }
    ) {
      edges {
        node {
          id
          contact_type
          label
          value
        }
      }
    }
  }
`;

export default function HelpSupportScreen({ navigation }: any) {
  const [contacts, setContacts] = useState<any[]>([]);

  // Fetch support contacts from database
  const [fetchContacts] = useLazyQuery(GET_SUPPORT_CONTACTS, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      if (data?.support_contactsCollection?.edges) {
        setContacts(
          data.support_contactsCollection.edges.map((edge: any) => edge.node)
        );
      }
    },
    onError: (error) => {
      console.error('Error fetching support contacts:', error);
    },
  });

  useEffect(() => {
    fetchContacts();
  }, []);
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
                {contacts
                  .filter((c) => c.contact_type === 'email')
                  .map((contact, index) => (
                    <TouchableOpacity
                      key={contact.id}
                      onPress={() => handleEmailPress(contact.value)}
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
                        {contact.value}
                      </Text>
                    </TouchableOpacity>
                  ))}
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
                {contacts
                  .filter((c) => c.contact_type === 'phone')
                  .map((contact) => (
                    <TouchableOpacity
                      key={contact.id}
                      onPress={() => handlePhonePress(contact.value)}
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
                        {contact.value}
                      </Text>
                    </TouchableOpacity>
                  ))}
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
        <MessageSquare size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
}
