
import React from 'react';
import { Shield, ArrowLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const NotFound = () => {
  const location = useLocation();

  React.useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="card-glass max-w-md w-full py-10 px-8 text-center">
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <Shield className="h-16 w-16 text-primary" />
            <div className="absolute inset-0 bg-primary/20 animate-pulse rounded-full -z-10"></div>
          </div>
        </div>
        
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <p className="text-xl mb-8">Page not found</p>
        
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Link to="/" className="btn-primary inline-flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
