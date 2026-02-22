import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen() {
  const settingsOptions = [
    {
      title: 'Privacy & Security',
      icon: 'lock-closed',
      color: '#3498db',
      onPress: () => Alert.alert('Privacy', 'Privacy settings'),
    },
    {
      title: 'Language',
      icon: 'language',
      color: '#2ecc71',
      onPress: () => Alert.alert('Language', 'Language settings'),
    },
    {
      title: 'Appearance',
      icon: 'color-palette',
      color: '#9b59b6',
      onPress: () => Alert.alert('Appearance', 'Appearance settings'),
    },
    {
      title: 'Data Usage',
      icon: 'cellular',
      color: '#f39c12',
      onPress: () => Alert.alert('Data', 'Data usage settings'),
    },
    {
      title: 'Clear Cache',
      icon: 'trash',
      color: '#e74c3c',
      onPress: () => Alert.alert('Cache', 'Clear cache'),
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>General Settings</Text>
        {settingsOptions.map((item, index) => (
          <TouchableOpacity key={index} style={styles.settingItem} onPress={item.onPress}>
            <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
              <Ionicons name={item.icon} size={20} color="white" />
            </View>
            <Text style={styles.settingText}>{item.title}</Text>
            <Ionicons name="chevron-forward" size={20} color="#bdc3c7" />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <TouchableOpacity style={styles.dangerButton}>
          <Ionicons name="warning" size={20} color="#e74c3c" />
          <Text style={styles.dangerButtonText}>Delete Account</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.versionCard}>
        <Text style={styles.versionText}>BloodDonor App</Text>
        <Text style={styles.versionNumber}>Version 1.0.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  section: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    color: '#2c3e50',
  },
  dangerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffeaea',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e74c3c',
  },
  dangerButtonText: {
    marginLeft: 10,
    color: '#e74c3c',
    fontSize: 16,
    fontWeight: '600',
  },
  versionCard: {
    alignItems: 'center',
    padding: 20,
  },
  versionText: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 5,
  },
  versionNumber: {
    fontSize: 14,
    color: '#bdc3c7',
  },
});