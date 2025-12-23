import React, { useState, useEffect, useRef } from 'react';

/**
 * BackgroundVideo Component
 * Displays a rotating playlist of beautiful Kolkata videos
 * 
 * Features:
 * - Cycles through multiple HD videos
 * - Smooth transitions between videos
 * - Responsive video background
 * - Light overlay for content readability
 * - Kolkata-themed aesthetic
 */
const BackgroundVideo = ({ children, className = '' }) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef(null);
  
  // Your HD Kolkata videos playlist
  const videoPlaylist = [
    '/videos/602447_Cities_City_3840x2160.mp4',
    '/videos/14316794_1920_1080_30fps.mp4',
    '/videos/14623878_1920_1080_25fps.mp4'
  ];

  // Handle video end - move to next video
  const handleVideoEnd = () => {
    setCurrentVideoIndex((prevIndex) => 
      (prevIndex + 1) % videoPlaylist.length
    );
  };

  // Update video source when index changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load(); // Reload the video element with new source
    }
  }, [currentVideoIndex]);

  return (
    <div className={`relative ${className}`}>
      {/* Video Background */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover transition-opacity duration-1000"
          onEnded={handleVideoEnd}
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800'%3E%3Cdefs%3E%3ClinearGradient id='bg' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23fcdb03;stop-opacity:0.1'/%3E%3Cstop offset='100%25' style='stop-color:%23d2691e;stop-opacity:0.1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23bg)'/%3E%3Cpath d='M0,400 Q300,200 600,400 T1200,400 L1200,800 L0,800 Z' fill='%23fcdb03' opacity='0.05'/%3E%3C/svg%3E"
        >
          {/* Current video from playlist */}
          <source 
            src={videoPlaylist[currentVideoIndex]} 
            type="video/mp4" 
          />
          {/* Your browser does not support the video tag */}
        </video>
        
        {/* Light overlay for content readability - much more transparent */}
        <div className="absolute inset-0 bg-gradient-to-b from-kolkata-white/30 via-kolkata-white/20 to-kolkata-white/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default BackgroundVideo;