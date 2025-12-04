import React, { useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';
import * as THREE from 'three';

const InteractiveGlobe = () => {
  const globeEl = useRef();

  // Global presence locations
  const locations = [
    { lat: 19.0760, lng: 72.8777, name: 'Mumbai, India', size: 1.5 },
    { lat: 28.7041, lng: 77.1025, name: 'Delhi, India', size: 1.2 },
    { lat: 12.9716, lng: 77.5946, name: 'Bangalore, India', size: 1.2 },
    { lat: 17.3850, lng: 78.4867, name: 'Hyderabad, India', size: 1.0 },
    { lat: 25.2048, lng: 55.2708, name: 'Dubai, UAE', size: 1.3 },
    { lat: 43.6532, lng: -79.3832, name: 'Toronto, Canada', size: 1.2 },
    { lat: 40.7128, lng: -74.0060, name: 'New York, USA', size: 1.3 },
    { lat: 24.7136, lng: 46.6753, name: 'Riyadh, KSA', size: 1.2 },
    { lat: 30.0444, lng: 31.2357, name: 'Cairo, Egypt', size: 1.2 },
    { lat: -33.8688, lng: 151.2093, name: 'Sydney, Australia', size: 1.2 },
    { lat: 25.2854, lng: 51.5310, name: 'Doha, Qatar', size: 1.0 },
  ];

  // Create arcs from Mumbai hub to all locations
  const arcs = [];
  const hubIndex = 0;
  for (let i = 1; i < locations.length; i++) {
    arcs.push({
      startLat: locations[hubIndex].lat,
      startLng: locations[hubIndex].lng,
      endLat: locations[i].lat,
      endLng: locations[i].lng,
      color: '#FF1B8D'
    });
  }

  useEffect(() => {
    if (globeEl.current) {
      const controls = globeEl.current.controls();
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.4;
      controls.enableZoom = false;
      controls.enablePan = false;
      controls.minPolarAngle = Math.PI / 3.5;
      controls.maxPolarAngle = Math.PI - Math.PI / 3;
      
      globeEl.current.pointOfView({ lat: 20, lng: 50, altitude: 2 }, 0);
    }
  }, []);

  return (
    <div className="globe-container-hero" data-testid="interactive-globe">
      <Globe
        ref={globeEl}
        
        // Hex binning for dotted mesh pattern
        hexPolygonsData={[]}
        hexPolygonResolution={3}
        hexPolygonMargin={0.3}
        
        // Points layer (bright cyan markers)
        pointsData={locations}
        pointAltitude={0.01}
        pointRadius={d => d.size * 0.15}
        pointColor={() => '#00D9FF'}
        pointsMerge={true}
        
        // Arcs layer (pink/magenta)
        arcsData={arcs}
        arcColor="color"
        arcDashLength={1}
        arcDashGap={0.5}
        arcDashAnimateTime={2000}
        arcStroke={0.8}
        arcAltitudeAutoScale={0.5}
        
        // Rings (pulsing circles at locations)
        ringsData={locations}
        ringColor={() => '#FF1B8D'}
        ringMaxRadius={2}
        ringPropagationSpeed={1.5}
        ringRepeatPeriod={2000}
        ringAltitude={0.01}
        
        // Atmosphere (cyan/blue glow)
        atmosphereColor="#00D9FF"
        atmosphereAltitude={0.25}
        
        // Globe material - purple/blue
        globeMaterial={
          new THREE.MeshPhongMaterial({
            color: '#3B2F87',
            emissive: '#1a1444',
            emissiveIntensity: 0.4,
            shininess: 0.7,
            transparent: true,
            opacity: 0.9
          })
        }
        
        // Show as dots pattern (like GitHub globe)
        showAtmosphere={true}
        showGraticules={false}
        
        width={typeof window !== 'undefined' ? Math.min(window.innerWidth, 1000) : 1000}
        height={typeof window !== 'undefined' ? Math.min(window.innerHeight, 1000) : 1000}
      />
    </div>
  );
};

export default InteractiveGlobe;
