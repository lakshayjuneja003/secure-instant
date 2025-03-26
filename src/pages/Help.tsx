
import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Plus, Minus, Search, HelpCircle, FileText, Youtube, ExternalLink } from 'lucide-react';

const Help = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  
  const faqs = [
    {
      question: "How does SafeGuard detect emergencies?",
      answer: "SafeGuard uses your device's microphone to detect loud sounds or screams that may indicate an emergency situation. The app also allows you to manually trigger an emergency or use voice commands like 'help' or 'emergency' to activate the emergency protocol."
    },
    {
      question: "Will SafeGuard drain my battery?",
      answer: "SafeGuard is designed to use minimal battery while running in the background. The app optimizes resource usage by only activating full monitoring capabilities when needed. On average, users experience approximately 5-8% additional battery usage per day."
    },
    {
      question: "How do I add emergency contacts?",
      answer: "To add emergency contacts, go to the Settings page and select 'Emergency Contacts'. Tap the '+' button to add a new contact. You can either select from your phone contacts or manually enter details. We recommend adding at least 3 trusted contacts."
    },
    {
      question: "What information is shared with my contacts during an emergency?",
      answer: "During an emergency, SafeGuard shares your real-time location, a link to track your location updates, any photos or audio captured, and the time the emergency was triggered. Contacts receive this information via SMS and email."
    },
    {
      question: "How do I stop an emergency alert once triggered?",
      answer: "To cancel an emergency alert, you need to enter your PIN or use biometric authentication. This security measure ensures that only you can deactivate an emergency. If you're unable to cancel it, your emergency contacts will continue to receive updates."
    },
    {
      question: "Is my data secure with SafeGuard?",
      answer: "Yes, SafeGuard uses end-to-end encryption for all data. Audio recordings, photos, and location data are only shared with your emergency contacts and are not stored on our servers permanently. All temporary data is deleted after 30 days."
    },
    {
      question: "Can SafeGuard work without an internet connection?",
      answer: "SafeGuard has offline capabilities that allow it to record emergency data locally if there's no internet connection. Once connectivity is restored, the app will automatically sync and send alerts to your emergency contacts."
    },
    {
      question: "How accurate is the location tracking?",
      answer: "SafeGuard uses a combination of GPS, Wi-Fi positioning, and cell tower triangulation to provide the most accurate location possible. In optimal conditions, location accuracy is within 5-10 meters. Accuracy may vary based on your device and environment."
    }
  ];
  
  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-center mb-2">Help Center</h1>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about using SafeGuard.
          </p>
        </div>
        
        <div className="mb-10 max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 pl-10 rounded-md border border-border bg-background"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-1">
            <div className="sticky top-4">
              <h2 className="text-xl font-bold mb-4">Help Topics</h2>
              <nav className="space-y-2">
                <HelpLink icon={<HelpCircle className="h-5 w-5" />} text="FAQ" active />
                <HelpLink icon={<FileText className="h-5 w-5" />} text="User Guide" />
                <HelpLink icon={<Youtube className="h-5 w-5" />} text="Video Tutorials" />
                <HelpLink icon={<ExternalLink className="h-5 w-5" />} text="Community Forum" />
              </nav>
            </div>
          </div>
          
          <div className="col-span-3">
            <div className="card-glass p-6">
              <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
              
              {searchQuery && filteredFaqs.length === 0 ? (
                <div className="text-center py-8">
                  <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-lg font-medium">No results found</p>
                  <p className="text-muted-foreground">Try using different keywords or <a href="/contact" className="text-primary">contact support</a>.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredFaqs.map((faq, index) => (
                    <div 
                      key={index} 
                      className="border border-border rounded-lg overflow-hidden"
                    >
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full flex justify-between items-center p-4 text-left"
                      >
                        <span className="font-medium">{faq.question}</span>
                        {expandedFaq === index ? (
                          <Minus className="h-5 w-5 text-primary" />
                        ) : (
                          <Plus className="h-5 w-5 text-primary" />
                        )}
                      </button>
                      
                      {expandedFaq === index && (
                        <div className="p-4 pt-0 text-muted-foreground bg-muted/30">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="bg-muted p-6 rounded-lg text-center">
            <h2 className="text-xl font-bold mb-2">Still need help?</h2>
            <p className="text-muted-foreground mb-4">
              Our support team is ready to assist you with any questions or issues.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="btn-primary">Contact Support</a>
              <a href="tel:+18005551234" className="btn-outline">Call Helpline</a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const HelpLink = ({ icon, text, active = false }: { 
  icon: React.ReactNode; 
  text: string;
  active?: boolean;
}) => (
  <a 
    href="#" 
    className={`flex items-center gap-2 p-2 rounded-md transition-colors ${
      active 
        ? 'bg-primary/10 text-primary font-medium' 
        : 'hover:bg-muted'
    }`}
  >
    {icon}
    {text}
  </a>
);

export default Help;
