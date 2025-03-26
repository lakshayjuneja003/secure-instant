
import React from 'react';
import { Layout } from '../components/Layout';
import { Shield, Bell, Camera, Mic, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Features = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-center mb-2">SafeGuard Features</h1>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto">
            Comprehensive safety tools designed to protect you in emergency situations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <FeatureCard 
            icon={<Bell className="h-8 w-8 text-primary" />}
            title="Sound Detection"
            description="Automatically detects screams or loud noises and activates emergency protocols without manual intervention."
          />
          
          <FeatureCard 
            icon={<Mic className="h-8 w-8 text-primary" />}
            title="Voice Commands"
            description="Activate emergency mode using voice commands for hands-free operation in dangerous situations."
          />
          
          <FeatureCard 
            icon={<Camera className="h-8 w-8 text-primary" />}
            title="Automatic Evidence Collection"
            description="Captures photos and audio recordings during emergencies to provide evidence and context."
          />
          
          <FeatureCard 
            icon={<MapPin className="h-8 w-8 text-primary" />}
            title="Real-time Location Tracking"
            description="Shares your precise location with emergency contacts and authorities during an active emergency."
          />
          
          <FeatureCard 
            icon={<Phone className="h-8 w-8 text-primary" />}
            title="Emergency Contacts"
            description="Automatically alerts your designated emergency contacts with your location and situation details."
          />
          
          <FeatureCard 
            icon={<Shield className="h-8 w-8 text-primary" />}
            title="Timeline Documentation"
            description="Creates a detailed timeline of events during an emergency for later reference and evidence."
          />
        </div>
        
        <div className="bg-muted p-6 rounded-lg mb-10">
          <h2 className="text-2xl font-bold mb-4">How SafeGuard Works</h2>
          <ol className="space-y-4 list-decimal list-inside">
            <li className="pl-2">
              <span className="font-medium">Setup your profile</span> - Enter your information and emergency contacts
            </li>
            <li className="pl-2">
              <span className="font-medium">Enable permissions</span> - Allow access to microphone, camera, and location
            </li>
            <li className="pl-2">
              <span className="font-medium">Keep the app running</span> - SafeGuard works in the background to monitor for emergencies
            </li>
            <li className="pl-2">
              <span className="font-medium">Emergency activation</span> - Triggered by manual button, voice command, or sound detection
            </li>
            <li className="pl-2">
              <span className="font-medium">Automatic response</span> - Contacts notified, evidence collected, location shared
            </li>
          </ol>
        </div>
        
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-4">Ready to feel safer?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/signup">
                Sign Up Now
                <Shield className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link to="/demo">
                Try Demo Mode
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const FeatureCard = ({ icon, title, description }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string 
}) => (
  <div className="card-glass p-6">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

export default Features;
