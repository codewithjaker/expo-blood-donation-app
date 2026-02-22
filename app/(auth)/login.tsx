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
import { Link, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/context/AuthContext';

// Validation schema
const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  // const { login } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      // await login(data.email, data.password);
    } catch (error) {
      Alert.alert(
        'Login Failed',
        error instanceof Error ? error.message : 'Something went wrong'
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        className="bg-gray-100"
      >
        <View className="px-5 py-8">
          {/* Header */}
          <View className="items-center mb-10">
            <Ionicons name="water" size={80} color="#e74c3c" />
            <Text className="text-3xl font-bold text-gray-800 mt-5">
              BloodDonor
            </Text>
            <Text className="text-base text-gray-500 mt-2">Welcome back</Text>
          </View>

          {/* Form Card */}
          <View className="bg-white rounded-2xl p-5 shadow-md">
            {/* Email Field */}
            <View className="mb-4">
              <View className="flex-row items-center border border-gray-300 rounded-lg px-4 h-12">
                <Ionicons name="mail-outline" size={20} color="#7f8c8d" />
                <Controller
                  control={control}
                  name="email"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      className="flex-1 ml-2 text-base"
                      placeholder="Email"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                />
              </View>
              {errors.email && (
                <Text className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </Text>
              )}
            </View>

            {/* Password Field */}
            <View className="mb-4">
              <View className="flex-row items-center border border-gray-300 rounded-lg px-4 h-12">
                <Ionicons name="lock-closed-outline" size={20} color="#7f8c8d" />
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      className="flex-1 ml-2 text-base"
                      placeholder="Password"
                      secureTextEntry={!showPassword}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
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
                <Text className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </Text>
              )}
            </View>

            {/* Login Button */}
            <TouchableOpacity
              className={`py-3.5 rounded-lg items-center mt-2 ${
                isSubmitting ? 'bg-gray-400' : 'bg-red-500'
              }`}
              onPress={handleSubmit(onSubmit)}
              disabled={isSubmitting}
            >
              <Text className="text-white font-semibold text-base">
                {isSubmitting ? 'Logging in...' : 'Login'}
              </Text>
            </TouchableOpacity>

            {/* Footer Links */}
            <View className="mt-5 items-center">
              <Link href="/(auth)/forgot-password" asChild>
                <TouchableOpacity>
                  <Text className="text-red-500 text-sm font-medium">
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              </Link>

              <View className="flex-row mt-4">
                <Text className="text-gray-500 text-sm">
                  Don't have an account?{' '}
                </Text>
                <Link href="/(auth)/register" asChild>
                  <TouchableOpacity>
                    <Text className="text-red-500 text-sm font-bold">
                      Sign Up
                    </Text>
                  </TouchableOpacity>
                </Link>
              </View>
            </View>
          </View>

          {/* Demo Info */}
          <View className="mt-8 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
            <Text className="text-blue-500 text-xs text-center">
              Demo: Use any email and password to login
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}