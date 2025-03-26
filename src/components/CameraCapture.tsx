
import React, { useState, useEffect } from 'react';
import { Camera, Loader2, Image } from 'lucide-react';

interface CameraCaptureProps {
  isEmergencyActive: boolean;
  onPhotoCaptured: (photoUrl: string) => void;
}

export const CameraCapture: React.FC<CameraCaptureProps> = ({
  isEmergencyActive,
  onPhotoCaptured,
}) => {
  const [isCapturing, setIsCapturing] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Auto-capture photo when emergency is activated
  useEffect(() => {
    if (isEmergencyActive && !photo && !isCapturing) {
      capturePhoto();
    }
  }, [isEmergencyActive]);

  const capturePhoto = async () => {
    if (isCapturing) return;
    
    setIsCapturing(true);
    setError(null);
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment" } 
      });
      
      const video = document.createElement("video");
      video.srcObject = stream;
      
      await new Promise((resolve) => {
        video.onloadedmetadata = () => {
          video.play().then(resolve);
        };
      });
      
      // Wait a short moment to let the camera adjust
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        const photoUrl = canvas.toDataURL("image/png");
        setPhoto(photoUrl);
        onPhotoCaptured(photoUrl);
      }
      
      // Stop all video tracks
      stream.getTracks().forEach(track => track.stop());
      
    } catch (err) {
      console.error('Error capturing photo:', err);
      setError('Camera access denied. Please check permissions.');
    } finally {
      setIsCapturing(false);
    }
  };

  return (
    <div className="card-glass">
      <div className="flex items-center gap-2 mb-4">
        <Camera className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Photo Evidence</h2>
      </div>
      
      {error ? (
        <div className="bg-destructive/10 text-destructive p-3 rounded-lg text-sm">
          {error}
        </div>
      ) : (
        <div className="space-y-4">
          {isCapturing ? (
            <div className="bg-info/10 p-4 rounded-lg flex items-center gap-3">
              <Loader2 className="h-5 w-5 text-info animate-spin" />
              <span className="text-info font-medium">Capturing photo...</span>
            </div>
          ) : photo ? (
            <div className="space-y-2">
              <div className="aspect-video bg-muted rounded-lg overflow-hidden relative">
                <img 
                  src={photo} 
                  alt="Emergency evidence" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                  Evidence Photo
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Photo captured successfully and will be sent with your emergency alert.
              </p>
            </div>
          ) : (
            <div className="bg-muted p-4 rounded-lg flex items-center justify-center">
              <button
                onClick={capturePhoto}
                disabled={isEmergencyActive}
                className={`p-3 rounded-full ${
                  isEmergencyActive 
                    ? 'bg-muted-foreground/20 text-muted-foreground cursor-not-allowed' 
                    : 'bg-primary text-primary-foreground hover:bg-primary/90'
                } transition-colors`}
                aria-label="Take photo"
              >
                {isEmergencyActive ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  <Camera className="h-6 w-6" />
                )}
              </button>
              {isEmergencyActive && (
                <p className="ml-3 text-sm text-muted-foreground">
                  Capturing photo automatically...
                </p>
              )}
            </div>
          )}
          
          {!isCapturing && !photo && !isEmergencyActive && (
            <p className="text-xs text-muted-foreground">
              A photo will be taken automatically when emergency is activated. 
              You can also capture manually by clicking the camera button.
            </p>
          )}
        </div>
      )}
    </div>
  );
};
