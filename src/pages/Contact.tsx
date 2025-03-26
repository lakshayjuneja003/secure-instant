
import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message sent successfully",
        description: "We'll get back to you as soon as possible.",
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-center mb-2">Contact Us</h1>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto">
            Have questions or feedback? We're here to help. Reach out to our team.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <ContactCard 
            icon={<Mail className="h-8 w-8 text-primary" />}
            title="Email Us"
            details="support@safeguard.com"
            description="We'll respond within 24 hours"
          />
          
          <ContactCard 
            icon={<Phone className="h-8 w-8 text-primary" />}
            title="Call Us"
            details="+1 (555) 123-4567"
            description="Mon-Fri, 9am-5pm EST"
          />
          
          <ContactCard 
            icon={<MapPin className="h-8 w-8 text-primary" />}
            title="Visit Us"
            details="123 Safety Street, Tech City"
            description="CA 94103, United States"
          />
        </div>
        
        <div className="max-w-3xl mx-auto mb-16">
          <div className="card-glass p-8">
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-md border border-border bg-background"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-md border border-border bg-background"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-1">Subject</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded-md border border-border bg-background"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="billing">Billing Question</option>
                  <option value="partnership">Partnership Opportunity</option>
                  <option value="feedback">Product Feedback</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full p-3 rounded-md border border-border bg-background resize-none"
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
        
        <div className="bg-muted p-6 rounded-lg text-center mb-8">
          <h2 className="text-xl font-bold mb-2">Emergency Support</h2>
          <p className="text-muted-foreground mb-4">
            For urgent technical issues with the SafeGuard app during an emergency, 
            call our 24/7 emergency support line.
          </p>
          <a href="tel:+18005551234" className="text-primary font-semibold text-lg">
            1-800-555-1234
          </a>
        </div>
      </div>
    </Layout>
  );
};

const ContactCard = ({ icon, title, details, description }: { 
  icon: React.ReactNode; 
  title: string; 
  details: string;
  description: string;
}) => (
  <div className="card-glass p-6 text-center">
    <div className="mb-4 flex justify-center">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="font-medium mb-1">{details}</p>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);

export default Contact;
