
// Emergency contact type definition
export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
  notifyOnEmergency: boolean;
}

// Emergency event type definition
export interface EmergencyEvent {
  id: string;
  timestamp: Date;
  type: 'activation' | 'location' | 'audio' | 'photo' | 'contact' | 'deactivation';
  data?: any;
}

// Dummy emergency contacts data
export const dummyContacts: EmergencyContact[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    phone: '+1 (555) 123-4567',
    relationship: 'Sister',
    notifyOnEmergency: true,
  },
  {
    id: '2',
    name: 'David Williams',
    phone: '+1 (555) 987-6543',
    relationship: 'Friend',
    notifyOnEmergency: true,
  },
  {
    id: '3',
    name: 'Local Police',
    phone: '911',
    relationship: 'Emergency Services',
    notifyOnEmergency: true,
  },
];

// Function to get the user's current location
export const getCurrentLocation = async (): Promise<{ lat: number; lng: number } | null> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject('Geolocation not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error('Error getting location:', error);
        // Fallback to a default location (New Delhi) in demo mode
        resolve({
          lat: 28.6139,
          lng: 77.209,
        });
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  });
};

// Function to simulate sending an emergency alert
export const sendEmergencyAlert = async (
  location: { lat: number; lng: number },
  contacts: EmergencyContact[],
  evidence?: { photo?: string; audio?: string }
): Promise<boolean> => {
  console.log('Sending emergency alert:', { location, contacts, evidence });
  // In a real app, this would connect to an API to send alerts
  // Simulate a slight delay to make it feel like it's actually doing something
  await new Promise(resolve => setTimeout(resolve, 1000));
  return true;
};

// Helper to create a new emergency event
export const createEmergencyEvent = (
  type: EmergencyEvent['type'],
  data?: any
): EmergencyEvent => {
  return {
    id: Math.random().toString(36).substring(2, 9),
    timestamp: new Date(),
    type,
    data,
  };
};

// Helper to format a timestamp in a human-readable way
export const formatTimestamp = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
  }).format(date);
};

// Simulate haptic feedback (would be a native function in a real app)
export const vibrate = (pattern?: number | number[]): void => {
  if (navigator.vibrate) {
    navigator.vibrate(pattern || 200);
  }
};

// Process sound level data
export const processSoundLevel = (dataArray: Uint8Array): number => {
  const sum = dataArray.reduce((acc, value) => acc + value, 0);
  return Math.min((sum / dataArray.length) * 1.2, 100);
};

// Check if sound level indicates an emergency
export const isSoundEmergency = (soundLevel: number, threshold = 80): boolean => {
  return soundLevel > threshold;
};

// Function to get audio context and analyzer
export const getAudioContext = (): { context: AudioContext; analyzer: AnalyserNode } | null => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) {
      return null;
    }
    
    const context = new AudioContext();
    const analyzer = context.createAnalyser();
    analyzer.fftSize = 256;
    
    return { context, analyzer };
  } catch (error) {
    console.error('Failed to create audio context:', error);
    return null;
  }
};
