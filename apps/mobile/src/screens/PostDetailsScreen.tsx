import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Switch,
} from 'react-native';
import tw from 'twrnc';
import {
  X,
  ArrowLeft,
  UserPlus,
  MapPin,
  Music,
  ChevronRight,
} from 'lucide-react-native';

// Import colors directly
const colors = {
  complimentary: '#A30552',
  black: '#111113',
  greyText: '#68666F',
  borderGrey: 'rgba(0,0,0,0.05)',
  lightGrey: '#717182',
  toggleOff: '#CBCED4',
};

interface PostDetailsScreenProps {
  navigation: any;
  route: any;
}

export default function PostDetailsScreen({
  navigation,
  route,
}: PostDetailsScreenProps) {
  const [caption, setCaption] = useState('');
  const [hideLikeCounts, setHideLikeCounts] = useState(false);
  const [turnOffCommenting, setTurnOffCommenting] = useState(false);
  const { selectedImage, postType } = route.params || {};

  const handleShare = () => {
    // TODO: Implement post sharing logic
    console.log('Sharing post...');
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      {/* Status Bar Space */}
      <View style={tw`h-12`} />

      {/* Header */}
      <View style={tw`px-4 py-3 flex-row items-center justify-between`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color={colors.black} />
        </TouchableOpacity>
        <Text
          style={[
            tw`text-base font-bold`,
            {
              color: colors.black,
              fontFamily: 'Satoshi Variable',
            },
          ]}
        >
          New Post
        </Text>
        <View style={tw`w-6`} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image Preview */}
        {selectedImage && (
          <View style={tw`mx-auto my-4`}>
            <Image
              source={{ uri: selectedImage }}
              style={tw`w-57 h-52 rounded`}
              resizeMode="cover"
            />
          </View>
        )}

        {/* Caption Input */}
        <View style={tw`mx-auto my-4 w-full max-w-sm`}>
          <Text
            style={[
              tw`text-sm font-medium mb-2`,
              {
                color: colors.black,
                fontFamily: 'Satoshi Variable',
              },
            ]}
          >
            Add a caption
          </Text>
          <TextInput
            value={caption}
            onChangeText={setCaption}
            placeholder="Write a caption..."
            placeholderTextColor={colors.greyText}
            multiline
            style={[
              tw`bg-neutral-50 border border-[rgba(0,0,0,0.1)] rounded-[10px] p-4 h-28`,
              {
                fontFamily: 'Satoshi Variable',
                color: colors.black,
              },
            ]}
          />
        </View>

        {/* Tag, Location, Music Options - Only show for Feed posts */}
        {postType === 'feed' && (
          <View style={tw`mx-auto my-2 w-full max-w-sm`}>
            <TouchableOpacity
              style={[
                tw`flex-row items-center justify-between py-3 border-b border-gray-200`,
              ]}
            >
              <View style={tw`flex-row items-center gap-3`}>
                <UserPlus size={20} color={colors.black} />
                <Text
                  style={[
                    tw`text-base`,
                    {
                      color: colors.black,
                      fontFamily: 'Satoshi Variable',
                    },
                  ]}
                >
                  Tag people
                </Text>
              </View>
              <ChevronRight size={20} color={colors.black} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                tw`flex-row items-center justify-between py-3 border-b border-gray-200`,
              ]}
            >
              <View style={tw`flex-row items-center gap-3`}>
                <MapPin size={20} color={colors.black} />
                <Text
                  style={[
                    tw`text-base`,
                    {
                      color: colors.black,
                      fontFamily: 'Satoshi Variable',
                    },
                  ]}
                >
                  Add location
                </Text>
              </View>
              <ChevronRight size={20} color={colors.black} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                tw`flex-row items-center justify-between py-3 border-b border-gray-200`,
              ]}
            >
              <View style={tw`flex-row items-center gap-3`}>
                <Music size={20} color={colors.black} />
                <Text
                  style={[
                    tw`text-base`,
                    {
                      color: colors.black,
                      fontFamily: 'Satoshi Variable',
                    },
                  ]}
                >
                  Add music
                </Text>
              </View>
              <ChevronRight size={20} color={colors.black} />
            </TouchableOpacity>
          </View>
        )}

        {/* Advanced Settings */}
        <View style={tw`mx-auto my-4 w-full max-w-sm`}>
          <Text
            style={[
              tw`text-base font-bold mb-2`,
              {
                color: colors.black,
                fontFamily: 'Satoshi Variable',
              },
            ]}
          >
            Advanced settings
          </Text>

          {/* Hide like and view counts */}
          <View style={tw`flex-row items-center justify-between py-4`}>
            <View style={tw`flex-1 mr-4`}>
              <Text
                style={[
                  tw`text-sm font-medium mb-1`,
                  {
                    color: colors.black,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                Hide like and view counts
              </Text>
              <Text
                style={[
                  tw`text-xs`,
                  {
                    color: colors.lightGrey,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                Only you will see the total number of likes and views
              </Text>
            </View>
            <Switch
              value={hideLikeCounts}
              onValueChange={setHideLikeCounts}
              trackColor={{
                false: colors.toggleOff,
                true: colors.complimentary,
              }}
              thumbColor="#FFFFFF"
            />
          </View>

          {/* Turn off commenting */}
          <View style={tw`flex-row items-center justify-between py-4`}>
            <View style={tw`flex-1 mr-4`}>
              <Text
                style={[
                  tw`text-sm font-medium mb-1`,
                  {
                    color: colors.black,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                Turn off commenting
              </Text>
              <Text
                style={[
                  tw`text-xs`,
                  {
                    color: colors.lightGrey,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                You can change this later
              </Text>
            </View>
            <Switch
              value={turnOffCommenting}
              onValueChange={setTurnOffCommenting}
              trackColor={{
                false: colors.toggleOff,
                true: colors.complimentary,
              }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>
      </ScrollView>

      {/* Share Post Button */}
      <View style={tw`px-4 pb-4`}>
        <TouchableOpacity
          onPress={handleShare}
          style={[
            tw`py-4 rounded-full items-center justify-center`,
            {
              backgroundColor: colors.complimentary,
            },
          ]}
        >
          <Text
            style={[
              tw`text-sm font-medium`,
              {
                color: '#FFFFFF',
                fontFamily: 'Satoshi Variable',
              },
            ]}
          >
            {postType === 'marketplace' ? 'Share to Marketplace' : 'Share Post'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
