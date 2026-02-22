import React, { useState } from "react";
import { View, Text, ScrollView, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState({
    emergencyAlerts: true,
    donationReminders: true,
    appointmentReminders: true,
    bloodRequestAlerts: true,
    newsUpdates: false,
    achievementAlerts: true,
  });

  const toggleSwitch = (key: keyof typeof notifications) => {
    setNotifications({ ...notifications, [key]: !notifications[key] });
  };

  const NotificationSwitch = ({
    title,
    value,
    onToggle,
  }: {
    title: string;
    value: boolean;
    onToggle: () => void;
  }) => (
    <View className="flex-row justify-between items-center py-3 border-b border-gray-200">
      <Text className="text-base text-gray-800 flex-1">{title}</Text>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={value ? "#e74c3c" : "#f4f3f4"}
      />
    </View>
  );

  return (
    <SafeAreaView>
      <ScrollView className="flex-1 bg-gray-100">
        <View className="bg-white mx-5 my-5 p-5 rounded-lg shadow-md">
          <Text className="text-lg font-bold text-gray-800 mb-5">
            Push Notifications
          </Text>

          <NotificationSwitch
            title="Emergency Blood Requests"
            value={notifications.emergencyAlerts}
            onToggle={() => toggleSwitch("emergencyAlerts")}
          />
          <NotificationSwitch
            title="Donation Reminders"
            value={notifications.donationReminders}
            onToggle={() => toggleSwitch("donationReminders")}
          />
          <NotificationSwitch
            title="Appointment Reminders"
            value={notifications.appointmentReminders}
            onToggle={() => toggleSwitch("appointmentReminders")}
          />
          <NotificationSwitch
            title="Blood Request Alerts"
            value={notifications.bloodRequestAlerts}
            onToggle={() => toggleSwitch("bloodRequestAlerts")}
          />
          <NotificationSwitch
            title="News & Updates"
            value={notifications.newsUpdates}
            onToggle={() => toggleSwitch("newsUpdates")}
          />
          <NotificationSwitch
            title="Achievement Alerts"
            value={notifications.achievementAlerts}
            onToggle={() => toggleSwitch("achievementAlerts")}
          />
        </View>

        <View className="bg-blue-50 mx-5 p-4 rounded-lg border-l-4 border-blue-500">
          <Text className="text-sm text-gray-800 leading-5">
            🔔 Enable notifications to stay updated about emergency blood
            requests and your donation schedule.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
