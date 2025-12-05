import React from 'react';

const FontSamples = () => {
  return (
    <div style={{ padding: '3rem', background: '#000' }}>
      <h1 style={{ color: '#fff', marginBottom: '3rem', textAlign: 'center' }}>
        Font Samples for "Transforming Businesses Globally"
      </h1>
      
      {/* Sample 1: Poppins */}
      <div style={{ 
        marginBottom: '4rem', 
        padding: '3rem', 
        background: 'rgba(255,255,255,0.05)',
        borderRadius: '24px',
        backdropFilter: 'blur(20px)'
      }}>
        <p style={{ color: '#888', marginBottom: '1rem', fontSize: '0.9rem' }}>
          Option 1: Poppins (Modern, Clean, Tech-friendly)
        </p>
        <h2 style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: 'clamp(2rem, 6vw, 4.5rem)',
          fontWeight: 900,
          color: '#FFFFFF',
          letterSpacing: '-0.03em',
          textAlign: 'center',
          margin: 0
        }}>
          Transforming Businesses Globally
        </h2>
      </div>

      {/* Sample 2: Plus Jakarta Sans */}
      <div style={{ 
        marginBottom: '4rem', 
        padding: '3rem', 
        background: 'rgba(255,255,255,0.05)',
        borderRadius: '24px',
        backdropFilter: 'blur(20px)'
      }}>
        <p style={{ color: '#888', marginBottom: '1rem', fontSize: '0.9rem' }}>
          Option 2: Plus Jakarta Sans (Contemporary, Professional)
        </p>
        <h2 style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 'clamp(2rem, 6vw, 4.5rem)',
          fontWeight: 900,
          color: '#FFFFFF',
          letterSpacing: '-0.04em',
          textAlign: 'center',
          margin: 0
        }}>
          Transforming Businesses Globally
        </h2>
      </div>

      {/* Sample 3: Manrope */}
      <div style={{ 
        padding: '3rem', 
        background: 'rgba(255,255,255,0.05)',
        borderRadius: '24px',
        backdropFilter: 'blur(20px)'
      }}>
        <p style={{ color: '#888', marginBottom: '1rem', fontSize: '0.9rem' }}>
          Option 3: Manrope (Geometric, Bold, Distinctive)
        </p>
        <h2 style={{
          fontFamily: "'Manrope', sans-serif",
          fontSize: 'clamp(2rem, 6vw, 4.5rem)',
          fontWeight: 900,
          color: '#FFFFFF',
          letterSpacing: '-0.02em',
          textAlign: 'center',
          margin: 0
        }}>
          Transforming Businesses Globally
        </h2>
      </div>

      <div style={{ marginTop: '3rem', textAlign: 'center' }}>
        <p style={{ color: '#fff', fontSize: '1.2rem' }}>
          Which font do you prefer? Option 1, 2, or 3?
        </p>
      </div>
    </div>
  );
};

export default FontSamples;
