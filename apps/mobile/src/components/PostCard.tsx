import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  Smile,
} from 'lucide-react-native';
import { colors } from '@thimblely/shared';
import tw from 'twrnc';

interface PostCardProps {
  username: string;
  userAvatar: any;
  userType: string;
  userTypeColor: string;
  timeAgo: string;
  location?: string;
  rating?: string;
  reviewCount?: string;
  postImage: any;
  description: string;
  price?: string;
  originalPrice?: string;
  badge?: string;
  badgeColor?: string;
  likes: number;
  comments: number;
  shares: number;
}

export function PostCard({
  username,
  userAvatar,
  userType,
  userTypeColor,
  timeAgo,
  location,
  rating,
  reviewCount,
  postImage,
  description,
  price,
  originalPrice,
  badge,
  badgeColor = '#00C950',
  likes,
  comments,
  shares,
}: PostCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  return (
    <View style={tw`bg-white border-b border-gray-100 pb-4`}>
      {/* User Header */}
      <View style={tw`flex-row items-center justify-between px-6 py-3.5`}>
        <View style={tw`flex-row items-center gap-2.5`}>
          <Image source={userAvatar} style={tw`w-10 h-10 rounded-full`} />
          <View style={tw`gap-1`}>
            <View style={tw`flex-row items-center gap-1`}>
              <Text
                style={[
                  tw`text-sm text-neutral-950`,
                  { fontFamily: 'Outfit_400Regular' },
                ]}
              >
                {username}
              </Text>
              <View
                style={tw.style(`px-1.5 py-0.5 rounded-full bg-gray-100`, {
                  backgroundColor: `${userTypeColor}10`,
                })}
              >
                <Text
                  style={[
                    tw`text-[10px]`,
                    { fontFamily: 'Outfit_400Regular', color: userTypeColor },
                  ]}
                >
                  {userType}
                </Text>
              </View>
            </View>
            <View style={tw`flex-row items-center gap-2.5`}>
              <Text
                style={[
                  tw`text-xs text-[#6A7282]`,
                  { fontFamily: 'Outfit_400Regular' },
                ]}
              >
                {timeAgo}
              </Text>
              {location && (
                <>
                  <Text style={tw`text-xs text-[#6A7282]`}>•</Text>
                  <Text
                    style={[
                      tw`text-xs text-[#6A7282]`,
                      { fontFamily: 'Outfit_400Regular' },
                    ]}
                  >
                    {location}
                  </Text>
                </>
              )}
              {rating && (
                <>
                  <Text style={tw`text-xs text-[#6A7282]`}>★</Text>
                  <Text
                    style={[
                      tw`text-xs text-[#6A7282]`,
                      { fontFamily: 'Outfit_400Regular' },
                    ]}
                  >
                    {rating} ({reviewCount})
                  </Text>
                </>
              )}
            </View>
          </View>
        </View>
        <TouchableOpacity>
          <Text style={tw`text-lg`}>⋯</Text>
        </TouchableOpacity>
      </View>

      {/* Post Image */}
      <View style={tw`relative h-52.5 w-full`}>
        <Image
          source={postImage}
          style={tw`w-full h-full`}
          resizeMode="cover"
        />
        {badge && (
          <View
            style={tw.style(
              `absolute top-2.5 left-2.5 px-2 py-1 rounded-full`,
              {
                backgroundColor: badgeColor,
              }
            )}
          >
            <Text
              style={[
                tw`text-[10px] text-white`,
                { fontFamily: 'Outfit_400Regular' },
              ]}
            >
              {badge}
            </Text>
          </View>
        )}
      </View>

      {/* Product Info (if price exists) */}
      {price && (
        <View style={tw`px-6 py-4`}>
          <Text
            style={[
              tw`text-sm text-neutral-950 mb-4`,
              { fontFamily: 'Outfit_400Regular' },
            ]}
          >
            {description.split('#')[0].trim()}
          </Text>
          <View style={tw`flex-row items-center justify-between`}>
            <View style={tw`flex-row items-center gap-2`}>
              <Text
                style={[
                  tw`text-base text-[${colors.complimentary}]`,
                  { fontFamily: 'Outfit_700Bold' },
                ]}
              >
                {price}
              </Text>
              {originalPrice && (
                <Text
                  style={[
                    tw`text-xs text-[#6A7282] line-through`,
                    { fontFamily: 'Outfit_400Regular' },
                  ]}
                >
                  {originalPrice}
                </Text>
              )}
            </View>
            <TouchableOpacity>
              <View
                style={tw`bg-[${colors.complimentary}] px-5 py-2 rounded-full`}
              >
                <Text
                  style={[
                    tw`text-sm text-white`,
                    { fontFamily: 'Outfit_400Regular' },
                  ]}
                >
                  Buy now
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Actions (Likes, Comments, Share, Save) */}
      <View style={tw`px-6 py-4`}>
        <View style={tw`flex-row items-center justify-between mb-4`}>
          <View style={tw`flex-row items-center gap-3`}>
            <TouchableOpacity
              onPress={() => setIsLiked(!isLiked)}
              style={tw`flex-row items-center gap-1`}
            >
              <Heart
                size={24}
                color={isLiked ? colors.complimentary : colors.greyText}
                fill={isLiked ? colors.complimentary : 'transparent'}
              />
              <Text
                style={[
                  tw`text-xs text-[${colors.greyText}]`,
                  { fontFamily: 'Outfit_400Regular' },
                ]}
              >
                {likes}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={tw`flex-row items-center gap-2`}>
              <MessageCircle size={24} color={colors.greyText} />
              <Text
                style={[
                  tw`text-xs text-[${colors.greyText}]`,
                  { fontFamily: 'Outfit_400Regular' },
                ]}
              >
                {comments}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={tw`flex-row items-center gap-2`}>
              <Send size={24} color={colors.greyText} />
              <Text
                style={[
                  tw`text-xs text-[${colors.greyText}]`,
                  { fontFamily: 'Outfit_400Regular' },
                ]}
              >
                {shares}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => setIsSaved(!isSaved)}>
            <Bookmark
              size={24}
              color={isSaved ? colors.complimentary : colors.greyText}
              fill={isSaved ? colors.complimentary : 'transparent'}
            />
          </TouchableOpacity>
        </View>

        {/* Description */}
        {!price && (
          <Text
            style={[
              tw`text-xs text-[#4A5565] mb-3`,
              { fontFamily: 'Outfit_400Regular' },
            ]}
          >
            {description}
          </Text>
        )}

        {/* Add Comment */}
        <View style={tw`flex-row items-center gap-3`}>
          <Smile size={20} color={colors.greyText} />
          <View style={tw`flex-1 bg-gray-50 rounded-full px-3 py-3`}>
            <Text
              style={[
                tw`text-xs text-[${colors.greyText}]`,
                { fontFamily: 'Outfit_400Regular' },
              ]}
            >
              Add a comment...
            </Text>
          </View>
          <TouchableOpacity>
            <Text
              style={[
                tw`text-sm text-[${colors.complimentary}]`,
                { fontFamily: 'Outfit_400Regular' },
              ]}
            >
              Post
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
