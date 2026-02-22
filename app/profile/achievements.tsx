import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  unlocked: boolean;
  progress?: number;
  target?: number;
}

export default function AchievementsScreen() {
  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'First Donation',
      description: 'Complete your first blood donation',
      icon: 'trophy',
      color: '#f39c12',
      unlocked: true,
    },
    {
      id: '2',
      title: 'Life Saver',
      description: 'Donate blood 5 times',
      icon: 'heart',
      color: '#e74c3c',
      unlocked: true,
      progress: 5,
      target: 5,
    },
    {
      id: '3',
      title: 'Hero',
      description: 'Donate blood 10 times',
      icon: 'star',
      color: '#3498db',
      unlocked: false,
      progress: 5,
      target: 10,
    },
    {
      id: '4',
      title: 'Regular Donor',
      description: 'Donate 3 times in 6 months',
      icon: 'calendar',
      color: '#2ecc71',
      unlocked: true,
    },
    {
      id: '5',
      title: 'Emergency Responder',
      description: 'Respond to 3 emergency requests',
      icon: 'warning',
      color: '#e67e22',
      unlocked: false,
      progress: 1,
      target: 3,
    },
    {
      id: '6',
      title: 'Community Champion',
      description: 'Donate at 3 different locations',
      icon: 'location',
      color: '#9b59b6',
      unlocked: false,
      progress: 2,
      target: 3,
    },
  ];

  return (
    <ScrollView className="flex-1 bg-gray-100">
      <View className="flex-row p-5 gap-2.5">
        <View className="flex-1 bg-white p-5 rounded-lg items-center shadow-md">
          <Ionicons name="trophy" size={32} color="#f39c12" />
          <Text className="text-2xl font-bold text-red-600 my-1">3</Text>
          <Text className="text-xs text-gray-500 text-center">
            Achievements Unlocked
          </Text>
        </View>
        <View className="flex-1 bg-white p-5 rounded-lg items-center shadow-md">
          <Ionicons name="flame" size={32} color="#e74c3c" />
          <Text className="text-2xl font-bold text-red-600 my-1">15</Text>
          <Text className="text-xs text-gray-500 text-center">
            Lives Impacted
          </Text>
        </View>
      </View>

      <View className="p-5">
        <Text className="text-xl font-bold mb-4 text-gray-800">
          Your Achievements
        </Text>
        {achievements.map((achievement) => (
          <View
            key={achievement.id}
            className={`flex-row items-center bg-white p-4 rounded-lg mb-4 shadow-md ${
              achievement.unlocked ? '' : 'opacity-60'
            }`}
          >
            <View
              className="w-12 h-12 rounded-full items-center justify-center mr-4"
              style={{ backgroundColor: achievement.color }}
            >
              <Ionicons name={achievement.icon} size={24} color="white" />
            </View>
            <View className="flex-1">
              <Text className="text-base font-bold text-gray-800 mb-1">
                {achievement.title}
              </Text>
              <Text className="text-sm text-gray-500 mb-2">
                {achievement.description}
              </Text>
              {achievement.progress && achievement.target && (
                <View className="flex-row items-center">
                  <View className="flex-1 h-1.5 bg-gray-200 rounded-full mr-2.5 overflow-hidden">
                    <View
                      className="h-full bg-green-500 rounded-full"
                      style={{
                        width: `${(achievement.progress / achievement.target) * 100}%`,
                      }}
                    />
                  </View>
                  <Text className="text-xs text-gray-500 min-w-[40px]">
                    {achievement.progress}/{achievement.target}
                  </Text>
                </View>
              )}
            </View>
            {achievement.unlocked ? (
              <Ionicons name="checkmark-circle" size={24} color="#2ecc71" />
            ) : (
              <Ionicons name="lock-closed" size={24} color="#bdc3c7" />
            )}
          </View>
        ))}
      </View>

      <View className="bg-white m-5 p-5 rounded-lg items-center shadow-md">
        <Ionicons name="ribbon" size={40} color="#e74c3c" />
        <Text className="text-lg font-bold text-gray-800 my-2">Keep Going!</Text>
        <Text className="text-sm text-gray-500 text-center leading-5">
          Every donation counts. You're making a real difference in people's lives.
        </Text>
      </View>
    </ScrollView>
  );
}