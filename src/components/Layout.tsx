
import React, { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isDemo = location.pathname === '/demo';
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 animate-fade-in">
        {children}
      </main>
      {isDemo && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 text-xs text-center text-muted-foreground py-2 px-4 rounded-full glass">
          <span className="mr-1">SafeGuard</span>
          <span className="font-semibold">Demo Mode</span>
        </div>
      )}
    </div>
  );
};
