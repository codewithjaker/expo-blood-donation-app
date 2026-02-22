import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Donor {
  id: string;
  name: string;
  bloodType: string;
  location: string;
  lastDonation: string;
  availability: string;
  distance: string;
}

export default function FindDonorsScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBloodType, setSelectedBloodType] = useState("");

  const bloodTypes = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

  const donors: Donor[] = [
    {
      id: "1",
      name: "John Smith",
      bloodType: "A+",
      location: "Downtown",
      lastDonation: "2 months ago",
      availability: "Available",
      distance: "2.3 km",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      bloodType: "O+",
      location: "North Park",
      lastDonation: "1 month ago",
      availability: "Available",
      distance: "3.1 km",
    },
    {
      id: "3",
      name: "Mike Chen",
      bloodType: "B+",
      location: "East Side",
      lastDonation: "2 weeks ago",
      availability: "Not Available",
      distance: "5.2 km",
    },
    {
      id: "4",
      name: "Emily Davis",
      bloodType: "AB+",
      location: "West End",
      lastDonation: "3 months ago",
      availability: "Available",
      distance: "4.7 km",
    },
  ];

  const filteredDonors = donors.filter((donor) => {
    const matchesSearch =
      donor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donor.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBloodType =
      !selectedBloodType || donor.bloodType === selectedBloodType;
    return matchesSearch && matchesBloodType;
  });

  const renderDonorItem = ({ item }: { item: Donor }) => (
    <View className="bg-white p-4 rounded-xl mb-4 shadow-md">
      {/* Header: blood badge, name, availability */}
      <View className="flex-row items-center mb-3">
        <View className="bg-red-500 w-10 h-10 rounded-full items-center justify-center mr-3">
          <Text className="text-white font-bold text-sm">{item.bloodType}</Text>
        </View>
        <Text className="flex-1 text-gray-800 font-bold text-base">{item.name}</Text>
        <View
          className={`px-3 py-1.5 rounded-full ${
            item.availability === "Available" ? "bg-green-500" : "bg-gray-400"
          }`}
        >
          <Text className="text-white text-xs font-semibold">{item.availability}</Text>
        </View>
      </View>

      {/* Details */}
      <View className="mb-4">
        <View className="flex-row items-center mb-1.5">
          <Ionicons name="location" size={16} color="#6b7280" />
          <Text className="ml-2 text-gray-500 text-sm">{item.location}</Text>
        </View>
        <View className="flex-row items-center mb-1.5">
          <Ionicons name="time" size={16} color="#6b7280" />
          <Text className="ml-2 text-gray-500 text-sm">Last donation: {item.lastDonation}</Text>
        </View>
        <View className="flex-row items-center mb-1.5">
          <Ionicons name="navigate" size={16} color="#6b7280" />
          <Text className="ml-2 text-gray-500 text-sm">{item.distance} away</Text>
        </View>
      </View>

      {/* Contact button */}
      <TouchableOpacity
        className={`py-3 rounded-lg items-center ${
          item.availability === "Available" ? "bg-red-500" : "bg-gray-300"
        }`}
        disabled={item.availability !== "Available"}
      >
        <Text className="text-white font-bold text-sm">
          {item.availability === "Available" ? "Contact Donor" : "Not Available"}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-100 p-5">
      {/* Search Bar */}
      <View className="flex-row items-center bg-white p-4 rounded-lg mb-4 shadow-sm">
        <Ionicons name="search" size={20} color="#6b7280" />
        <TextInput
          className="flex-1 ml-2 text-base"
          placeholder="Search by name or location..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Blood Type Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mb-5"
      >
        {bloodTypes.map((type) => (
          <TouchableOpacity
            key={type}
            className={`px-5 py-2.5 bg-white rounded-full mr-2.5 border ${
              selectedBloodType === type
                ? "bg-red-500 border-red-500"
                : "border-gray-300"
            }`}
            onPress={() =>
              setSelectedBloodType(selectedBloodType === type ? "" : type)
            }
          >
            <Text
              className={`font-semibold ${
                selectedBloodType === type ? "text-white" : "text-gray-700"
              }`}
            >
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Results Header */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-gray-800 font-bold text-lg">
          {filteredDonors.length} Donors Found
        </Text>
        <TouchableOpacity>
          <Text className="text-red-500 font-semibold">Filter</Text>
        </TouchableOpacity>
      </View>

      {/* Donors List */}
      <FlatList
        data={filteredDonors}
        renderItem={renderDonorItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}