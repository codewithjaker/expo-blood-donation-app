import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  bloodType: string;
  location: string;
  donations: number;
  lastDonation: string;
  memberSince: string;
}

interface MenuItem {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  href: string;
}

export default function ProfileScreen() {
  const userProfile: UserProfile = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    bloodType: 'A+',
    location: 'New York, USA',
    donations: 5,
    lastDonation: '2024-01-15',
    memberSince: '2023-01-01',
  };

  const menuItems: MenuItem[] = [
    {
      title: 'Edit Profile',
      icon: 'person',
      color: '#3498db',
      href: '/profile/edit',
    },
    {
      title: 'Donation History',
      icon: 'time',
      color: '#2ecc71',
      href: '/profile/history',
    },
    {
      title: 'Achievements',
      icon: 'trophy',
      color: '#f39c12',
      href: '/profile/achievements',
    },
    {
      title: 'Medical Info',
      icon: 'medkit',
      color: '#e74c3c',
      href: '/profile/medical',
    },
    {
      title: 'Notifications',
      icon: 'notifications',
      color: '#9b59b6',
      href: '/profile/notifications',
    },
    {
      title: 'Settings',
      icon: 'settings',
      color: '#34495e',
      href: '/profile/settings',
    },
    {
      title: 'Help & Support',
      icon: 'help-circle',
      color: '#e67e22',
      href: '/profile/help',
    },
    {
      title: 'About',
      icon: 'information',
      color: '#1abc9c',
      href: '/profile/about',
    },
  ];

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive' },
      ]
    );
  };

  return (
    <ScrollView className="flex-1 bg-gray-100">
      {/* Profile Header */}
      <View className="bg-white px-5 pt-10 pb-5 items-center">
        <View className="relative mb-4">
          <Image
            className="w-24 h-24 rounded-full"
            source={{ uri: 'https://via.placeholder.com/100' }}
          />
          <View className="absolute bottom-0 right-0 bg-red-500 w-7 h-7 rounded-full items-center justify-center border-2 border-white">
            <Text className="text-white font-bold text-xs">{userProfile.bloodType}</Text>
          </View>
        </View>
        <Text className="text-2xl font-bold text-gray-800 mb-1">{userProfile.name}</Text>
        <Text className="text-base text-gray-500 mb-1">{userProfile.email}</Text>
        <Text className="text-sm text-gray-400 mb-4">{userProfile.location}</Text>
        
        <TouchableOpacity className="bg-blue-500 px-5 py-2 rounded-full">
          <Link href="/profile/edit" asChild>
            <Text className="text-white text-sm font-semibold">Edit Profile</Text>
          </Link>
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View className="flex-row bg-white mx-5 my-5 rounded-lg p-5 shadow-md">
        <View className="flex-1 items-center">
          <Text className="text-2xl font-bold text-red-500 mb-1">{userProfile.donations}</Text>
          <Text className="text-xs text-gray-500">Donations</Text>
        </View>
        <View className="w-px bg-gray-200" />
        <View className="flex-1 items-center">
          <Text className="text-2xl font-bold text-red-500 mb-1">15</Text>
          <Text className="text-xs text-gray-500">Lives Saved</Text>
        </View>
        <View className="w-px bg-gray-200" />
        <View className="flex-1 items-center">
          <Text className="text-2xl font-bold text-red-500 mb-1">2</Text>
          <Text className="text-xs text-gray-500">Requests</Text>
        </View>
      </View>

      {/* Next Donation */}
      <View className="flex-row items-center bg-white mx-5 p-4 rounded-lg shadow-md">
        <Ionicons name="calendar" size={24} color="#e74c3c" />
        <View className="flex-1 ml-4">
          <Text className="text-sm text-gray-500 mb-0.5">Next Available Donation</Text>
          <Text className="text-base font-bold text-gray-800">March 15, 2024</Text>
        </View>
        <TouchableOpacity className="bg-red-500 px-4 py-2 rounded-full">
          <Text className="text-white font-bold text-xs">Schedule</Text>
        </TouchableOpacity>
      </View>

      {/* Menu Items */}
      <View className="bg-white mx-5 my-5 rounded-lg overflow-hidden shadow-md">
        {menuItems.map((item, index) => (
          <Link key={index} href={item.href} asChild>
            <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-200 last:border-b-0">
              <View className="w-10 h-10 rounded-full items-center justify-center mr-4" style={{ backgroundColor: item.color }}>
                <Ionicons name={item.icon} size={20} color="white" />
              </View>
              <Text className="flex-1 text-base text-gray-800">{item.title}</Text>
              <Ionicons name="chevron-forward" size={20} color="#bdc3c7" />
            </TouchableOpacity>
          </Link>
        ))}
      </View>

      {/* Logout Button */}
      <TouchableOpacity className="flex-row items-center justify-center bg-white mx-5 mb-5 p-4 rounded-lg shadow-md" onPress={handleLogout}>
        <Ionicons name="log-out" size={20} color="#e74c3c" />
        <Text className="ml-2 text-red-500 font-bold text-base">Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}