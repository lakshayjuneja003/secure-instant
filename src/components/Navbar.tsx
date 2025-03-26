
import React from 'react';
import { Shield, Info, Settings, Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const isDemo = location.pathname === '/demo';

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="glass backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border-b border-gray-100 dark:border-gray-800">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 transition-transform hover:scale-[1.02]">
            <div className="relative">
              <Shield className="h-7 w-7 text-primary" />
              <div className="absolute inset-0 bg-primary/20 animate-pulse-emergency rounded-full -z-10"></div>
            </div>
            <span className="font-bold text-xl">SafeGuard</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-foreground/80 hover:text-foreground transition-colors font-medium">Home</Link>
            <Link to="/features" className="text-foreground/80 hover:text-foreground transition-colors font-medium">Features</Link>
            <Link to="/about" className="text-foreground/80 hover:text-foreground transition-colors font-medium">About</Link>
            <Link to="/contact" className="text-foreground/80 hover:text-foreground transition-colors font-medium">Contact</Link>
            <Link to="/demo" className="text-foreground/80 hover:text-foreground transition-colors font-medium">Demo</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/help" className="hidden md:flex p-2 rounded-full hover:bg-secondary transition-colors" aria-label="Help">
              <Info className="h-5 w-5" />
            </Link>
            <Link to="/settings" className="hidden md:flex p-2 rounded-full hover:bg-secondary transition-colors" aria-label="Settings">
              <Settings className="h-5 w-5" />
            </Link>
            <button className="md:hidden p-2 rounded-full hover:bg-secondary transition-colors" aria-label="Menu">
              <Menu className="h-5 w-5" />
            </button>
            <Link to="/signup" className="hidden md:flex btn-primary">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
      {isDemo && (
        <div className="bg-amber-500/10 text-amber-800 dark:text-amber-300 text-center py-1 text-sm font-medium">
          Demo Mode - Try out SafeGuard features in this simulated environment
        </div>
      )}
    </header>
  );
};
