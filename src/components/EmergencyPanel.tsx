
import React from 'react';
import { AlertTriangle, CheckCircle2, X } from 'lucide-react';
import { EmergencyButton } from './EmergencyButton';
import { dummyContacts, EmergencyEvent } from '../utils/emergencyUtils';

interface EmergencyPanelProps {
  isEmergencyActive: boolean;
  onActivateEmergency: () => void;
  onCancelEmergency?: () => void;
  events: EmergencyEvent[];
  lastUpdate: string;
}

export const EmergencyPanel: React.FC<EmergencyPanelProps> = ({
  isEmergencyActive,
  onActivateEmergency,
  onCancelEmergency,
  events,
  lastUpdate,
}) => {
  return (
    <div className={`card-glass ${isEmergencyActive ? 'emergency-glow' : ''}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <AlertTriangle className={`h-5 w-5 ${isEmergencyActive ? 'text-emergency' : 'text-primary'}`} />
          <h2 className="text-xl font-semibold">Emergency Controls</h2>
        </div>
        {isEmergencyActive && (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emergency-muted text-emergency text-sm">
            <span className="h-2 w-2 rounded-full bg-emergency animate-pulse"></span>
            <span className="font-medium">Active</span>
          </div>
        )}
      </div>
      
      <div className="space-y-6">
        <EmergencyButton 
          isActive={isEmergencyActive}
          onActivate={onActivateEmergency}
          size="lg"
          fullWidth={true}
        />
        
        {isEmergencyActive && (
          <div className="space-y-4">
            <div className="bg-secondary/50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-safe" />
                  <span className="font-medium">Emergency Actions Taken:</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  Activated at {lastUpdate}
                </span>
              </div>
              
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-safe"></div>
                  <span>Location tracking enabled</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-safe"></div>
                  <span>Emergency recording started</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-safe"></div>
                  <span>Photo evidence captured</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-safe"></div>
                  <span>{dummyContacts.length} emergency contacts notified</span>
                </li>
              </ul>
            </div>
            
            {onCancelEmergency && (
              <button 
                onClick={onCancelEmergency}
                className="w-full flex items-center justify-center gap-2 p-3 rounded-lg border border-muted hover:bg-secondary/50 transition-colors"
              >
                <X className="h-4 w-4" />
                <span>Cancel Emergency (Demo Only)</span>
              </button>
            )}
          </div>
        )}
        
        {!isEmergencyActive && (
          <div className="text-sm text-muted-foreground space-y-2">
            <p>
              Press the emergency button to activate safety protocols. 
              This will:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-1">
              <li>Record audio evidence</li>
              <li>Capture photo evidence</li>
              <li>Track your location</li>
              <li>Alert your emergency contacts</li>
            </ul>
            <p className="text-xs mt-4">
              You can also activate emergency mode using voice commands
              or when a loud sound (like screaming) is detected.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
