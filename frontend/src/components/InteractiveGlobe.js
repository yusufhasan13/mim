import React, { useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';
import * as THREE from 'three';

const InteractiveGlobe = () => {
  const globeEl = useRef();

  // Global presence locations for My Inbox Media
  const locations = [
    // India (Hub)
    { lat: 19.0760, lng: 72.8777, name: 'Mumbai, India', size: 1.2, color: '#00D9FF' },
    { lat: 28.7041, lng: 77.1025, name: 'Delhi, India', size: 0.9, color: '#00D9FF' },
    { lat: 12.9716, lng: 77.5946, name: 'Bangalore, India', size: 0.9, color: '#00D9FF' },
    { lat: 17.3850, lng: 78.4867, name: 'Hyderabad, India', size: 0.8, color: '#00D9FF' },
    
    // UAE
    { lat: 25.2048, lng: 55.2708, name: 'Dubai, UAE', size: 1.0, color: '#00D9FF' },
    
    // Canada
    { lat: 43.6532, lng: -79.3832, name: 'Toronto, Canada', size: 0.9, color: '#00D9FF' },
    
    // USA
    { lat: 40.7128, lng: -74.0060, name: 'New York, USA', size: 1.0, color: '#00D9FF' },
    
    // KSA
    { lat: 24.7136, lng: 46.6753, name: 'Riyadh, KSA', size: 0.9, color: '#00D9FF' },
    
    // Egypt
    { lat: 30.0444, lng: 31.2357, name: 'Cairo, Egypt', size: 0.9, color: '#00D9FF' },
    
    // Australia
    { lat: -33.8688, lng: 151.2093, name: 'Sydney, Australia', size: 0.9, color: '#00D9FF' },
    
    // Qatar
    { lat: 25.2854, lng: 51.5310, name: 'Doha, Qatar', size: 0.8, color: '#00D9FF' },
  ];

  // Create arcs between locations to show global connectivity
  const arcs = [];
  const hubIndex = 0; // Mumbai as main hub
  for (let i = 1; i < locations.length; i++) {
    arcs.push({
      startLat: locations[hubIndex].lat,
      startLng: locations[hubIndex].lng,
      endLat: locations[i].lat,
      endLng: locations[i].lng,
      color: ['#FF1B8D', '#FF1B8D'] // Hot pink/magenta like in the video
    });
  }

  useEffect(() => {
    if (globeEl.current) {
      // Auto-rotate slowly
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.3;
      globeEl.current.controls().enableZoom = false;
      
      // Set initial view - focus on Asia/Middle East
      globeEl.current.pointOfView({ lat: 25, lng: 60, altitude: 2.2 }, 0);
    }
  }, []);

  return (
    <div className="globe-container-hero" data-testid="interactive-globe">
      <Globe
        ref={globeEl}
        
        // Use hexbin (dotted pattern) instead of image
        hexBinPointsData={locations}
        hexBinPointWeight="size"
        hexBinResolution={3}
        hexBinMargin={0.6}
        hexBinColor={() => '#4169E1'}
        
        // Points layer (bright markers)
        pointsData={locations}
        pointAltitude={0.02}
        pointRadius={d => d.size * 0.3}
        pointColor="color"
        pointLabel={d => `
          <div style="
            background: rgba(0, 0, 0, 0.9); 
            padding: 10px 16px; 
            border-radius: 12px; 
            color: white; 
            font-family: Inter, sans-serif; 
            font-size: 14px; 
            font-weight: 600;
            border: 1px solid rgba(0, 217, 255, 0.3);
            backdrop-filter: blur(12px);
          ">
            ${d.name}
          </div>
        `}
        
        // Arcs layer (pink/magenta connections)
        arcsData={arcs}
        arcColor="color"
        arcDashLength={0.6}
        arcDashGap={0.3}
        arcDashAnimateTime={2000}
        arcStroke={1.5}
        arcAltitudeAutoScale={0.3}
        
        // Rings layer (pulsing effect at locations)
        ringsData={locations}
        ringColor={() => '#FF1B8D'}
        ringMaxRadius={3}
        ringPropagationSpeed={2}
        ringRepeatPeriod={1500}
        
        // Atmosphere (blue glow)
        atmosphereColor="#00D9FF"
        atmosphereAltitude={0.2}
        
        // Globe material - purple/blue gradient
        globeMaterial={
          new THREE.MeshPhongMaterial({
            color: '#3B2F87',
            emissive: '#1a1444',
            emissiveIntensity: 0.3,
            shininess: 0.9,
            transparent: true,
            opacity: 0.95
          })
        }
        
        // Background
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        
        width={900}
        height={900}
      />
    </div>
  );
};

export default InteractiveGlobe;
