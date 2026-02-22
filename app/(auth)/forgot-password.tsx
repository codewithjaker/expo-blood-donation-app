import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";

type FormData = {
  email: string;
};

export default function ForgotPasswordScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: FormData) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      Alert.alert(
        "Reset Link Sent",
        "If an account exists with this email, you will receive a password reset link shortly.",
        [{ text: "OK" }],
      );
    } catch (error) {
      Alert.alert("Error", "Failed to send reset link. Please try again.");
    }
  };

  return (
    <ScrollView
      // contentContainerStyle="flex-grow bg-gray-50 p-5 justify-center"
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: "#f8f9fa",
        padding: 20,
        justifyContent: "center",
      }}
    >
      <View className="items-center mb-10">
        <Ionicons name="lock-closed-outline" size={80} color="#e74c3c" />
        <Text className="text-3xl font-bold text-gray-800 mt-5">
          Reset Password
        </Text>
        <Text className="text-base text-gray-500 mt-2.5 text-center leading-6">
          Enter your email address and we'll send you a link to reset your
          password
        </Text>
      </View>

      <View className="bg-white p-5 rounded-xl shadow-md">
        {/* Email Field */}
        <View className="mb-5">
          <View className="flex-row items-center border border-gray-300 rounded-lg px-4 h-12">
            <Ionicons name="mail-outline" size={20} color="#7f8c8d" />
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
                  className="flex-1 ml-2.5 text-base"
                  placeholder="Email Address"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="email"
            />
          </View>
          {errors.email && (
            <Text className="text-red-500 text-sm mt-1 ml-1">
              {errors.email.message}
            </Text>
          )}
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          className={`py-4 rounded-lg items-center ${
            isSubmitting ? "bg-gray-400" : "bg-red-500"
          }`}
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          <Text className="text-white font-bold text-base">
            {isSubmitting ? "Sending..." : "Send Reset Link"}
          </Text>
        </TouchableOpacity>

        {/* Info Box */}
        <View className="mt-5 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
          <Text className="text-blue-500 text-xs text-center leading-4">
            You will receive an email with instructions on how to reset your
            password.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
