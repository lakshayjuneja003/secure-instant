
import React, { useEffect, useRef } from 'react';
import { MapPin, Navigation } from 'lucide-react';

interface LocationMapProps {
  location: { lat: string; lng: string } | null;
  isEmergencyActive: boolean;
}

export const LocationMap: React.FC<LocationMapProps> = ({ location, isEmergencyActive }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!mapRef.current || !location) return;
    
    // In a real app, this would use Google Maps, Mapbox, or another mapping service
    // For the demo, we'll just use a placeholder with the coordinates
    const renderMap = () => {
      if (!mapRef.current) return;
      
      // Clear previous content
      mapRef.current.innerHTML = '';
      
      // Create simulated map elements
      const mapContainer = document.createElement('div');
      mapContainer.className = 'relative w-full h-full rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700';
      
      // Add grid lines to simulate a map
      for (let i = 0; i < 5; i++) {
        const horizontalLine = document.createElement('div');
        horizontalLine.className = 'absolute w-full h-px bg-gray-300/30 dark:bg-gray-600/30';
        horizontalLine.style.top = `${i * 25}%`;
        mapContainer.appendChild(horizontalLine);
        
        const verticalLine = document.createElement('div');
        verticalLine.className = 'absolute h-full w-px bg-gray-300/30 dark:bg-gray-600/30';
        verticalLine.style.left = `${i * 25}%`;
        mapContainer.appendChild(verticalLine);
      }
      
      // Add marker at center
      const marker = document.createElement('div');
      marker.className = 'absolute transform -translate-x-1/2 -translate-y-1/2';
      marker.style.left = '50%';
      marker.style.top = '50%';
      
      const pin = document.createElement('div');
      pin.className = `h-10 w-10 flex items-center justify-center relative ${
        isEmergencyActive ? 'text-emergency' : 'text-primary'
      }`;
      
      // Add pulse effect for emergency mode
      if (isEmergencyActive) {
        const pulse = document.createElement('div');
        pulse.className = 'absolute inset-0 rounded-full bg-emergency/20 animate-pulse-emergency';
        pin.appendChild(pulse);
      }
      
      const pinIcon = document.createElement('div');
      pinIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>`;
      pin.appendChild(pinIcon);
      
      marker.appendChild(pin);
      mapContainer.appendChild(marker);
      
      // Add coordinates text
      const coords = document.createElement('div');
      coords.className = 'absolute bottom-2 left-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-xs font-mono p-1 rounded';
      coords.textContent = `${location.lat}, ${location.lng}`;
      mapContainer.appendChild(coords);
      
      // Add compass
      const compass = document.createElement('div');
      compass.className = 'absolute top-2 right-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-2 rounded-full';
      compass.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>`;
      mapContainer.appendChild(compass);
      
      mapRef.current.appendChild(mapContainer);
    };
    
    renderMap();
  }, [location, isEmergencyActive]);
  
  return (
    <div className="card-glass">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Location</h2>
        </div>
        <div className="flex items-center text-xs text-muted-foreground">
          {location ? (
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-muted">
              <Navigation className="h-3 w-3" />
              <span className="font-medium">Current Location</span>
            </div>
          ) : (
            <div className="px-2 py-1 rounded-full bg-muted">Unavailable</div>
          )}
        </div>
      </div>
      
      <div className="relative rounded-lg overflow-hidden bg-muted h-[200px]" ref={mapRef}>
        {!location && (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            Location data unavailable
          </div>
        )}
      </div>
    </div>
  );
};
