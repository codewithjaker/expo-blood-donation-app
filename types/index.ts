export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  bloodType: string;
  location: string;
  dateOfBirth?: string;
  lastDonation?: string;
  isAvailable: boolean;
  donationsCount: number;
}

export interface Donor {
  id: string;
  name: string;
  bloodType: string;
  location: string;
  lastDonation: string;
  availability: 'Available' | 'Not Available';
  distance: string;
  phone?: string;
  email?: string;
}

export interface BloodRequest {
  id: string;
  patientName: string;
  bloodType: string;
  units: number;
  hospital: string;
  location: string;
  urgency: 'Normal' | 'Urgent' | 'Critical';
  contact: string;
  additionalInfo: string;
  createdAt: string;
  status: 'Pending' | 'Fulfilled' | 'Expired';
}

export interface Appointment {
  id: string;
  donorId: string;
  donorName: string;
  bloodBank: string;
  date: string;
  time: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  type: 'Donation' | 'Checkup';
}

export interface BloodBank {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  location: {
    latitude: number;
    longitude: number;
  };
  hours: string;
  bloodTypes: string[];
}