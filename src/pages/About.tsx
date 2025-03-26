
import React from 'react';
import { Layout } from '../components/Layout';
import { Shield, Heart, Users, Award } from 'lucide-react';

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-center mb-2">About SafeGuard</h1>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto">
            Our mission is to empower individuals with technology that enhances personal safety and provides peace of mind.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              Our Story
            </h2>
            <p className="text-muted-foreground mb-4">
              SafeGuard was founded in 2023 by a team of technology professionals who were concerned about the rising 
              safety challenges faced by individuals in urban environments.
            </p>
            <p className="text-muted-foreground mb-4">
              After a close friend experienced a safety incident with no quick way to alert others, our team was inspired 
              to create a solution that would utilize smartphone capabilities to provide comprehensive emergency response features.
            </p>
            <p className="text-muted-foreground">
              Today, SafeGuard is used by thousands of people worldwide who rely on our technology to feel safer in their daily lives.
            </p>
          </div>
          
          <div className="bg-muted rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Our Values</h2>
            
            <div className="space-y-4">
              <div className="flex gap-3">
                <Heart className="h-6 w-6 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold">Empathy First</h3>
                  <p className="text-sm text-muted-foreground">We design our solutions with genuine understanding of safety concerns.</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Shield className="h-6 w-6 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold">Privacy & Security</h3>
                  <p className="text-sm text-muted-foreground">We protect your personal data with the highest standards of security.</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Users className="h-6 w-6 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold">Inclusivity</h3>
                  <p className="text-sm text-muted-foreground">Our solutions are designed for everyone, regardless of technical ability.</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Award className="h-6 w-6 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold">Reliability</h3>
                  <p className="text-sm text-muted-foreground">Our technology is built to work when you need it most.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Meet Our Team</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { name: "Alex Thompson", role: "Founder & CEO", avatar: "AT" },
              { name: "Jamie Rivera", role: "Chief Technology Officer", avatar: "JR" },
              { name: "Sam Washington", role: "Head of Product", avatar: "SW" },
              { name: "Taylor Kim", role: "Lead Developer", avatar: "TK" }
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-24 h-24 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xl font-bold mx-auto mb-3">
                  {member.avatar}
                </div>
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-muted p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Join Our Mission</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            We're always looking for talented individuals who are passionate about using technology to improve safety. 
            Check out our open positions or get in touch to learn more.
          </p>
          <a href="/contact" className="btn-primary inline-block">Contact Us</a>
        </div>
      </div>
    </Layout>
  );
};

export default About;
