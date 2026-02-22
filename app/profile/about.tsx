import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AboutScreen() {
  return (
    <ScrollView className="flex-1 bg-gray-100">
      <View className="bg-white p-10 items-center">
        <Ionicons name="water" size={80} color="#e74c3c" />
        <Text className="text-3xl font-bold text-gray-800 mt-2">BloodDonor</Text>
        <Text className="text-base text-gray-500 mt-1">Version 1.0.0</Text>
      </View>

      <View className="bg-white mx-5 my-5 p-5 rounded-lg shadow-md">
        <Text className="text-lg font-bold text-gray-800 mb-4">About BloodDonor</Text>
        <Text className="text-sm text-gray-500 leading-5">
          BloodDonor is a community-driven platform that connects blood donors with 
          those in need. Our mission is to make blood donation accessible, safe, 
          and efficient for everyone.
        </Text>
      </View>

      <View className="bg-white mx-5 my-5 p-5 rounded-lg shadow-md">
        <Text className="text-lg font-bold text-gray-800 mb-4">Our Impact</Text>
        <View className="flex-row justify-between">
          <View className="items-center flex-1">
            <Text className="text-lg font-bold text-red-600 mb-1">10,000+</Text>
            <Text className="text-xs text-gray-500 text-center">Donors</Text>
          </View>
          <View className="items-center flex-1">
            <Text className="text-lg font-bold text-red-600 mb-1">50,000+</Text>
            <Text className="text-xs text-gray-500 text-center">Lives Saved</Text>
          </View>
          <View className="items-center flex-1">
            <Text className="text-lg font-bold text-red-600 mb-1">100+</Text>
            <Text className="text-xs text-gray-500 text-center">Cities</Text>
          </View>
        </View>
      </View>

      <View className="bg-white mx-5 my-5 p-5 rounded-lg shadow-md">
        <Text className="text-lg font-bold text-gray-800 mb-4">Contact Us</Text>
        <Text className="text-sm text-gray-500 leading-6">
          📧 Email: support@blooddonor.app{'\n'}
          📞 Phone: +1 (555) 123-4567{'\n'}
          🌐 Website: www.blooddonor.app
        </Text>
      </View>

      <View className="items-center p-5">
        <Text className="text-xs text-gray-400 text-center leading-4">
          © 2024 BloodDonor App.{'\n'}
          All rights reserved.
        </Text>
      </View>
    </ScrollView>
  );
}