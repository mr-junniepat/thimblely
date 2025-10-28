import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import tw from 'twrnc';
import { X, Camera, ChevronDown } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { useToast } from '../hooks';

// Import colors directly
const colors = {
  complimentary: '#A30552',
  black: '#111113',
  greyText: '#68666F',
  backgroundGrey: '#F5F5F7',
  borderGrey: 'rgba(0,0,0,0.05)',
};

interface CreatePostScreenProps {
  navigation: any;
}

export default function CreatePostScreen({
  navigation,
}: CreatePostScreenProps) {
  const [postType, setPostType] = useState<'feed' | 'marketplace'>('feed');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [recentPhotos, setRecentPhotos] = useState<string[]>([]);
  const { showToast } = useToast();

  // Request media library permissions and load photos on mount
  useEffect(() => {
    (async () => {
      // Request both permissions
      const mediaLibraryStatus = await MediaLibrary.requestPermissionsAsync();
      const imagePickerStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (
        mediaLibraryStatus.status !== 'granted' ||
        imagePickerStatus.status !== 'granted'
      ) {
        showToast('Permission Required', 'error');
        return;
      }

      // Load recent photos from device
      await loadRecentPhotos();
    })();
  }, []);

  const loadRecentPhotos = async () => {
    try {
      // Get permission status
      const { status } = await MediaLibrary.getPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      // Get recent photos AND videos from device
      const assets = await MediaLibrary.getAssetsAsync({
        mediaType: [MediaLibrary.MediaType.photo, MediaLibrary.MediaType.video],
        sortBy: MediaLibrary.SortBy.creationTime,
        first: 9, // Get first 9 items
      });

      // Extract URIs from assets
      const mediaURIs = assets.assets.map((asset) => asset.uri);
      setRecentPhotos(mediaURIs);
    } catch (error) {
      console.error('Error loading photos and videos:', error);
      setRecentPhotos([]);
    }
  };

  const handleCameraPress = async () => {
    // Request camera permissions
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      showToast('Camera permission required', 'error');
      return;
    }

    // Launch camera
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleGalleryPress = async () => {
    handleSelectFromGallery();
  };

  const handleSelectFromGallery = async () => {
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      showToast('Photo library permission required', 'error');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: false,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      {/* Status Bar Space */}
      <View style={tw`h-12`} />

      {/* Header */}
      <View style={tw`px-4 py-3 flex-row items-center justify-between`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <X size={24} color={colors.black} />
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
        <TouchableOpacity
          onPress={() => {
            if (selectedImage) {
              navigation.navigate('PostDetails', {
                selectedImage,
                postType,
              });
            } else {
              showToast('Please select an image first', 'error');
            }
          }}
        >
          <Text
            style={[
              tw`text-base font-bold`,
              {
                color: selectedImage ? colors.complimentary : colors.greyText,
                fontFamily: 'Satoshi Variable',
              },
            ]}
          >
            Next
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Post Type Selector - Moved to Top */}
        <View style={tw`mx-4 mt-4`}>
          <View
            style={[
              tw`flex-row items-center p-1 rounded-full`,
              {
                backgroundColor: '#F5F5F7',
                borderWidth: 0.5,
                borderColor: colors.borderGrey,
              },
            ]}
          >
            <TouchableOpacity
              onPress={() => setPostType('feed')}
              style={[
                tw`flex-1 items-center justify-center py-2.5 px-2 rounded-full`,
                {
                  backgroundColor:
                    postType === 'feed' ? 'rgba(163,5,82,0.09)' : 'transparent',
                },
              ]}
            >
              <Text
                style={[
                  tw`text-xs`,
                  {
                    color:
                      postType === 'feed'
                        ? colors.complimentary
                        : colors.greyText,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                Feed Post
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setPostType('marketplace')}
              style={[
                tw`flex-1 items-center justify-center py-2.5 px-2 rounded-full`,
                {
                  backgroundColor:
                    postType === 'marketplace'
                      ? 'rgba(163,5,82,0.09)'
                      : 'transparent',
                },
              ]}
            >
              <Text
                style={[
                  tw`text-xs`,
                  {
                    color:
                      postType === 'marketplace'
                        ? colors.complimentary
                        : colors.greyText,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                Marketplace Post
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Image Preview - Camera Button Area */}
        <View style={tw`mx-4 my-4`}>
          <TouchableOpacity
            style={tw`h-96 bg-gray-100 rounded-lg relative items-center justify-center`}
            onPress={handleCameraPress}
          >
            {selectedImage ? (
              <Image
                source={{ uri: selectedImage }}
                style={tw`w-full h-full rounded-lg`}
                resizeMode="cover"
              />
            ) : (
              <View style={tw`items-center`}>
                <Camera size={48} color={colors.complimentary} />
                <Text
                  style={[
                    tw`mt-2 text-base font-medium`,
                    {
                      color: colors.complimentary,
                      fontFamily: 'Satoshi Variable',
                    },
                  ]}
                >
                  Tap to select photo
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Recent Photos Grid */}
        <View style={tw`px-4 pb-6`}>
          <View style={tw`flex-row items-center mb-4`}>
            <Text
              style={[
                tw`text-base font-bold`,
                {
                  color: colors.black,
                  fontFamily: 'Satoshi Variable',
                },
              ]}
            >
              Recent
            </Text>
            <TouchableOpacity style={tw`ml-2`}>
              <ChevronDown size={16} color={colors.black} />
            </TouchableOpacity>
          </View>

          {recentPhotos.length > 0 ? (
            <View style={tw`gap-1`}>
              {/* Row 1 */}
              <View style={tw`flex-row gap-1`}>
                <TouchableOpacity
                  style={[
                    tw`w-24 h-28`,
                    {
                      backgroundColor: 'rgba(163,5,82,0.1)',
                    },
                  ]}
                  onPress={handleGalleryPress}
                >
                  <View style={tw`flex-1 items-center justify-center`}>
                    <Camera size={24} color={colors.complimentary} />
                  </View>
                </TouchableOpacity>
                {recentPhotos.slice(0, 2).map((uri: string, idx: number) => (
                  <TouchableOpacity
                    key={idx}
                    style={tw`flex-1 h-28`}
                    onPress={() => setSelectedImage(uri)}
                  >
                    <Image
                      source={{ uri }}
                      style={tw`w-full h-full`}
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                ))}
              </View>

              {/* Row 2 */}
              <View style={tw`flex-row gap-1`}>
                {recentPhotos.slice(2, 5).map((uri: string, idx: number) => (
                  <TouchableOpacity
                    key={idx}
                    style={tw`flex-1 h-28`}
                    onPress={() => setSelectedImage(uri)}
                  >
                    <Image
                      source={{ uri }}
                      style={tw`w-full h-full`}
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                ))}
              </View>

              {/* Row 3 */}
              <View style={tw`flex-row gap-1`}>
                {recentPhotos.slice(5, 8).map((uri: string, idx: number) => (
                  <TouchableOpacity
                    key={idx}
                    style={tw`flex-1 h-28`}
                    onPress={() => setSelectedImage(uri)}
                  >
                    <Image
                      source={{ uri }}
                      style={tw`w-full h-full`}
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ) : (
            <View style={tw`items-center py-8`}>
              <Text
                style={[
                  tw`text-sm`,
                  {
                    color: colors.greyText,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                No recent photos
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
