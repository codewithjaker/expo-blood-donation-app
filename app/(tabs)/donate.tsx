import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Switch,
} from "react-native";
// import { Picker } from "@react-native-picker/picker";

import { Picker } from '@react-native-picker/picker'

interface DonorFormData {
  fullName: string;
  bloodType: string;
  phone: string;
  location: string;
  lastDonation: string;
  isAvailable: boolean;
}

export default function DonateScreen() {
  const [formData, setFormData] = useState<DonorFormData>({
    fullName: "",
    bloodType: "A+",
    phone: "",
    location: "",
    lastDonation: "",
    isAvailable: true,
  });

  const bloodTypes = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

  const handleSubmit = () => {
    if (!formData.fullName || !formData.phone || !formData.location) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }

    Alert.alert(
      "Success",
      "Thank you for registering as a blood donor! You will be notified when someone needs your blood type.",
      [{ text: "OK" }]
    );

    console.log(formData);

    setFormData({
      fullName: "",
      bloodType: "A+",
      phone: "",
      location: "",
      lastDonation: "",
      isAvailable: true,
    });
  };

  return (
    <ScrollView className="flex-1 bg-gray-100">
      {/* Header */}
      <View className="bg-red-600 p-5 pt-10">
        <Text className="text-2xl font-bold text-white mb-1">
          Become a Blood Donor
        </Text>
        <Text className="text-sm text-white opacity-90">
          Your donation can save up to 3 lives. Join our community of heroes.
        </Text>
      </View>

      {/* Form */}
      <View className="p-5">
        {/* Full Name */}
        <Text className="text-base font-semibold text-gray-700 mb-2">
          Full Name *
        </Text>
        <TextInput
          className="bg-white p-4 rounded-lg mb-4 border border-gray-300"
          value={formData.fullName}
          onChangeText={(text) => setFormData({ ...formData, fullName: text })}
          placeholder="Enter your full name"
          placeholderTextColor="#9ca3af"
        />

        {/* Blood Type */}
        <Text className="text-base font-semibold text-gray-700 mb-2">
          Blood Type *
        </Text>
        <View className="bg-white rounded-lg mb-4 border border-gray-300">
          <Picker
            selectedValue={formData.bloodType}
            onValueChange={(value) =>
              setFormData({ ...formData, bloodType: value })
            }
          >
            {bloodTypes.map((type) => (
              <Picker.Item key={type} label={type} value={type} />
            ))}
          </Picker>
        </View>

        {/* Phone Number */}
        <Text className="text-base font-semibold text-gray-700 mb-2">
          Phone Number *
        </Text>
        <TextInput
          className="bg-white p-4 rounded-lg mb-4 border border-gray-300"
          value={formData.phone}
          onChangeText={(text) => setFormData({ ...formData, phone: text })}
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
          placeholderTextColor="#9ca3af"
        />

        {/* Location */}
        <Text className="text-base font-semibold text-gray-700 mb-2">
          Location *
        </Text>
        <TextInput
          className="bg-white p-4 rounded-lg mb-4 border border-gray-300"
          value={formData.location}
          onChangeText={(text) => setFormData({ ...formData, location: text })}
          placeholder="Enter your city"
          placeholderTextColor="#9ca3af"
        />

        {/* Last Donation Date */}
        <Text className="text-base font-semibold text-gray-700 mb-2">
          Last Donation Date
        </Text>
        <TextInput
          className="bg-white p-4 rounded-lg mb-4 border border-gray-300"
          value={formData.lastDonation}
          onChangeText={(text) =>
            setFormData({ ...formData, lastDonation: text })
          }
          placeholder="DD/MM/YYYY (optional)"
          placeholderTextColor="#9ca3af"
        />

        {/* Availability Switch */}
        <View className="flex-row justify-between items-center bg-white p-4 rounded-lg mb-5">
          <Text className="text-base font-semibold text-gray-700">
            Available for Donation
          </Text>
          <Switch
            value={formData.isAvailable}
            onValueChange={(value) =>
              setFormData({ ...formData, isAvailable: value })
            }
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={formData.isAvailable ? "#e74c3c" : "#f4f3f4"}
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          className="bg-red-600 p-5 rounded-lg items-center mb-5"
          onPress={handleSubmit}
        >
          <Text className="text-white text-base font-bold">
            Register as Donor
          </Text>
        </TouchableOpacity>

        {/* Eligibility Info Card */}
        <View className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
          <Text className="text-base font-bold text-gray-700 mb-2">
            Donation Eligibility
          </Text>
          <Text className="text-sm text-gray-600 mb-1">
            • Age: 18-65 years
          </Text>
          <Text className="text-sm text-gray-600 mb-1">
            • Weight: At least 50 kg
          </Text>
          <Text className="text-sm text-gray-600 mb-1">
            • Good health condition
          </Text>
          <Text className="text-sm text-gray-600 mb-1">
            • No tattoos in last 6 months
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}