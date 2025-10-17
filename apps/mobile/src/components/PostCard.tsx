import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
// Import colors directly from the source file
const colors = {
  complimentary: '#A30552',
  greyText: '#68666F',
  black: '#111113',
  newPost: '#AD46FF',
  oldPost: '#C5C5C5',
};
import tw from 'twrnc';
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  Smile,
  ShoppingBag,
  MapPin,
  Star,
} from 'lucide-react-native';

interface PostCardProps {
  post: {
    id: string;
    user: {
      username: string;
      avatar: string;
      badge: { text: string; color: string };
      location?: string;
      rating?: { score: number; count: number };
    };
    timeAgo: string;
    image: string;
    product?: {
      title: string;
      price: number;
      originalPrice?: number;
      badge?: string;
    };
    caption: string;
    likes: number;
    comments: number;
    shares: number;
  };
  comment: string;
  onCommentChange: (text: string) => void;
}

export default function PostCard({
  post,
  comment,
  onCommentChange,
}: PostCardProps) {
  // Determine if post is new (less than 1 hour old) or old
  const isNewPost = () => {
    const timeAgo = post.timeAgo.toLowerCase();
    return (
      timeAgo.includes('min') ||
      timeAgo.includes('now') ||
      timeAgo.includes('just')
    );
  };
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const [isBuyPressed, setIsBuyPressed] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [shareCount, setShareCount] = useState(post.shares);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = () => {
    setIsShared(!isShared);
    setShareCount(isShared ? shareCount - 1 : shareCount + 1);
  };

  const handleBuyPress = () => {
    setIsBuyPressed(true);
    // Reset after animation
    setTimeout(() => setIsBuyPressed(false), 200);
  };

  return (
    <View style={tw`border-b border-gray-200 pb-4 bg-white`}>
      {/* Post Header */}
      <View style={tw`px-6 py-3.5 flex-row items-center justify-between`}>
        <View style={tw`flex-row items-center gap-2.5`}>
          {/* Avatar with Ring */}
          <View
            style={[
              tw`w-11 h-11 rounded-full p-0.5 items-center justify-center`,
              {
                backgroundColor: isNewPost() ? colors.newPost : colors.oldPost,
              },
            ]}
          >
            <View style={tw`w-10 h-10 rounded-full overflow-hidden`}>
              <Image
                source={{ uri: post.user.avatar }}
                style={tw`w-full h-full`}
                resizeMode="cover"
              />
            </View>
          </View>

          {/* User Info */}
          <View style={tw`gap-1`}>
            <View style={tw`flex-row items-center gap-1`}>
              <Text
                style={[
                  tw`text-sm font-normal`,
                  {
                    color: '#0A0A0A',
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                {post.user.username}
              </Text>
              <View
                style={[
                  tw`px-1.5 py-0.5 rounded-full`,
                  {
                    backgroundColor: '#F3F4F6',
                  },
                ]}
              >
                <Text
                  style={[
                    tw`text-xs font-normal`,
                    {
                      color: post.user.badge.color,
                      fontFamily: 'Satoshi Variable',
                    },
                  ]}
                >
                  {post.user.badge.text}
                </Text>
              </View>
            </View>

            <View style={tw`flex-row items-center gap-2.5`}>
              <Text
                style={[
                  tw`text-xs font-normal`,
                  {
                    color: '#6A7282',
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                {post.timeAgo}
              </Text>
              {post.user.location && (
                <View style={tw`flex-row items-center gap-1`}>
                  <MapPin size={10.5} color="#6A7282" />
                  <Text
                    style={[
                      tw`text-xs font-normal`,
                      {
                        color: '#6A7282',
                        fontFamily: 'Satoshi Variable',
                      },
                    ]}
                  >
                    {post.user.location}
                  </Text>
                </View>
              )}
              {post.user.rating && (
                <View style={tw`flex-row items-center gap-1`}>
                  <Star size={10.5} color="#6A7282" />
                  <Text
                    style={[
                      tw`text-xs font-normal`,
                      {
                        color: '#6A7282',
                        fontFamily: 'Satoshi Variable',
                      },
                    ]}
                  >
                    {post.user.rating.score}
                  </Text>
                  <Text
                    style={[
                      tw`text-xs font-normal`,
                      {
                        color: '#6A7282',
                        fontFamily: 'Satoshi Variable',
                      },
                    ]}
                  >
                    ({post.user.rating.count})
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* More Options */}
        <TouchableOpacity>
          <Text style={[tw`text-xl`, { color: colors.greyText }]}>⋯</Text>
        </TouchableOpacity>
      </View>

      {/* Post Image */}
      <View style={tw`relative`}>
        <Image
          source={{ uri: post.image }}
          style={tw`w-full h-52`}
          resizeMode="cover"
        />
        {post.product?.badge && (
          <View
            style={[
              tw`absolute top-2.5 left-2.5 px-1.5 py-1 rounded-full`,
              {
                backgroundColor: '#00C950',
              },
            ]}
          >
            <Text
              style={[
                tw`text-xs font-normal text-white leading-4`,
                {
                  fontFamily: 'Satoshi Variable',
                },
              ]}
            >
              {post.product.badge}
            </Text>
          </View>
        )}
      </View>

      {/* Product Info (if applicable) */}
      {post.product && (
        <View style={tw`px-6 py-4 gap-4`}>
          <Text
            style={[
              tw`text-sm font-normal`,
              {
                color: '#0A0A0A',
                fontFamily: 'Satoshi Variable',
              },
            ]}
          >
            {post.product.title}
          </Text>
          <View style={tw`flex-row items-center justify-between`}>
            <View style={tw`flex-row items-center gap-1.5`}>
              <Text
                style={[
                  tw`text-base font-bold`,
                  {
                    color: colors.complimentary,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                ${post.product.price}
              </Text>
              {post.product.originalPrice && (
                <Text
                  style={[
                    tw`font-normal line-through`,
                    {
                      fontSize: post.product.originalPrice > 100 ? 10 : 12,
                      color: '#6A7282',
                      fontFamily: 'Satoshi Variable',
                    },
                  ]}
                >
                  ${post.product.originalPrice}
                </Text>
              )}
            </View>
            <TouchableOpacity
              style={[
                tw`px-5 py-2 rounded-full flex-row items-center gap-1`,
                {
                  backgroundColor: isBuyPressed
                    ? colors.complimentary + '80'
                    : colors.complimentary,
                  transform: [{ scale: isBuyPressed ? 0.95 : 1 }],
                },
              ]}
              onPress={handleBuyPress}
            >
              <ShoppingBag size={12} color="white" />
              <Text
                style={[
                  tw`text-sm font-normal text-white`,
                  {
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                Buy now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Interactions */}
      <View style={tw`px-6 gap-4 py-4`}>
        <View style={tw`flex-row items-center justify-between`}>
          <View style={tw`flex-row items-end gap-3`}>
            <TouchableOpacity
              style={tw`flex-row items-center gap-1`}
              onPress={handleLike}
            >
              <Heart
                size={24}
                color={isLiked ? colors.complimentary : colors.greyText}
                fill={isLiked ? colors.complimentary : 'transparent'}
              />
              <Text
                style={[
                  tw`text-xs font-normal`,
                  {
                    color: isLiked ? colors.complimentary : colors.greyText,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                {likeCount}
              </Text>
            </TouchableOpacity>
            <View style={tw`flex-row items-center gap-2`}>
              <MessageCircle size={24} color={colors.greyText} />
              <Text
                style={[
                  tw`text-xs font-normal`,
                  {
                    color: colors.greyText,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                {post.comments}
              </Text>
            </View>
            <TouchableOpacity
              style={tw`flex-row items-center gap-2`}
              onPress={handleShare}
            >
              <Send
                size={24}
                color={isShared ? colors.complimentary : colors.greyText}
              />
              <Text
                style={[
                  tw`text-xs font-normal`,
                  {
                    color: isShared ? colors.complimentary : colors.greyText,
                    fontFamily: 'Satoshi Variable',
                  },
                ]}
              >
                {shareCount}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={handleBookmark}>
            <Bookmark
              size={24}
              color={isBookmarked ? colors.complimentary : colors.greyText}
              fill={isBookmarked ? colors.complimentary : 'transparent'}
            />
          </TouchableOpacity>
        </View>

        {/* Caption */}
        <Text
          style={[
            tw`text-xs font-normal leading-5`,
            {
              color: '#4A5565',
              fontFamily: 'Satoshi Variable',
            },
          ]}
        >
          {post.caption}
        </Text>

        {/* Comment Input */}
        <View style={tw`flex-row items-center gap-3`}>
          <Smile size={20} color={colors.greyText} />
          <View
            style={[
              tw`flex-1 rounded-full h-[40px] px-3 py-[3px]`,
              {
                backgroundColor: '#F9FAFB',
              },
            ]}
          >
            <TextInput
              placeholder="Add a comment..."
              placeholderTextColor={colors.greyText}
              style={[
                tw`text-xs font-normal`,
                {
                  color: colors.black,
                  fontFamily: 'Satoshi Variable',
                },
              ]}
              value={comment}
              onChangeText={onCommentChange}
            />
          </View>
          <Text
            style={[
              tw`text-sm font-normal`,
              {
                color: colors.complimentary,
                fontFamily: 'Satoshi Variable',
              },
            ]}
          >
            Post
          </Text>
        </View>
      </View>
    </View>
  );
}
