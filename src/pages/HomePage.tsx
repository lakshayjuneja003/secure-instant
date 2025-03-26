
import React from 'react';
import { Layout } from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Shield, ArrowRight, CheckCircle } from 'lucide-react';

const HomePage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="relative mb-6">
            <Shield className="h-16 w-16 text-primary" />
            <div className="absolute inset-0 bg-primary/20 animate-pulse rounded-full -z-10"></div>
          </div>
          <h1 className="text-5xl font-bold mb-4">SafeGuard</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Your personal emergency response system, designed to protect you when you need it most.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4">Safety at Your Fingertips</h2>
            <p className="text-lg text-muted-foreground mb-6">
              SafeGuard uses advanced sound detection, location tracking, and automatic alerts to provide immediate assistance during emergencies.
            </p>
            <div className="space-y-4">
              <FeatureItem text="Automatic sound detection for emergencies" />
              <FeatureItem text="Real-time location tracking" />
              <FeatureItem text="Instant alerts to emergency contacts" />
              <FeatureItem text="Evidence collection through photos and audio" />
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link to="/signup">
                  Get Started
                  <ArrowRight className="ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <Link to="/demo">
                  Try Demo Mode
                  <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="bg-muted rounded-lg p-6 flex items-center justify-center">
            <img 
              src="/placeholder.svg" 
              alt="SafeGuard app interface" 
              className="max-w-full h-auto rounded shadow-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <StatCard 
            title="Users Protected" 
            value="10,000+" 
            description="Active SafeGuard users" 
          />
          <StatCard 
            title="Response Time" 
            value="< 30sec" 
            description="Average emergency response" 
          />
          <StatCard 
            title="Success Rate" 
            value="99.8%" 
            description="Emergencies successfully handled" 
          />
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to feel safer?</h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join thousands of people who trust SafeGuard with their personal safety.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link to="/signup">Sign Up Now</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/features">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const FeatureItem = ({ text }: { text: string }) => (
  <div className="flex items-center gap-2">
    <CheckCircle className="h-5 w-5 text-primary" />
    <span>{text}</span>
  </div>
);

const StatCard = ({ title, value, description }: { 
  title: string; 
  value: string; 
  description: string;
}) => (
  <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
    <h3 className="text-lg font-medium text-muted-foreground">{title}</h3>
    <p className="text-3xl font-bold my-2">{value}</p>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);

export default HomePage;
