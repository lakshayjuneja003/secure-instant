
import React, { useState, useEffect, useRef } from 'react';
import { Mic, Volume2, VolumeX, AlertCircle } from 'lucide-react';

interface VoiceCommandProps {
  onEmergencyCommand: () => void;
  isEmergencyActive: boolean;
}

export const VoiceCommand: React.FC<VoiceCommandProps> = ({
  onEmergencyCommand,
  isEmergencyActive,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  const recognitionRef = useRef<any>(null);
  
  // Set up speech recognition
  useEffect(() => {
    if (!isEmergencyActive) {
      // Fix for SpeechRecognition browser compatibility
      const SpeechRecognition = window.SpeechRecognition || 
                               (window as any).webkitSpeechRecognition || 
                               (window as any).mozSpeechRecognition || 
                               (window as any).msSpeechRecognition;
      
      if (!SpeechRecognition) {
        setError('Speech recognition not supported in this browser.');
        return;
      }
      
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';
      
      recognitionRef.current.onresult = (event: any) => {
        const latestTranscript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join(' ')
          .toLowerCase();
        
        setTranscript(latestTranscript);
        
        // Check for emergency keywords
        const emergencyPhrases = [
          'emergency',
          'help me',
          'i need help', 
          'danger', 
          'sos',
          'alert',
          'help',
          'please help',
          'scream',
          'screaming'
        ];
        
        if (emergencyPhrases.some(phrase => latestTranscript.includes(phrase))) {
          stopListening();
          onEmergencyCommand();
        }
      };
      
      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
          setError('Microphone access denied. Please check permissions.');
          stopListening();
        }
      };
      
      recognitionRef.current.onend = () => {
        if (isListening) {
          // Restart if it stopped unexpectedly
          recognitionRef.current.start();
        }
      };
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isEmergencyActive]);
  
  const startListening = () => {
    if (recognitionRef.current && !isListening && !isEmergencyActive) {
      try {
        recognitionRef.current.start();
        setIsListening(true);
        setError(null);
      } catch (err) {
        console.error('Failed to start speech recognition:', err);
        setError('Failed to start voice recognition.');
      }
    }
  };
  
  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };
  
  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <div className="card-glass">
      <div className="flex items-center gap-2 mb-4">
        <Mic className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Voice Commands</h2>
      </div>
      
      {error ? (
        <div className="bg-destructive/10 text-destructive p-3 rounded-lg text-sm flex items-start gap-2">
          <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      ) : (
        <div className="space-y-4">
          <div className={`p-4 rounded-lg flex items-center justify-between ${
            isListening ? 'bg-info/10' : 'bg-secondary/50'
          }`}>
            <div className="flex items-center gap-2">
              {isListening ? (
                <>
                  <Volume2 className="h-5 w-5 text-info" />
                  <span className="font-medium text-info">Listening...</span>
                </>
              ) : (
                <>
                  <VolumeX className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">Voice detection paused</span>
                </>
              )}
            </div>
            
            <button
              onClick={toggleListening}
              disabled={isEmergencyActive}
              className={`p-2 rounded-full ${
                isEmergencyActive 
                  ? 'bg-muted-foreground/20 text-muted-foreground cursor-not-allowed' 
                  : isListening
                    ? 'bg-info text-white hover:bg-info/90'
                    : 'bg-secondary hover:bg-secondary/90'
              } transition-colors`}
              aria-label={isListening ? "Stop listening" : "Start listening"}
            >
              {isListening ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </button>
          </div>
          
          {isListening && transcript && (
            <div className="bg-secondary/30 p-3 rounded-lg">
              <p className="text-sm font-medium mb-1">Detected speech:</p>
              <p className="text-sm text-muted-foreground italic">"{transcript}"</p>
            </div>
          )}
          
          <div className="bg-muted/50 p-3 rounded-lg">
            <p className="text-sm font-medium mb-1">Say any of these phrases to activate emergency:</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {['emergency', 'help me', 'danger', 'sos', 'alert', 'help', 'scream', 'i need help'].map((phrase) => (
                <span 
                  key={phrase} 
                  className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                >
                  "{phrase}"
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
