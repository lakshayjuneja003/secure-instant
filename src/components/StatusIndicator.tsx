
import React from 'react';
import { MapPin, Mic, AlertTriangle, CheckCircle2, Loader2, Shield } from 'lucide-react';

interface StatusIndicatorProps {
  location: { lat: string; lng: string } | null;
  locationError: string | null;
  soundLevel: number;
  isEmergencyActive: boolean;
  lastUpdate: string;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  location,
  locationError,
  soundLevel,
  isEmergencyActive,
  lastUpdate,
}) => {
  return (
    <div className="card-glass space-y-4 animate-enter">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold">Status Monitor</h2>
        {isEmergencyActive ? (
          <div className="flex items-center gap-1.5 text-emergency px-3 py-1 rounded-full bg-emergency-muted">
            <span className="h-2 w-2 rounded-full bg-emergency animate-flash"></span>
            <span className="font-medium">Emergency</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-safe px-3 py-1 rounded-full bg-safe-muted">
            <Shield className="h-4 w-4" />
            <span className="font-medium">Monitoring</span>
          </div>
        )}
      </div>
      
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5">
              <Mic className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Sound Level</span>
            </div>
            <span className={`text-sm font-medium ${
              soundLevel > 80 ? 'text-emergency' : soundLevel > 50 ? 'text-warning' : 'text-safe'
            }`}>
              {Math.round(soundLevel)}%
            </span>
          </div>
          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-300 ${
                soundLevel > 80 
                  ? 'bg-emergency' 
                  : soundLevel > 50 
                    ? 'bg-warning' 
                    : 'bg-safe'
              }`}
              style={{ width: `${soundLevel}%` }}
            ></div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Location</span>
          </div>
          <div className="text-sm">
            {location ? (
              <span className="font-mono">{location.lat}, {location.lng}</span>
            ) : locationError ? (
              <span className="text-emergency text-xs">{locationError}</span>
            ) : (
              <span className="flex items-center gap-1 text-info">
                <Loader2 className="h-3 w-3 animate-spin" />
                <span>Getting location...</span>
              </span>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Last Update</span>
          </div>
          <div className="text-sm font-medium">
            {lastUpdate}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Status</span>
          </div>
          <div className="text-sm font-medium">
            {isEmergencyActive ? (
              <span className="text-emergency">Emergency Active</span>
            ) : (
              <span className="text-safe">Normal</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
