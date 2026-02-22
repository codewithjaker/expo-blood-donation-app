import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Donation {
  id: string;
  date: string;
  location: string;
  bloodType: string;
  volume: string;
  status: 'completed' | 'scheduled' | 'cancelled';
}

export default function DonationHistoryScreen() {
  const donations: Donation[] = [
    {
      id: '1',
      date: '2024-01-15',
      location: 'City Blood Bank',
      bloodType: 'A+',
      volume: '450ml',
      status: 'completed',
    },
    {
      id: '2',
      date: '2023-11-20',
      location: 'Community Hospital',
      bloodType: 'A+',
      volume: '450ml',
      status: 'completed',
    },
    {
      id: '3',
      date: '2023-09-05',
      location: 'Mobile Blood Drive',
      bloodType: 'A+',
      volume: '450ml',
      status: 'completed',
    },
    {
      id: '4',
      date: '2024-03-20',
      location: 'Regional Medical Center',
      bloodType: 'A+',
      volume: '450ml',
      status: 'scheduled',
    },
  ];

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'scheduled':
        return 'bg-blue-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-100">
      {/* Header stats */}
      <View className="flex-row p-5 gap-2">
        <View className="flex-1 bg-white p-4 rounded-lg shadow items-center">
          <Text className="text-sm text-gray-500 mb-1">Total Donations</Text>
          <Text className="text-2xl font-bold text-red-500">3</Text>
        </View>
        <View className="flex-1 bg-white p-4 rounded-lg shadow items-center">
          <Text className="text-sm text-gray-500 mb-1">Last Donation</Text>
          <Text className="text-2xl font-bold text-red-500">2 months ago</Text>
        </View>
      </View>

      {/* Donation history list */}
      <View className="p-5">
        <Text className="text-xl font-bold mb-4 text-gray-800">Donation History</Text>
        {donations.map((donation) => (
          <View key={donation.id} className="bg-white p-4 rounded-lg mb-4 shadow">
            <View className="flex-row items-center mb-2">
              <View className="bg-red-500 w-10 h-10 rounded-full items-center justify-center mr-2">
                <Text className="text-white font-bold text-sm">{donation.bloodType}</Text>
              </View>
              <Text className="flex-1 text-base font-semibold text-gray-800">{donation.date}</Text>
              <View className={`px-2 py-1 rounded-full ${getStatusBadgeClass(donation.status)}`}>
                <Text className="text-white text-xs font-semibold">{donation.status}</Text>
              </View>
            </View>

            <View className="mb-2">
              <View className="flex-row items-center mb-1">
                <Ionicons name="location" size={16} className="text-gray-500" />
                <Text className="ml-2 text-sm text-gray-500">{donation.location}</Text>
              </View>
              <View className="flex-row items-center mb-1">
                <Ionicons name="water" size={16} className="text-gray-500" />
                <Text className="ml-2 text-sm text-gray-500">{donation.volume}</Text>
              </View>
            </View>

            {donation.status === 'scheduled' && (
              <TouchableOpacity className="border border-blue-500 p-2 rounded items-center">
                <Text className="text-blue-500 text-sm font-semibold">Reschedule</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>

      {/* Next eligible donation */}
      <View className="flex-row items-center bg-white m-5 p-4 rounded-lg shadow">
        <Ionicons name="calendar" size={24} className="text-red-500" />
        <View className="flex-1 ml-4">
          <Text className="text-sm text-gray-500 mb-1">Next Eligible Donation</Text>
          <Text className="text-base font-bold text-gray-800">March 15, 2024</Text>
        </View>
        <TouchableOpacity className="bg-red-500 px-4 py-2 rounded-full">
          <Text className="text-white font-bold text-xs">Schedule</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}