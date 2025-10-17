import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { colors } from '@thimblely/shared';
import tw from 'twrnc';
import { Header } from '../../components';
import {
  Plus,
  Folder,
  FileText,
  Calendar,
  Users,
  Settings,
} from 'lucide-react-native';
import { faker } from '@faker-js/faker';

// Generate mock workspace data
const recentProjects = Array.from({ length: 6 }, (_, i) => ({
  id: (i + 1).toString(),
  name: faker.company.buzzPhrase(),
  type: faker.helpers.arrayElement([
    'Sewing Project',
    'Pattern Design',
    'Fabric Collection',
  ]),
  lastModified: faker.date.recent().toLocaleDateString(),
  collaborators: Math.floor(Math.random() * 5) + 1,
  thumbnail: faker.image.urlPicsumPhotos({ width: 80, height: 80 }),
}));

const quickActions = [
  { id: '1', title: 'New Project', icon: Plus, color: colors.complimentary },
  { id: '2', title: 'Upload Pattern', icon: FileText, color: colors.primary },
  {
    id: '3',
    title: 'Create Collection',
    icon: Folder,
    color: colors.complimentaryDark,
  },
  {
    id: '4',
    title: 'Schedule Event',
    icon: Calendar,
    color: colors.primaryLight,
  },
];

export default function WorkspaceScreen() {
  return (
    <View style={tw`flex-1 bg-white`}>
      {/* Status Bar Space */}
      <View style={tw`h-12`} />

      {/* Header */}
      <Header title="My Workspace" rightIcon={Settings} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Quick Actions */}
        <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '700',
              color: colors.black,
              marginBottom: 16,
            }}
          >
            Quick Actions
          </Text>
          <View style={tw`flex-row flex-wrap gap-3`}>
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={{
                  flex: 1,
                  minWidth: '45%',
                  backgroundColor: 'white',
                  borderWidth: 1,
                  borderColor: 'rgba(0,0,0,0.1)',
                  borderRadius: 12,
                  padding: 16,
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: `${action.color}20`,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <action.icon size={20} color={action.color} />
                </View>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '500',
                    color: colors.black,
                    textAlign: 'center',
                  }}
                >
                  {action.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Projects */}
        <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
          <View style={tw`flex-row items-center justify-between mb-4`}>
            <Text
              style={{ fontSize: 16, fontWeight: '700', color: colors.black }}
            >
              Recent Projects
            </Text>
            <TouchableOpacity>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '400',
                  color: colors.complimentary,
                }}
              >
                View All
              </Text>
            </TouchableOpacity>
          </View>

          <View style={tw`gap-3`}>
            {recentProjects.map((project) => (
              <TouchableOpacity
                key={project.id}
                style={{
                  backgroundColor: 'white',
                  borderWidth: 1,
                  borderColor: 'rgba(0,0,0,0.05)',
                  borderRadius: 12,
                  padding: 16,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                <Image
                  source={{ uri: project.thumbnail }}
                  style={{ width: 60, height: 60, borderRadius: 8 }}
                  resizeMode="cover"
                />
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '600',
                      color: colors.black,
                      marginBottom: 4,
                    }}
                    numberOfLines={1}
                  >
                    {project.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '400',
                      color: colors.greyText,
                      marginBottom: 8,
                    }}
                  >
                    {project.type}
                  </Text>
                  <View style={tw`flex-row items-center gap-4`}>
                    <View style={tw`flex-row items-center gap-1`}>
                      <Calendar size={12} color={colors.greyText} />
                      <Text
                        style={{
                          fontSize: 10,
                          fontWeight: '400',
                          color: colors.greyText,
                        }}
                      >
                        {project.lastModified}
                      </Text>
                    </View>
                    <View style={tw`flex-row items-center gap-1`}>
                      <Users size={12} color={colors.greyText} />
                      <Text
                        style={{
                          fontSize: 10,
                          fontWeight: '400',
                          color: colors.greyText,
                        }}
                      >
                        {project.collaborators} collaborators
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Storage Usage */}
        <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '700',
              color: colors.black,
              marginBottom: 16,
            }}
          >
            Storage Usage
          </Text>
          <View
            style={{
              backgroundColor: 'white',
              borderWidth: 1,
              borderColor: 'rgba(0,0,0,0.05)',
              borderRadius: 12,
              padding: 16,
            }}
          >
            <View style={tw`flex-row items-center justify-between mb-3`}>
              <Text
                style={{ fontSize: 14, fontWeight: '500', color: colors.black }}
              >
                Used: 2.4 GB of 10 GB
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '400',
                  color: colors.greyText,
                }}
              >
                24%
              </Text>
            </View>
            <View
              style={{
                height: 8,
                backgroundColor: 'rgba(0,0,0,0.1)',
                borderRadius: 4,
                overflow: 'hidden',
              }}
            >
              <View
                style={{
                  height: '100%',
                  width: '24%',
                  backgroundColor: colors.complimentary,
                  borderRadius: 4,
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
