import React, { useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';
import * as THREE from 'three';

const InteractiveGlobe = () => {
  const globeEl = useRef();

  // Global presence locations for My Inbox Media
  const locations = [
    // India
    { lat: 19.0760, lng: 72.8777, name: 'Mumbai, India', size: 0.8, color: '#CE162F' },
    { lat: 28.7041, lng: 77.1025, name: 'Delhi, India', size: 0.7, color: '#CE162F' },
    { lat: 12.9716, lng: 77.5946, name: 'Bangalore, India', size: 0.7, color: '#CE162F' },
    { lat: 17.3850, lng: 78.4867, name: 'Hyderabad, India', size: 0.6, color: '#CE162F' },
    
    // UAE
    { lat: 25.2048, lng: 55.2708, name: 'Dubai, UAE', size: 0.8, color: '#CE162F' },
    
    // Canada
    { lat: 43.6532, lng: -79.3832, name: 'Toronto, Canada', size: 0.7, color: '#CE162F' },
    
    // USA
    { lat: 40.7128, lng: -74.0060, name: 'New York, USA', size: 0.8, color: '#CE162F' },
    { lat: 37.7749, lng: -122.4194, name: 'San Francisco, USA', size: 0.6, color: '#CE162F' },
    
    // KSA
    { lat: 24.7136, lng: 46.6753, name: 'Riyadh, KSA', size: 0.7, color: '#CE162F' },
    
    // Egypt
    { lat: 30.0444, lng: 31.2357, name: 'Cairo, Egypt', size: 0.7, color: '#CE162F' },
    
    // Australia
    { lat: -33.8688, lng: 151.2093, name: 'Sydney, Australia', size: 0.7, color: '#CE162F' },
    
    // Qatar
    { lat: 25.2854, lng: 51.5310, name: 'Doha, Qatar', size: 0.6, color: '#CE162F' },
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
      color: ['rgba(206, 22, 47, 0.6)', 'rgba(30, 42, 68, 0.4)']
    });
  }

  useEffect(() => {
    if (globeEl.current) {
      // Auto-rotate
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.5;
      globeEl.current.controls().enableZoom = false;
      
      // Set initial view
      globeEl.current.pointOfView({ lat: 20, lng: 20, altitude: 2.5 }, 1000);
    }
  }, []);

  // Create globe material
  const globeMaterial = new THREE.MeshPhongMaterial({
    color: '#1E2A44',
    emissive: '#0a0a0f',
    emissiveIntensity: 0.1,
    shininess: 0.5
  });

  return (
    <div className="globe-container" data-testid="interactive-globe">
      <Globe
        ref={globeEl}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        
        // Points layer
        pointsData={locations}
        pointAltitude={0.01}
        pointRadius={d => d.size}
        pointColor="color"
        pointLabel={d => `<div style="background: rgba(0,0,0,0.8); padding: 8px 12px; border-radius: 8px; color: white; font-family: Inter, sans-serif; font-size: 13px; backdrop-filter: blur(8px);">${d.name}</div>`}
        
        // Arcs layer
        arcsData={arcs}
        arcColor="color"
        arcDashLength={0.4}
        arcDashGap={0.2}
        arcDashAnimateTime={1500}
        arcStroke={0.5}
        
        // Atmosphere
        atmosphereColor="rgba(206, 22, 47, 0.3)"
        atmosphereAltitude={0.15}
        
        // Custom globe material
        globeMaterial={globeMaterial}
        
        width={600}
        height={600}
      />
    </div>
  );
};

export default InteractiveGlobe;
