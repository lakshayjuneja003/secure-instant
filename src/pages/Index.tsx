
import React, { useState, useEffect, useRef } from 'react';
import { Layout } from '../components/Layout';
import { StatusIndicator } from '../components/StatusIndicator';
import { EmergencyPanel } from '../components/EmergencyPanel';
import { LocationMap } from '../components/LocationMap';
import { AudioRecorder } from '../components/AudioRecorder';
import { CameraCapture } from '../components/CameraCapture';
import { VoiceCommand } from '../components/VoiceCommand';
import { EmergencyContacts } from '../components/EmergencyContacts';
import { EmergencyTimeline } from '../components/EmergencyTimeline';
import { dummyContacts, getCurrentLocation, vibrate, processSoundLevel, isSoundEmergency, createEmergencyEvent, EmergencyEvent } from '../utils/emergencyUtils';

const Index = () => {
  // State management
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const [location, setLocation] = useState<{ lat: string; lng: string } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [soundLevel, setSoundLevel] = useState(0);
  const [lastUpdate, setLastUpdate] = useState<string>("Not updated yet");
  const [photo, setPhoto] = useState<string | null>(null);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [events, setEvents] = useState<EmergencyEvent[]>([]);
  
  // Refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const microphoneRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const soundCheckRef = useRef<number | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  
  // Initialize audio and location monitoring
  useEffect(() => {
    initializeSoundMonitoring();
    initializeLocationTracking();
    
    return () => {
      cleanupResources();
    };
  }, []);
  
  // Initialize sound monitoring
  const initializeSoundMonitoring = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      audioContextRef.current = new AudioContext();
      
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      
      microphoneRef.current = audioContextRef.current.createMediaStreamSource(stream);
      microphoneRef.current.connect(analyserRef.current);
      
      const bufferLength = analyserRef.current.frequencyBinCount;
      dataArrayRef.current = new Uint8Array(bufferLength);
      
      const checkSound = () => {
        if (!analyserRef.current || !dataArrayRef.current) return;
        
        analyserRef.current.getByteFrequencyData(dataArrayRef.current);
        const level = processSoundLevel(dataArrayRef.current);
        setSoundLevel(level);
        
        if (isSoundEmergency(level) && !isEmergencyActive) {
          activateEmergency('sound');
        }
        
        soundCheckRef.current = requestAnimationFrame(checkSound);
      };
      
      soundCheckRef.current = requestAnimationFrame(checkSound);
      
    } catch (error) {
      console.error('Microphone access error:', error);
      setLocationError('Microphone access denied. Please enable microphone permissions.');
    }
  };
  
  // Initialize location tracking
  const initializeLocationTracking = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation not supported by your browser");
      return;
    }
    
    // Use a predefined location for the demo
    const predefinedLocation = { lat: "28.6139", lng: "77.2090" }; // Default: New Delhi, India
    
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude.toFixed(5),
          lng: position.coords.longitude.toFixed(5),
        });
        setLastUpdate(new Date().toLocaleTimeString());
        
        // Add location event if emergency is active
        if (isEmergencyActive) {
          setEvents(prev => [
            createEmergencyEvent('location', {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }),
            ...prev
          ]);
        }
      },
      (error) => {
        const errorMessages = [
          "Location access denied by user",
          "Location information unavailable",
          "Location request timed out",
        ];
        setLocationError(errorMessages[error.code] || "Error getting location");
        setLocation(predefinedLocation); // Use fallback location
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 }
    );
    
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  };
  
  // Cleanup resources
  const cleanupResources = () => {
    if (soundCheckRef.current) {
      cancelAnimationFrame(soundCheckRef.current);
    }
    
    if (microphoneRef.current) {
      microphoneRef.current.disconnect();
    }
    
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close();
    }
  };
  
  // Handle emergency activation
  const activateEmergency = (source: 'manual' | 'sound' | 'voice' = 'manual') => {
    if (isEmergencyActive) return;
    
    setIsEmergencyActive(true);
    setLastUpdate(new Date().toLocaleTimeString());
    
    // Trigger haptic feedback
    vibrate([100, 50, 200, 50, 300]);
    
    // Log event
    setEvents(prev => [
      createEmergencyEvent('activation', { source }),
      ...prev
    ]);
    
    // In a real app, we would send alerts to emergency contacts here
    console.log("🚨 Emergency Activated!", { source });
  };
  
  // Handle photo capture completion
  const handlePhotoCaptured = (photoUrl: string) => {
    setPhoto(photoUrl);
    
    // Add to timeline
    setEvents(prev => [
      createEmergencyEvent('photo'),
      ...prev
    ]);
  };
  
  // Handle audio recording completion
  const handleAudioRecorded = (audioUrl: string) => {
    setAudioURL(audioUrl);
    
    // Add to timeline
    setEvents(prev => [
      createEmergencyEvent('audio'),
      ...prev
    ]);
  };
  
  // Handle emergency cancellation (demo only)
  const handleCancelEmergency = () => {
    setIsEmergencyActive(false);
    
    // Add to timeline
    setEvents(prev => [
      createEmergencyEvent('deactivation'),
      ...prev
    ]);
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-center mb-2">SafeGuard</h1>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto">
            A personal safety solution that activates emergency protocols through multiple channels,
            including manual triggers, voice commands, and sound detection.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="md:col-span-2">
            <StatusIndicator 
              location={location}
              locationError={locationError}
              soundLevel={soundLevel}
              isEmergencyActive={isEmergencyActive}
              lastUpdate={lastUpdate}
            />
          </div>
          <div>
            <EmergencyPanel 
              isEmergencyActive={isEmergencyActive}
              onActivateEmergency={() => activateEmergency('manual')}
              onCancelEmergency={handleCancelEmergency}
              events={events}
              lastUpdate={lastUpdate}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <LocationMap 
              location={location}
              isEmergencyActive={isEmergencyActive}
            />
          </div>
          <div>
            <AudioRecorder 
              isEmergencyActive={isEmergencyActive}
              onRecordingComplete={handleAudioRecorded}
            />
          </div>
          <div>
            <CameraCapture 
              isEmergencyActive={isEmergencyActive}
              onPhotoCaptured={handlePhotoCaptured}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <VoiceCommand 
              onEmergencyCommand={() => activateEmergency('voice')}
              isEmergencyActive={isEmergencyActive}
            />
          </div>
          <div>
            <EmergencyContacts 
              contacts={dummyContacts}
              isEmergencyActive={isEmergencyActive}
            />
          </div>
          <div>
            <EmergencyTimeline events={events} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
