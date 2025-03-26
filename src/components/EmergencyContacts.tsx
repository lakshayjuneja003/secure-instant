
import React from 'react';
import { Users, Plus, UserRound, Phone, CheckCircle2 } from 'lucide-react';
import { EmergencyContact } from '../utils/emergencyUtils';

interface EmergencyContactsProps {
  contacts: EmergencyContact[];
  isEmergencyActive: boolean;
}

export const EmergencyContacts: React.FC<EmergencyContactsProps> = ({
  contacts,
  isEmergencyActive,
}) => {
  return (
    <div className="card-glass">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Emergency Contacts</h2>
        </div>
        {!isEmergencyActive && (
          <button 
            className="p-2 rounded-full bg-secondary hover:bg-secondary/70 transition-colors"
            aria-label="Add contact"
          >
            <Plus className="h-4 w-4" />
          </button>
        )}
      </div>
      
      <div className="space-y-3">
        {contacts.map((contact) => (
          <div key={contact.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <UserRound className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">{contact.name}</p>
                <p className="text-xs text-muted-foreground">{contact.relationship}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {isEmergencyActive && contact.notifyOnEmergency && (
                <span className="text-xs flex items-center gap-1 text-safe">
                  <CheckCircle2 className="h-3 w-3" />
                  Notified
                </span>
              )}
              <button 
                className="p-2 rounded-full bg-info/10 text-info hover:bg-info/20 transition-colors"
                aria-label={`Call ${contact.name}`}
              >
                <Phone className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
