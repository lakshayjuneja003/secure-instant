
import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, PlayCircle, PauseCircle, Loader2 } from 'lucide-react';

interface AudioRecorderProps {
  isEmergencyActive: boolean;
  onRecordingComplete: (audioUrl: string) => void;
  triggerNewRecording?: boolean; // New prop to trigger re-recording
}

export const AudioRecorder: React.FC<AudioRecorderProps> = ({ 
  isEmergencyActive,
  onRecordingComplete,
  triggerNewRecording = false
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [recordingCount, setRecordingCount] = useState(0);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<number | null>(null);

  // Track previous trigger value to detect changes
  const prevTriggerRef = useRef(triggerNewRecording);

  // Auto start recording when emergency is activated
  useEffect(() => {
    if (isEmergencyActive && !isRecording && !audioURL) {
      startRecording();
    }
  }, [isEmergencyActive]);

  // Handle re-recording when triggerNewRecording changes
  useEffect(() => {
    // If triggerNewRecording has changed to true and we're in emergency mode
    if (triggerNewRecording && !prevTriggerRef.current && isEmergencyActive) {
      // Only start a new recording if we're not already recording
      if (!isRecording) {
        setAudioURL(null); // Clear previous recording
        startRecording();
        setRecordingCount(prev => prev + 1);
      }
    }
    
    // Update the ref to current value
    prevTriggerRef.current = triggerNewRecording;
  }, [triggerNewRecording, isEmergencyActive]);

  // Handle timer for recording duration
  useEffect(() => {
    if (isRecording) {
      timerRef.current = window.setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRecording]);

  // Format seconds as MM:SS
  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startRecording = async () => {
    setError(null);
    setRecordingDuration(0);
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
        onRecordingComplete(url);
        setIsRecording(false);
        
        // Stop all audio tracks
        stream.getTracks().forEach(track => track.stop());
      };
      
      // Start recording
      mediaRecorder.start();
      setIsRecording(true);
      
      // Automatically stop after 15 seconds for demo purposes
      setTimeout(() => {
        if (mediaRecorder.state === 'recording') {
          mediaRecorder.stop();
        }
      }, 15000);
      
    } catch (err) {
      console.error('Error starting recording:', err);
      setError('Microphone access denied. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
  };

  const togglePlayback = () => {
    if (!audioRef.current || !audioURL) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (audioRef.current) {
      const handleEnded = () => setIsPlaying(false);
      audioRef.current.addEventListener('ended', handleEnded);
      
      return () => {
        audioRef.current?.removeEventListener('ended', handleEnded);
      };
    }
  }, [audioURL]);

  return (
    <div className="card-glass">
      <div className="flex items-center gap-2 mb-4">
        <Mic className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">
          Audio Recording
          {recordingCount > 1 && (
            <span className="ml-2 text-sm text-muted-foreground">({recordingCount} recordings)</span>
          )}
        </h2>
      </div>
      
      {error ? (
        <div className="bg-destructive/10 text-destructive p-3 rounded-lg text-sm">
          {error}
        </div>
      ) : (
        <div className="space-y-4">
          {isRecording ? (
            <div className="bg-emergency/10 p-4 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-emergency animate-pulse"></div>
                <span className="text-emergency font-medium">Recording...</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm">{formatDuration(recordingDuration)}</span>
                <button 
                  onClick={stopRecording}
                  className="p-2 rounded-full bg-emergency text-white hover:bg-emergency-dark transition-colors"
                  aria-label="Stop recording"
                >
                  <Square className="h-4 w-4" />
                </button>
              </div>
            </div>
          ) : audioURL ? (
            <div className="bg-secondary/50 p-4 rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">Emergency Audio</span>
                <span className="text-xs text-muted-foreground">
                  {formatDuration(recordingDuration)}
                </span>
              </div>
              
              <audio ref={audioRef} src={audioURL} className="hidden" />
              
              <div className="flex items-center gap-2">
                <button
                  onClick={togglePlayback}
                  className="p-2 rounded-full hover:bg-secondary transition-colors"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <PauseCircle className="h-6 w-6 text-primary" />
                  ) : (
                    <PlayCircle className="h-6 w-6 text-primary" />
                  )}
                </button>
                
                <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ 
                    width: isPlaying ? '100%' : '0%',
                    transition: isPlaying ? 'width linear 15s' : 'none'
                  }}></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-muted p-4 rounded-lg flex items-center justify-center">
              <button
                onClick={startRecording}
                disabled={isEmergencyActive}
                className={`p-3 rounded-full ${
                  isEmergencyActive 
                    ? 'bg-muted-foreground/20 text-muted-foreground cursor-not-allowed' 
                    : 'bg-primary text-primary-foreground hover:bg-primary/90'
                } transition-colors`}
                aria-label="Start recording"
              >
                {isEmergencyActive ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  <Mic className="h-6 w-6" />
                )}
              </button>
              {isEmergencyActive && (
                <p className="ml-3 text-sm text-muted-foreground">
                  Starting automatic recording...
                </p>
              )}
            </div>
          )}
          
          {!isRecording && !audioURL && !isEmergencyActive && (
            <p className="text-xs text-muted-foreground">
              Recording will start automatically when emergency is activated. 
              You can also record manually by clicking the microphone button.
            </p>
          )}
          
          {isEmergencyActive && recordingCount > 1 && (
            <p className="text-xs text-info">
              Multiple recordings triggered due to high volume detection.
            </p>
          )}
        </div>
      )}
    </div>
  );
};
