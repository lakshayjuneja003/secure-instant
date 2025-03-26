
import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { 
  Bell, 
  Volume2, 
  Moon, 
  Shield, 
  User, 
  Lock, 
  MapPin, 
  Smartphone, 
  Save, 
  Users, 
  Trash2 
} from 'lucide-react';
import { toast } from "@/components/ui/use-toast";

const Settings = () => {
  const [settings, setSettings] = useState({
    // Notification settings
    emergencyAlerts: true,
    soundAlerts: true,
    locationUpdates: true,
    
    // Privacy settings
    shareLocation: true,
    dataRetention: '30', // days
    anonymizeData: false,
    
    // App settings
    darkMode: false,
    soundThreshold: '75', // percentage
    emergencyTimeout: '120', // seconds
    
    // Account settings
    email: 'user@example.com',
    phone: '+1 (555) 123-4567',
    name: 'Jamie Smith',
  });
  
  const [selectedTab, setSelectedTab] = useState('notifications');
  const [saving, setSaving] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSave = () => {
    setSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Settings saved",
        description: "Your preferences have been updated successfully.",
      });
    }, 1000);
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-center mb-2">Settings</h1>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto">
            Customize your SafeGuard experience by configuring your preferences.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <div className="sticky top-4 space-y-1">
              <SettingsTab 
                icon={<Bell />} 
                text="Notifications" 
                active={selectedTab === 'notifications'} 
                onClick={() => setSelectedTab('notifications')} 
              />
              <SettingsTab 
                icon={<Lock />} 
                text="Privacy & Security" 
                active={selectedTab === 'privacy'} 
                onClick={() => setSelectedTab('privacy')} 
              />
              <SettingsTab 
                icon={<Shield />} 
                text="App Settings" 
                active={selectedTab === 'app'} 
                onClick={() => setSelectedTab('app')} 
              />
              <SettingsTab 
                icon={<Users />} 
                text="Emergency Contacts" 
                active={selectedTab === 'contacts'} 
                onClick={() => setSelectedTab('contacts')} 
              />
              <SettingsTab 
                icon={<User />} 
                text="Account" 
                active={selectedTab === 'account'} 
                onClick={() => setSelectedTab('account')} 
              />
            </div>
          </div>
          
          <div className="col-span-3">
            <div className="card-glass p-6">
              {selectedTab === 'notifications' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Bell className="h-6 w-6" />
                    Notification Settings
                  </h2>
                  
                  <div className="space-y-6">
                    <SettingsToggle
                      name="emergencyAlerts"
                      label="Emergency Alerts"
                      description="Receive push notifications when an emergency is detected"
                      checked={settings.emergencyAlerts}
                      onChange={handleChange}
                    />
                    
                    <SettingsToggle
                      name="soundAlerts"
                      label="Sound Detection Alerts"
                      description="Get notified when unusually loud sounds are detected"
                      checked={settings.soundAlerts}
                      onChange={handleChange}
                    />
                    
                    <SettingsToggle
                      name="locationUpdates"
                      label="Location Update Notifications"
                      description="Receive notifications when your location is shared during emergencies"
                      checked={settings.locationUpdates}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}
              
              {selectedTab === 'privacy' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Lock className="h-6 w-6" />
                    Privacy & Security
                  </h2>
                  
                  <div className="space-y-6">
                    <SettingsToggle
                      name="shareLocation"
                      label="Share Location"
                      description="Allow the app to share your location during emergencies"
                      checked={settings.shareLocation}
                      onChange={handleChange}
                    />
                    
                    <div>
                      <label className="font-medium">Data Retention</label>
                      <p className="text-sm text-muted-foreground mb-2">
                        How long to keep emergency data before automatic deletion
                      </p>
                      <select
                        name="dataRetention"
                        value={settings.dataRetention}
                        onChange={(e) => setSettings({ ...settings, dataRetention: e.target.value })}
                        className="w-full p-2 border border-border rounded-md bg-background"
                      >
                        <option value="7">7 days</option>
                        <option value="14">14 days</option>
                        <option value="30">30 days</option>
                        <option value="90">90 days</option>
                      </select>
                    </div>
                    
                    <SettingsToggle
                      name="anonymizeData"
                      label="Anonymize Usage Data"
                      description="Remove identifying information from app usage analytics"
                      checked={settings.anonymizeData}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}
              
              {selectedTab === 'app' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Shield className="h-6 w-6" />
                    App Settings
                  </h2>
                  
                  <div className="space-y-6">
                    <SettingsToggle
                      name="darkMode"
                      label="Dark Mode"
                      description="Use dark theme throughout the app"
                      checked={settings.darkMode}
                      onChange={handleChange}
                      icon={<Moon className="h-5 w-5" />}
                    />
                    
                    <div>
                      <label className="font-medium flex items-center gap-2">
                        <Volume2 className="h-5 w-5" />
                        Sound Detection Threshold
                      </label>
                      <p className="text-sm text-muted-foreground mb-2">
                        Adjust how sensitive the app is to detecting loud sounds
                      </p>
                      <input
                        type="range"
                        name="soundThreshold"
                        min="50"
                        max="95"
                        value={settings.soundThreshold}
                        onChange={handleChange}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Less Sensitive</span>
                        <span>{settings.soundThreshold}%</span>
                        <span>More Sensitive</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="font-medium">Emergency Timeout</label>
                      <p className="text-sm text-muted-foreground mb-2">
                        How long emergency mode stays active without confirmation
                      </p>
                      <select
                        name="emergencyTimeout"
                        value={settings.emergencyTimeout}
                        onChange={(e) => setSettings({ ...settings, emergencyTimeout: e.target.value })}
                        className="w-full p-2 border border-border rounded-md bg-background"
                      >
                        <option value="60">1 minute</option>
                        <option value="120">2 minutes</option>
                        <option value="300">5 minutes</option>
                        <option value="600">10 minutes</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
              
              {selectedTab === 'contacts' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Users className="h-6 w-6" />
                    Emergency Contacts
                  </h2>
                  
                  <p className="text-muted-foreground mb-4">
                    Add trusted contacts who will be notified during emergencies.
                  </p>
                  
                  <div className="space-y-4 mb-6">
                    {[
                      { name: "Emma Johnson", phone: "+1 (555) 987-6543", relationship: "Family" },
                      { name: "Michael Chen", phone: "+1 (555) 234-5678", relationship: "Friend" },
                      { name: "Sarah Williams", phone: "+1 (555) 345-6789", relationship: "Partner" }
                    ].map((contact, index) => (
                      <div key={index} className="flex justify-between items-center p-3 border border-border rounded-md">
                        <div>
                          <div className="font-medium">{contact.name}</div>
                          <div className="text-sm text-muted-foreground">{contact.phone}</div>
                          <div className="text-xs text-muted-foreground">{contact.relationship}</div>
                        </div>
                        <button className="text-red-500 hover:text-red-700 transition-colors">
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <button className="btn-outline w-full">+ Add New Contact</button>
                </div>
              )}
              
              {selectedTab === 'account' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <User className="h-6 w-6" />
                    Account Settings
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="name" className="font-medium">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={settings.name}
                        onChange={handleChange}
                        className="w-full p-2 border border-border rounded-md bg-background mt-1"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="font-medium flex items-center gap-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={settings.email}
                        onChange={handleChange}
                        className="w-full p-2 border border-border rounded-md bg-background mt-1"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="font-medium flex items-center gap-2">
                        <Smartphone className="h-5 w-5" />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={settings.phone}
                        onChange={handleChange}
                        className="w-full p-2 border border-border rounded-md bg-background mt-1"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="password" className="font-medium">Password</label>
                      <button className="block btn-outline mt-1">Change Password</button>
                    </div>
                    
                    <div className="pt-4 border-t border-border">
                      <button className="text-red-500 hover:text-red-700 transition-colors flex items-center gap-2">
                        <Trash2 className="h-5 w-5" />
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="btn-primary flex items-center gap-2"
                >
                  {saving ? (
                    <>
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Save Settings
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const SettingsTab = ({ icon, text, active, onClick }: { 
  icon: React.ReactNode; 
  text: string;
  active: boolean;
  onClick: () => void;
}) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-2 p-3 rounded-md transition-colors ${
      active 
        ? 'bg-primary/10 text-primary' 
        : 'hover:bg-muted'
    }`}
  >
    {icon}
    <span>{text}</span>
  </button>
);

const SettingsToggle = ({ name, label, description, checked, onChange, icon }: { 
  name: string; 
  label: string;
  description: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
}) => (
  <div className="flex items-start justify-between">
    <div>
      <label htmlFor={name} className="font-medium flex items-center gap-2">
        {icon}
        {label}
      </label>
      <p className="text-sm text-muted-foreground">
        {description}
      </p>
    </div>
    <div className="relative inline-block w-12 h-6 shrink-0">
      <input
        type="checkbox"
        id={name}
        name={name}
        checked={checked}
        onChange={onChange}
        className="peer sr-only"
      />
      <label
        htmlFor={name}
        className="cursor-pointer absolute inset-0 rounded-full bg-muted peer-checked:bg-primary transition-colors"
      ></label>
      <span className="absolute inset-0 m-1 h-4 w-4 rounded-full bg-white transition-all peer-checked:translate-x-6"></span>
    </div>
  </div>
);

export default Settings;
