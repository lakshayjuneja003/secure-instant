
import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Shield, Eye, EyeOff, CheckCircle2, ArrowRight } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
    window.scrollTo(0, 0);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Account created successfully",
        description: "Welcome to SafeGuard! Your account has been set up.",
      });
      // In a real app, you would redirect to the login page or dashboard
    }, 1500);
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <Shield className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-2">Create Your SafeGuard Account</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join thousands of users who trust SafeGuard for their personal safety.
          </p>
        </div>
        
        <div className="max-w-xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center w-full mb-4">
              <div className="w-full flex items-center after:content-[''] after:block after:w-full after:h-1 after:bg-muted">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full z-10 ${step >= 1 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
                  1
                </div>
              </div>
              <div className="w-full flex items-center after:content-[''] after:block after:w-full after:h-1 after:bg-muted">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full z-10 ${step >= 2 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
                  2
                </div>
              </div>
              <div className="w-10 h-10 rounded-full flex items-center justify-center z-10 bg-muted text-muted-foreground">
                3
              </div>
            </div>
            <h2 className="text-xl font-semibold">
              {step === 1 ? 'Personal Information' : 'Create Account'}
            </h2>
          </div>
          
          <div className="card-glass p-8">
            {step === 1 ? (
              <form onSubmit={handleNextStep} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium mb-1">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full p-3 rounded-md border border-border bg-background"
                      placeholder="Enter your first name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium mb-1">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full p-3 rounded-md border border-border bg-background"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-md border border-border bg-background"
                    placeholder="Enter your phone number"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    We'll send verification code to this number
                  </p>
                </div>
                
                <button
                  type="submit"
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
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
                    placeholder="Enter your email address"
                  />
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full p-3 rounded-md border border-border bg-background"
                      placeholder="Create a password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <Eye className="h-5 w-5 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">Confirm Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-md border border-border bg-background"
                    placeholder="Confirm your password"
                  />
                </div>
                
                <div className="pt-2">
                  <h3 className="font-medium mb-2">Password Requirements:</h3>
                  <ul className="space-y-1">
                    <PasswordRequirement 
                      met={formData.password.length >= 8} 
                      text="At least 8 characters" 
                    />
                    <PasswordRequirement 
                      met={/[A-Z]/.test(formData.password)} 
                      text="At least one uppercase letter" 
                    />
                    <PasswordRequirement 
                      met={/[0-9]/.test(formData.password)} 
                      text="At least one number" 
                    />
                    <PasswordRequirement 
                      met={formData.password === formData.confirmPassword && formData.password !== ''} 
                      text="Passwords match" 
                    />
                  </ul>
                </div>
                
                <div className="pt-2">
                  <label className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      required
                      className="mt-1"
                    />
                    <span className="text-sm">
                      I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                    </span>
                  </label>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <Shield className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
          
          <div className="text-center mt-6">
            <p className="text-muted-foreground">
              Already have an account? <a href="#" className="text-primary hover:underline">Sign in</a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const PasswordRequirement = ({ met, text }: { met: boolean; text: string }) => (
  <li className="flex items-center gap-2 text-sm">
    <CheckCircle2 className={`h-4 w-4 ${met ? 'text-green-500' : 'text-muted-foreground'}`} />
    <span className={met ? 'text-green-700 dark:text-green-400' : 'text-muted-foreground'}>
      {text}
    </span>
  </li>
);

export default Signup;
