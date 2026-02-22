import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Switch,
  TouchableOpacity,
  Alert,
  TextInput,
 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

// Define the medical information interface
interface MedicalInfo {
  height: string;
  weight: string;
  hasChronicIllness: boolean;
  chronicIllnessDetails: string;
  hasInfectiousDisease: boolean;
  infectiousDiseaseDetails: string;
  hasSurgery: boolean;
  surgeryDetails: string;
  hasMedication: boolean;
  medicationDetails: string;
  hasAllergies: boolean;
  allergiesDetails: string;
  lastMedicalCheckup: string;
}

export default function MedicalInfoScreen() {
  const [medicalInfo, setMedicalInfo] = useState<MedicalInfo>({
    height: '175 cm',
    weight: '70 kg',
    hasChronicIllness: false,
    chronicIllnessDetails: '',
    hasInfectiousDisease: false,
    infectiousDiseaseDetails: '',
    hasSurgery: false,
    surgeryDetails: '',
    hasMedication: false,
    medicationDetails: '',
    hasAllergies: true,
    allergiesDetails: 'Penicillin, Pollen',
    lastMedicalCheckup: '2024-01-10',
  });

  const toggleSwitch = (key: keyof MedicalInfo) => {
    setMedicalInfo({ ...medicalInfo, [key]: !medicalInfo[key] });
  };

  const handleSave = () => {
    Alert.alert('Success', 'Medical information updated successfully!');
  };

  // Reusable switch component with conditional details input
  const MedicalSwitch = ({
    title,
    value,
    onToggle,
    details,
    onDetailsChange,
  }: {
    title: string;
    value: boolean;
    onToggle: () => void;
    details?: string;
    onDetailsChange?: (text: string) => void;
  }) => (
    <View className="mb-4 pb-4 border-b border-gray-200">
      <View className="flex-row justify-between items-center">
        <Text className="text-base text-gray-800 flex-1">{title}</Text>
        <Switch
          value={value}
          onValueChange={onToggle}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={value ? '#e74c3c' : '#f4f3f4'}
        />
      </View>
      {value && onDetailsChange && (
        <TextInput
          className="bg-gray-100 p-3 rounded-lg border border-gray-300 mt-2.5 min-h-[60px] text-top"
          value={details}
          onChangeText={onDetailsChange}
          placeholder={`Please specify ${title.toLowerCase()}...`}
          multiline
          textAlignVertical="top"
        />
      )}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="flex-1">
        {/* Basic Information Section */}
        <View className="bg-white mx-5 my-5 p-5 rounded-lg shadow-md">
          <Text className="text-lg font-bold text-gray-800 mb-4">
            Basic Information
          </Text>

          <View className="flex-row gap-2.5 mb-4">
            <View className="flex-1">
              <Text className="text-sm font-semibold mb-2 text-gray-800">
                Height
              </Text>
              <TextInput
                className="bg-gray-100 p-3 rounded-lg border border-gray-300"
                value={medicalInfo.height}
                onChangeText={(text) =>
                  setMedicalInfo({ ...medicalInfo, height: text })
                }
                placeholder="Height"
              />
            </View>
            <View className="flex-1">
              <Text className="text-sm font-semibold mb-2 text-gray-800">
                Weight
              </Text>
              <TextInput
                className="bg-gray-100 p-3 rounded-lg border border-gray-300"
                value={medicalInfo.weight}
                onChangeText={(text) =>
                  setMedicalInfo({ ...medicalInfo, weight: text })
                }
                placeholder="Weight"
              />
            </View>
          </View>

          <Text className="text-sm font-semibold mb-2 text-gray-800">
            Last Medical Checkup
          </Text>
          <TextInput
            className="bg-gray-100 p-3 rounded-lg border border-gray-300"
            value={medicalInfo.lastMedicalCheckup}
            onChangeText={(text) =>
              setMedicalInfo({ ...medicalInfo, lastMedicalCheckup: text })
            }
            placeholder="YYYY-MM-DD"
          />
        </View>

        {/* Medical History Section */}
        <View className="bg-white mx-5 my-5 p-5 rounded-lg shadow-md">
          <Text className="text-lg font-bold text-gray-800 mb-4">
            Medical History
          </Text>

          <MedicalSwitch
            title="Chronic Illness"
            value={medicalInfo.hasChronicIllness}
            onToggle={() => toggleSwitch('hasChronicIllness')}
            details={medicalInfo.chronicIllnessDetails}
            onDetailsChange={(text) =>
              setMedicalInfo({ ...medicalInfo, chronicIllnessDetails: text })
            }
          />

          <MedicalSwitch
            title="Infectious Disease"
            value={medicalInfo.hasInfectiousDisease}
            onToggle={() => toggleSwitch('hasInfectiousDisease')}
            details={medicalInfo.infectiousDiseaseDetails}
            onDetailsChange={(text) =>
              setMedicalInfo({ ...medicalInfo, infectiousDiseaseDetails: text })
            }
          />

          <MedicalSwitch
            title="Major Surgery"
            value={medicalInfo.hasSurgery}
            onToggle={() => toggleSwitch('hasSurgery')}
            details={medicalInfo.surgeryDetails}
            onDetailsChange={(text) =>
              setMedicalInfo({ ...medicalInfo, surgeryDetails: text })
            }
          />

          <MedicalSwitch
            title="Regular Medication"
            value={medicalInfo.hasMedication}
            onToggle={() => toggleSwitch('hasMedication')}
            details={medicalInfo.medicationDetails}
            onDetailsChange={(text) =>
              setMedicalInfo({ ...medicalInfo, medicationDetails: text })
            }
          />

          <MedicalSwitch
            title="Allergies"
            value={medicalInfo.hasAllergies}
            onToggle={() => toggleSwitch('hasAllergies')}
            details={medicalInfo.allergiesDetails}
            onDetailsChange={(text) =>
              setMedicalInfo({ ...medicalInfo, allergiesDetails: text })
            }
          />
        </View>

        {/* Eligibility Card */}
        <View className="flex-row items-center bg-green-100 mx-5 p-4 rounded-lg border-l-4 border-green-500">
          <Ionicons name="medkit" size={24} color="#2ecc71" />
          <View className="flex-1 ml-4">
            <Text className="text-base font-bold text-green-600 mb-1">
              Eligibility Status
            </Text>
            <Text className="text-sm text-green-600">
              You are eligible to donate blood
            </Text>
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity
          className="bg-red-500 mx-5 p-4 rounded-lg items-center"
          onPress={handleSave}
        >
          <Text className="text-white text-base font-bold">
            Save Medical Information
          </Text>
        </TouchableOpacity>

        {/* Note Card */}
        <View className="bg-yellow-100 mx-5 my-5 p-4 rounded-lg border-l-4 border-yellow-500">
          <Text className="text-base font-bold text-yellow-800 mb-1">
            Important Note
          </Text>
          <Text className="text-sm text-yellow-800 leading-5">
            This information helps ensure the safety of both donors and
            recipients. All medical information is kept confidential and secure.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}