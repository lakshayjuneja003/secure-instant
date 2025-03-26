
import React from 'react';
import { EmergencyEvent, formatTimestamp } from '../utils/emergencyUtils';
import { 
  AlertTriangle, 
  MapPin, 
  Mic, 
  Camera, 
  Users, 
  ShieldCheck,
  Clock 
} from 'lucide-react';

interface EmergencyTimelineProps {
  events: EmergencyEvent[];
}

export const EmergencyTimeline: React.FC<EmergencyTimelineProps> = ({ events }) => {
  if (events.length === 0) {
    return null;
  }

  // Get icon based on event type
  const getEventIcon = (type: EmergencyEvent['type']) => {
    switch (type) {
      case 'activation':
        return <AlertTriangle className="h-5 w-5 text-emergency" />;
      case 'location':
        return <MapPin className="h-5 w-5 text-info" />;
      case 'audio':
        return <Mic className="h-5 w-5 text-info" />;
      case 'photo':
        return <Camera className="h-5 w-5 text-info" />;
      case 'contact':
        return <Users className="h-5 w-5 text-info" />;
      case 'deactivation':
        return <ShieldCheck className="h-5 w-5 text-safe" />;
      default:
        return <Clock className="h-5 w-5 text-muted-foreground" />;
    }
  };

  // Get label based on event type
  const getEventLabel = (event: EmergencyEvent) => {
    switch (event.type) {
      case 'activation':
        return 'Emergency activated';
      case 'location':
        return `Location updated: ${event.data?.lat.toFixed(5)}, ${event.data?.lng.toFixed(5)}`;
      case 'audio':
        return 'Audio recording captured';
      case 'photo':
        return 'Photo evidence captured';
      case 'contact':
        return `Alert sent to ${event.data?.contactCount} contacts`;
      case 'deactivation':
        return 'Emergency deactivated';
      default:
        return 'Unknown event';
    }
  };

  return (
    <div className="card-glass">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Timeline</h2>
      </div>
      
      <div className="space-y-0">
        {events.map((event, index) => (
          <div key={event.id} className="relative pl-6 pb-4">
            {/* Timeline connector */}
            {index < events.length - 1 && (
              <div className="absolute left-[10px] top-6 bottom-0 w-0.5 bg-muted"></div>
            )}
            
            {/* Event dot */}
            <div className="absolute left-0 top-1 rounded-full p-1 bg-card">
              {getEventIcon(event.type)}
            </div>
            
            {/* Event content */}
            <div className="ml-4">
              <p className="font-medium">{getEventLabel(event)}</p>
              <p className="text-xs text-muted-foreground">
                {formatTimestamp(event.timestamp)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
