
import React, { useState } from 'react';
import { AlertTriangle, Shield } from 'lucide-react';
import { vibrate } from '../utils/emergencyUtils';

interface EmergencyButtonProps {
  isActive: boolean;
  onActivate: () => void;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const EmergencyButton: React.FC<EmergencyButtonProps> = ({
  isActive,
  onActivate,
  size = 'md',
  fullWidth = false,
}) => {
  const [isPressed, setIsPressed] = useState(false);
  
  const handlePressStart = () => {
    setIsPressed(true);
  };
  
  const handlePressEnd = () => {
    setIsPressed(false);
  };
  
  const handleClick = () => {
    if (!isActive) {
      vibrate([100, 50, 200]);
      onActivate();
    }
  };
  
  const sizeClasses = {
    sm: 'h-12 text-sm',
    md: 'h-14 text-base',
    lg: 'h-16 text-lg',
  };
  
  return (
    <button
      disabled={isActive}
      className={`relative overflow-hidden rounded-full font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
        fullWidth ? 'w-full' : 'px-6'
      } ${sizeClasses[size]} ${
        isActive
          ? 'bg-emergency-dark text-white cursor-default'
          : 'bg-emergency text-white hover:bg-emergency-hover active:scale-[0.98]'
      } ${isPressed ? 'scale-[0.98]' : ''}`}
      onMouseDown={handlePressStart}
      onMouseUp={handlePressEnd}
      onMouseLeave={handlePressEnd}
      onTouchStart={handlePressStart}
      onTouchEnd={handlePressEnd}
      onClick={handleClick}
    >
      {/* Ripple effect */}
      {isPressed && !isActive && (
        <span className="absolute inset-0 bg-white/20 animate-ripple rounded-full"></span>
      )}
      
      {/* Button content */}
      {isActive ? (
        <>
          <span className="h-2 w-2 rounded-full bg-white/80 animate-flash"></span>
          Emergency Mode Active
        </>
      ) : (
        <>
          <AlertTriangle className="h-5 w-5" />
          Activate Emergency
        </>
      )}
      
      {/* Active glow effect */}
      {isActive && (
        <div className="absolute inset-0 -z-10 bg-emergency-dark animate-pulse-emergency rounded-full"></div>
      )}
    </button>
  );
};
