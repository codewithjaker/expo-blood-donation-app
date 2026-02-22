import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HelpScreen() {
  const helpItems = [
    {
      title: 'FAQs',
      icon: 'help-circle',
      description: 'Frequently asked questions',
    },
    {
      title: 'Contact Support',
      icon: 'chatbubbles',
      description: 'Get in touch with our support team',
      action: () => Linking.openURL('mailto:support@blooddonor.app'),
    },
    {
      title: 'Emergency Guide',
      icon: 'warning',
      description: 'What to do in emergencies',
    },
    {
      title: 'Donation Process',
      icon: 'medical',
      description: 'Learn about the donation process',
    },
  ];

  return (
    <ScrollView className="flex-1 bg-gray-100">
      {/* Help & Support Section */}
      <View className="bg-white m-5 rounded-lg overflow-hidden shadow-md">
        <Text className="text-lg font-bold p-5 text-gray-800 border-b border-gray-200">
          Help & Support
        </Text>
        {helpItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            className="flex-row items-center p-4 border-b border-gray-200"
            onPress={item.action}
          >
            <Ionicons name={item.icon} size={24} color="#e74c3c" />
            <View className="flex-1 ml-4">
              <Text className="text-base font-bold text-gray-800 mb-0.5">
                {item.title}
              </Text>
              <Text className="text-sm text-gray-600">
                {item.description}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#bdc3c7" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Emergency Contact Card */}
      <View className="bg-white m-5 p-5 rounded-lg items-center shadow-md">
        <Ionicons name="call" size={32} color="#e74c3c" />
        <Text className="text-lg font-bold text-gray-800 my-2.5">
          Emergency Contact
        </Text>
        <Text className="text-sm text-gray-600 text-center mb-5 leading-5">
          For immediate assistance, call our emergency hotline
        </Text>
        <TouchableOpacity
          className="bg-red-500 px-8 py-3 rounded-full"
          onPress={() => Linking.openURL('tel:106')}
        >
          <Text className="text-white text-base font-bold">Call 106</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}