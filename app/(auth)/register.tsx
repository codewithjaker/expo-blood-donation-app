import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
// import { useAuth } from '@/context/AuthContext';

// Validation schema
const registerSchema = z
  .object({
    name: z.string().min(1, 'Full name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(1, 'Phone number is required'),
    bloodType: z.string(),
    location: z.string().optional(),
    dateOfBirth: z.string().optional(),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterScreen() {
  const [showPassword, setShowPassword] = useState(false);
  // const { register } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      bloodType: 'A+',
      location: '',
      dateOfBirth: '',
    },
  });

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  const onSubmit = async (data: RegisterFormData) => {
    try {
      // await register({
      //   name: data.name,
      //   email: data.email,
      //   phone: data.phone,
      //   bloodType: data.bloodType,
      //   location: data.location,
      //   dateOfBirth: data.dateOfBirth,
      //   password: data.password,
      // });
    } catch (error) {
      Alert.alert(
        'Registration Failed',
        error instanceof Error ? error.message : 'Something went wrong'
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-gray-50"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        className="flex-grow p-5"
        keyboardShouldPersistTaps="handled"
      >
        <View className="items-center mb-8">
          <Text className="text-3xl font-bold text-gray-800">Create Account</Text>
          <Text className="text-base text-gray-500 mt-2 text-center">
            Join our life-saving community
          </Text>
        </View>

        <View className="bg-white p-5 rounded-xl shadow-md">
          {/* Name */}
          <View className="mb-4">
            <View className="flex-row items-center border border-gray-300 rounded-lg px-4 h-12">
              <Ionicons name="person-outline" size={20} color="#7f8c8d" />
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    className="flex-1 ml-2 text-base"
                    placeholder="Full Name *"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
            </View>
            {errors.name && (
              <Text className="text-red-500 text-xs mt-1">{errors.name.message}</Text>
            )}
          </View>

          {/* Email */}
          <View className="mb-4">
            <View className="flex-row items-center border border-gray-300 rounded-lg px-4 h-12">
              <Ionicons name="mail-outline" size={20} color="#7f8c8d" />
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    className="flex-1 ml-2 text-base"
                    placeholder="Email *"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                )}
              />
            </View>
            {errors.email && (
              <Text className="text-red-500 text-xs mt-1">{errors.email.message}</Text>
            )}
          </View>

          {/* Phone */}
          <View className="mb-4">
            <View className="flex-row items-center border border-gray-300 rounded-lg px-4 h-12">
              <Ionicons name="call-outline" size={20} color="#7f8c8d" />
              <Controller
                control={control}
                name="phone"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    className="flex-1 ml-2 text-base"
                    placeholder="Phone Number *"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    keyboardType="phone-pad"
                  />
                )}
              />
            </View>
            {errors.phone && (
              <Text className="text-red-500 text-xs mt-1">{errors.phone.message}</Text>
            )}
          </View>

          {/* Blood Type Picker */}
          <View className="mb-4">
            <View className="flex-row items-center border border-gray-300 rounded-lg px-4 h-12">
              <Ionicons name="water-outline" size={20} color="#7f8c8d" />
              <Controller
                control={control}
                name="bloodType"
                render={({ field: { onChange, value } }) => (
                  <Picker
                    selectedValue={value}
                    onValueChange={onChange}
                    style={{ flex: 1 }}
                  >
                    {bloodTypes.map((type) => (
                      <Picker.Item key={type} label={type} value={type} />
                    ))}
                  </Picker>
                )}
              />
            </View>
          </View>

          {/* Location */}
          <View className="mb-4">
            <View className="flex-row items-center border border-gray-300 rounded-lg px-4 h-12">
              <Ionicons name="location-outline" size={20} color="#7f8c8d" />
              <Controller
                control={control}
                name="location"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    className="flex-1 ml-2 text-base"
                    placeholder="Location"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
            </View>
          </View>

          {/* Date of Birth */}
          <View className="mb-4">
            <View className="flex-row items-center border border-gray-300 rounded-lg px-4 h-12">
              <Ionicons name="calendar-outline" size={20} color="#7f8c8d" />
              <Controller
                control={control}
                name="dateOfBirth"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    className="flex-1 ml-2 text-base"
                    placeholder="Date of Birth (DD/MM/YYYY)"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
            </View>
          </View>

          {/* Password */}
          <View className="mb-4">
            <View className="flex-row items-center border border-gray-300 rounded-lg px-4 h-12">
              <Ionicons name="lock-closed-outline" size={20} color="#7f8c8d" />
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    className="flex-1 ml-2 text-base"
                    placeholder="Password *"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    secureTextEntry={!showPassword}
                  />
                )}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color="#7f8c8d"
                />
              </TouchableOpacity>
            </View>
            {errors.password && (
              <Text className="text-red-500 text-xs mt-1">{errors.password.message}</Text>
            )}
          </View>

          {/* Confirm Password */}
          <View className="mb-4">
            <View className="flex-row items-center border border-gray-300 rounded-lg px-4 h-12">
              <Ionicons name="lock-closed-outline" size={20} color="#7f8c8d" />
              <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    className="flex-1 ml-2 text-base"
                    placeholder="Confirm Password *"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    secureTextEntry={!showPassword}
                  />
                )}
              />
            </View>
            {errors.confirmPassword && (
              <Text className="text-red-500 text-xs mt-1">
                {errors.confirmPassword.message}
              </Text>
            )}
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            className={`p-4 rounded-lg items-center mt-4 ${
              isSubmitting ? 'bg-gray-400' : 'bg-red-500'
            }`}
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          >
            <Text className="text-white font-bold text-base">
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </Text>
          </TouchableOpacity>

          {/* Login Link */}
          <View className="flex-row justify-center mt-5">
            <Text className="text-gray-500 text-sm">Already have an account? </Text>
            <Link href="/(auth)/login" asChild>
              <TouchableOpacity>
                <Text className="text-red-500 font-bold text-sm">Login</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>

        {/* Terms */}
        <View className="mt-5 p-4">
          <Text className="text-gray-500 text-xs text-center leading-5">
            By creating an account, you agree to our Terms of Service and Privacy Policy
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}