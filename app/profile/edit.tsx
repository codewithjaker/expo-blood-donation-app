import React from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { useForm, Controller } from "react-hook-form";

import { ChevronLeft, Save } from "lucide-react-native";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  bloodType: string;
  location: string;
  dateOfBirth: string;
  gender: string;
}

export default function EditProfileScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserProfile>({
    defaultValues: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 234 567 8900",
      bloodType: "A+",
      location: "New York, USA",
      dateOfBirth: "1990-05-15",
      gender: "Male",
    },
  });

  const bloodTypes = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
  const genders = ["Male", "Female", "Other", "Prefer not to say"];

  const onSubmit = (data: UserProfile) => {
    Alert.alert("Success", "Profile updated successfully!");
    console.log("Updated profile:", data);
    router.back();
  };

  return (
    <ScrollView className="flex-1 bg-gray-100">
      {/* Header */}
      {/* <View className="flex-row items-center justify-between px-4 py-3 border-b border-[#1A1A1A]">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <ChevronLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-semibold">Edit Profile</Text>
        <TouchableOpacity
          className="p-2 bg-[#4ECDC4]/10 rounded-xl"
          onPress={handleSubmit(onSubmit)}
        >
          <Save size={20} color="#4ECDC4" />
        </TouchableOpacity>
      </View> */}
      <View className="p-5">
        {/* Full Name */}
        <Text className="text-base font-semibold mb-2 text-gray-800">
          Full Name
        </Text>
        <Controller
          control={control}
          rules={{ required: "Full name is required" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="bg-white p-4 rounded-lg mb-1 border border-gray-300"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Enter your full name"
            />
          )}
          name="name"
        />
        {errors.name && (
          <Text className="text-red-500 mb-2">{errors.name.message}</Text>
        )}

        {/* Email */}
        <Text className="text-base font-semibold mb-2 text-gray-800">
          Email
        </Text>
        <Controller
          control={control}
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="bg-white p-4 rounded-lg mb-1 border border-gray-300"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          )}
          name="email"
        />
        {errors.email && (
          <Text className="text-red-500 mb-2">{errors.email.message}</Text>
        )}

        {/* Phone Number */}
        <Text className="text-base font-semibold mb-2 text-gray-800">
          Phone Number
        </Text>
        <Controller
          control={control}
          rules={{ required: "Phone number is required" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="bg-white p-4 rounded-lg mb-1 border border-gray-300"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
            />
          )}
          name="phone"
        />
        {errors.phone && (
          <Text className="text-red-500 mb-2">{errors.phone.message}</Text>
        )}

        {/* Blood Type */}
        <Text className="text-base font-semibold mb-2 text-gray-800">
          Blood Type
        </Text>
        <Controller
          control={control}
          rules={{ required: "Blood type is required" }}
          render={({ field: { onChange, value } }) => (
            <View className="bg-white rounded-lg mb-1 border border-gray-300">
              <Picker
                selectedValue={value}
                onValueChange={onChange}
                style={{ width: "100%" }}
              >
                {bloodTypes.map((type) => (
                  <Picker.Item key={type} label={type} value={type} />
                ))}
              </Picker>
            </View>
          )}
          name="bloodType"
        />
        {errors.bloodType && (
          <Text className="text-red-500 mb-2">{errors.bloodType.message}</Text>
        )}

        {/* Location */}
        <Text className="text-base font-semibold mb-2 text-gray-800">
          Location
        </Text>
        <Controller
          control={control}
          rules={{ required: "Location is required" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="bg-white p-4 rounded-lg mb-1 border border-gray-300"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Enter your location"
            />
          )}
          name="location"
        />
        {errors.location && (
          <Text className="text-red-500 mb-2">{errors.location.message}</Text>
        )}

        {/* Date of Birth */}
        <Text className="text-base font-semibold mb-2 text-gray-800">
          Date of Birth
        </Text>
        <Controller
          control={control}
          rules={{
            required: "Date of birth is required",
            pattern: {
              value: /^\d{4}-\d{2}-\d{2}$/,
              message: "Use format YYYY-MM-DD",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="bg-white p-4 rounded-lg mb-1 border border-gray-300"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="YYYY-MM-DD"
            />
          )}
          name="dateOfBirth"
        />
        {errors.dateOfBirth && (
          <Text className="text-red-500 mb-2">
            {errors.dateOfBirth.message}
          </Text>
        )}

        {/* Gender */}
        <Text className="text-base font-semibold mb-2 text-gray-800">
          Gender
        </Text>
        <Controller
          control={control}
          rules={{ required: "Gender is required" }}
          render={({ field: { onChange, value } }) => (
            <View className="bg-white rounded-lg mb-1 border border-gray-300">
              <Picker
                selectedValue={value}
                onValueChange={onChange}
                style={{ width: "100%" }}
              >
                {genders.map((gender) => (
                  <Picker.Item key={gender} label={gender} value={gender} />
                ))}
              </Picker>
            </View>
          )}
          name="gender"
        />
        {errors.gender && (
          <Text className="text-red-500 mb-2">{errors.gender.message}</Text>
        )}

        {/* Save Button */}
        <TouchableOpacity
          className="bg-red-600 p-5 rounded-lg items-center mb-3"
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="text-white text-base font-bold">Save Changes</Text>
        </TouchableOpacity>

        {/* Cancel Button */}
        <TouchableOpacity
          className="bg-gray-500 p-5 rounded-lg items-center"
          onPress={() => router.back()}
        >
          <Text className="text-white text-base font-bold">Cancel</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
