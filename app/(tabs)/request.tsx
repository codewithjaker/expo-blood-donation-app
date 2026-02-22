import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

interface RequestFormData {
  patientName: string;
  bloodType: string;
  units: string;
  hospital: string;
  location: string;
  urgency: string;
  contact: string;
  additionalInfo: string;
}

export default function RequestScreen() {
  const [requestData, setRequestData] = useState<RequestFormData>({
    patientName: "",
    bloodType: "A+",
    units: "1",
    hospital: "",
    location: "",
    urgency: "Normal",
    contact: "",
    additionalInfo: "",
  });

  const bloodTypes = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
  const urgencyLevels = ["Normal", "Urgent", "Critical"];

  const handleSubmit = () => {
    if (
      !requestData.patientName ||
      !requestData.hospital ||
      !requestData.contact
    ) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }

    Alert.alert(
      "Request Submitted",
      "Your blood request has been submitted. Donors will be notified immediately.",
      [{ text: "OK" }]
    );

    console.log(requestData);

    setRequestData({
      patientName: "",
      bloodType: "A+",
      units: "1",
      hospital: "",
      location: "",
      urgency: "Normal",
      contact: "",
      additionalInfo: "",
    });
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "Normal":
        return "#2ecc71";
      case "Urgent":
        return "#f39c12";
      case "Critical":
        return "#e74c3c";
      default:
        return "#2ecc71";
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-100">
      {/* Header */}
      <View className="bg-red-500 p-5 pt-10">
        <Text className="text-white text-2xl font-bold mb-1">Request Blood</Text>
        <Text className="text-white opacity-90 text-sm">
          Need blood? Fill this form and we'll connect you with potential donors.
        </Text>
      </View>

      {/* Form */}
      <View className="p-5">
        <Text className="text-lg font-semibold mb-2 text-gray-800">Patient Name *</Text>
        <TextInput
          className="bg-white p-4 rounded-lg mb-4 border border-gray-300"
          value={requestData.patientName}
          onChangeText={(text) =>
            setRequestData({ ...requestData, patientName: text })
          }
          placeholder="Enter patient's full name"
        />

        <Text className="text-lg font-semibold mb-2 text-gray-800">Blood Type Needed *</Text>
        <View className="bg-white rounded-lg mb-4 border border-gray-300">
          <Picker
            selectedValue={requestData.bloodType}
            onValueChange={(value) =>
              setRequestData({ ...requestData, bloodType: value })
            }
          >
            {bloodTypes.map((type) => (
              <Picker.Item key={type} label={type} value={type} />
            ))}
          </Picker>
        </View>

        <Text className="text-lg font-semibold mb-2 text-gray-800">Units Required *</Text>
        <View className="bg-white rounded-lg mb-4 border border-gray-300">
          <Picker
            selectedValue={requestData.units}
            onValueChange={(value) =>
              setRequestData({ ...requestData, units: value })
            }
          >
            {["1", "2", "3", "4", "5+"].map((unit) => (
              <Picker.Item key={unit} label={unit} value={unit} />
            ))}
          </Picker>
        </View>

        <Text className="text-lg font-semibold mb-2 text-gray-800">Hospital Name *</Text>
        <TextInput
          className="bg-white p-4 rounded-lg mb-4 border border-gray-300"
          value={requestData.hospital}
          onChangeText={(text) =>
            setRequestData({ ...requestData, hospital: text })
          }
          placeholder="Enter hospital name"
        />

        <Text className="text-lg font-semibold mb-2 text-gray-800">Hospital Location *</Text>
        <TextInput
          className="bg-white p-4 rounded-lg mb-4 border border-gray-300"
          value={requestData.location}
          onChangeText={(text) =>
            setRequestData({ ...requestData, location: text })
          }
          placeholder="Enter hospital location"
        />

        <Text className="text-lg font-semibold mb-2 text-gray-800">Urgency Level *</Text>
        <View className="bg-white rounded-lg mb-4 border border-gray-300">
          <Picker
            selectedValue={requestData.urgency}
            onValueChange={(value) =>
              setRequestData({ ...requestData, urgency: value })
            }
          >
            {urgencyLevels.map((level) => (
              <Picker.Item key={level} label={level} value={level} />
            ))}
          </Picker>
        </View>

        <Text className="text-lg font-semibold mb-2 text-gray-800">Contact Number *</Text>
        <TextInput
          className="bg-white p-4 rounded-lg mb-4 border border-gray-300"
          value={requestData.contact}
          onChangeText={(text) =>
            setRequestData({ ...requestData, contact: text })
          }
          placeholder="Enter contact number"
          keyboardType="phone-pad"
        />

        <Text className="text-lg font-semibold mb-2 text-gray-800">Additional Information</Text>
        <TextInput
          className="bg-white p-4 rounded-lg mb-4 border border-gray-300 h-24"
          value={requestData.additionalInfo}
          onChangeText={(text) =>
            setRequestData({ ...requestData, additionalInfo: text })
          }
          placeholder="Any additional information about the patient or requirement"
          multiline
          numberOfLines={4}
          style={{ textAlignVertical: "top" }} // preserve multiline alignment
        />

        {/* Submit Button with dynamic color */}
        <TouchableOpacity
          className="p-5 rounded-lg items-center mb-4"
          style={{ backgroundColor: getUrgencyColor(requestData.urgency) }}
          onPress={handleSubmit}
        >
          <Text className="text-white text-lg font-bold">Submit Blood Request</Text>
        </TouchableOpacity>

        {/* Emergency Note */}
        <View className="bg-yellow-100 p-4 rounded-lg border-l-4 border-l-yellow-500">
          <Text className="text-yellow-700 text-sm text-center">
            ⚠️ For critical emergencies, please call the hospital directly for immediate assistance.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}