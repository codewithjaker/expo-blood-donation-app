import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

interface QuickAction {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string; // kept for reference, but we'll use fixed Tailwind classes
  href: string;
}

interface BloodStat {
  type: string;
  count: number;
  color: string; // dynamic background color
}

export default function HomeScreen() {
  const quickActions: QuickAction[] = [
    {
      title: "Donate Blood",
      icon: "water",
      color: "#e74c3c",
      href: "/(tabs)/donate",
    },
    {
      title: "Find Donors",
      icon: "search",
      color: "#3498db",
      href: "/(tabs)/find-donors",
    },
    {
      title: "Request Blood",
      icon: "medkit",
      color: "#2ecc71",
      href: "/(tabs)/request",
    },
  ];

  const bloodStats: BloodStat[] = [
    { type: "A+", count: 45, color: "#e74c3c" },
    { type: "B+", count: 32, color: "#3498db" },
    { type: "O+", count: 67, color: "#2ecc71" },
    { type: "AB+", count: 23, color: "#f39c12" },
  ];

  const handleEmergencyCall = () => {
    Alert.alert("Emergency", "Calling emergency services...", [
      { text: "Cancel", style: "cancel" },
      { text: "Call", style: "default" },
    ]);
  };

  // Map action titles to Tailwind background classes
  const actionBgClass: Record<string, string> = {
    "Donate Blood": "bg-red-500",
    "Find Donors": "bg-blue-500",
    "Request Blood": "bg-green-500",
  };

  return (
    <ScrollView className="flex-1 bg-gray-100">
      {/* Header */}
      <View className="bg-red-500 px-5 pt-16 pb-5">
        <Text className="text-3xl font-bold text-white">BloodDonor</Text>
        <Text className="text-base text-white mt-1">Save Lives, Donate Blood</Text>
      </View>

      {/* Quick Actions */}
      <View className="p-5">
        <Text className="text-xl font-bold text-gray-800 mb-4">Quick Actions</Text>
        <View className="flex-row justify-between">
          {quickActions.map((action, index) => (
            <TouchableOpacity
              key={index}
              className={`flex-1 m-1 p-4 rounded-xl items-center justify-center min-h-[100px] ${actionBgClass[action.title]}`}
            >
              <Ionicons name={action.icon} size={30} color="white" />
              <Text className="text-white font-bold mt-2 text-center">{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Blood Availability */}
      <View className="p-5">
        <Text className="text-xl font-bold text-gray-800 mb-4">Blood Availability</Text>
        <View className="flex-row flex-wrap justify-between">
          {bloodStats.map((blood, index) => (
            <View
              key={index}
              className="w-[48%] bg-white p-4 rounded-xl mb-3 items-center shadow-md"
            >
              <View
                className="w-12 h-12 rounded-full items-center justify-center mb-2"
                style={{ backgroundColor: blood.color }} // dynamic color kept inline
              >
                <Text className="text-white font-bold">{blood.type}</Text>
              </View>
              <Text className="text-sm text-gray-500">{blood.count} donors</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Emergency Contact */}
      <View className="p-5">
        <Text className="text-xl font-bold text-gray-800 mb-4">Emergency Contact</Text>
        <TouchableOpacity
          className="flex-row bg-white p-5 rounded-xl items-center shadow-md"
          onPress={handleEmergencyCall}
        >
          <Ionicons name="call" size={24} color="#e74c3c" />
          <Text className="ml-4 text-base font-bold text-red-500">Call Emergency: 106</Text>
        </TouchableOpacity>
      </View>

      {/* Recent Activities */}
      <View className="p-5">
        <Text className="text-xl font-bold text-gray-800 mb-4">Recent Activities</Text>
        <View className="bg-white p-4 rounded-xl shadow-md">
          <Text className="text-sm mb-2 text-gray-800">🎉 15 donations made today</Text>
          <Text className="text-sm mb-2 text-gray-800">❤️ 8 requests fulfilled this week</Text>
          <Text className="text-sm text-gray-800">⏰ Next blood drive: Tomorrow at City Hospital</Text>
        </View>
      </View>
    </ScrollView>
  );
}