import React from 'react';

const ButtonColorOptions = () => {
  return (
    <div style={{ 
      padding: '4rem 2rem', 
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      minHeight: '100vh'
    }}>
      <h1 style={{ 
        color: '#fff', 
        marginBottom: '1rem', 
        textAlign: 'center',
        fontFamily: 'Plus Jakarta Sans, sans-serif',
        fontSize: '2.5rem'
      }}>
        "Get in Touch" Button Color Options
      </h1>
      <p style={{ 
        color: '#aaa', 
        textAlign: 'center', 
        marginBottom: '4rem',
        fontSize: '1.125rem'
      }}>
        Choose a color that complements the red "Explore Our Services" button
      </p>

      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        
        {/* Reference - Red Button */}
        <div style={{
          padding: '2.5rem',
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '24px',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <p style={{ color: '#888', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            REFERENCE: Current Red Button
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button style={{
              padding: '1rem 2rem',
              borderRadius: '16px',
              border: 'none',
              background: 'linear-gradient(135deg, #CE162F 0%, #E91E45 100%)',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '0.95rem',
              cursor: 'pointer',
              boxShadow: '0 8px 32px rgba(206, 22, 47, 0.4)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              Explore Our Services →
            </button>
          </div>
        </div>

        {/* Option 1: Deep Navy Blue */}
        <div style={{
          padding: '2.5rem',
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '24px',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <p style={{ color: '#888', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            OPTION 1: Deep Navy Blue (Professional & Trustworthy)
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button style={{
              padding: '1rem 2rem',
              borderRadius: '16px',
              border: 'none',
              background: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '0.95rem',
              cursor: 'pointer',
              boxShadow: '0 8px 32px rgba(59, 130, 246, 0.4)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              Get in Touch
            </button>
            <button style={{
              padding: '1rem 2rem',
              borderRadius: '16px',
              border: 'none',
              background: 'linear-gradient(135deg, #CE162F 0%, #E91E45 100%)',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '0.95rem',
              cursor: 'pointer',
              boxShadow: '0 8px 32px rgba(206, 22, 47, 0.4)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              Explore Our Services →
            </button>
          </div>
        </div>

        {/* Option 2: Purple Gradient */}
        <div style={{
          padding: '2.5rem',
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '24px',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <p style={{ color: '#888', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            OPTION 2: Purple Gradient (Creative & Modern)
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button style={{
              padding: '1rem 2rem',
              borderRadius: '16px',
              border: 'none',
              background: 'linear-gradient(135deg, #6B21A8 0%, #A855F7 100%)',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '0.95rem',
              cursor: 'pointer',
              boxShadow: '0 8px 32px rgba(168, 85, 247, 0.4)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              Get in Touch
            </button>
            <button style={{
              padding: '1rem 2rem',
              borderRadius: '16px',
              border: 'none',
              background: 'linear-gradient(135deg, #CE162F 0%, #E91E45 100%)',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '0.95rem',
              cursor: 'pointer',
              boxShadow: '0 8px 32px rgba(206, 22, 47, 0.4)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              Explore Our Services →
            </button>
          </div>
        </div>

        {/* Option 3: Teal/Cyan */}
        <div style={{
          padding: '2.5rem',
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '24px',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <p style={{ color: '#888', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            OPTION 3: Teal/Cyan (Fresh & Tech-Forward)
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button style={{
              padding: '1rem 2rem',
              borderRadius: '16px',
              border: 'none',
              background: 'linear-gradient(135deg, #0891B2 0%, #06B6D4 100%)',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '0.95rem',
              cursor: 'pointer',
              boxShadow: '0 8px 32px rgba(6, 182, 212, 0.4)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              Get in Touch
            </button>
            <button style={{
              padding: '1rem 2rem',
              borderRadius: '16px',
              border: 'none',
              background: 'linear-gradient(135deg, #CE162F 0%, #E91E45 100%)',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '0.95rem',
              cursor: 'pointer',
              boxShadow: '0 8px 32px rgba(206, 22, 47, 0.4)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              Explore Our Services →
            </button>
          </div>
        </div>

        {/* Option 4: Dark Charcoal */}
        <div style={{
          padding: '2.5rem',
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '24px',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <p style={{ color: '#888', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            OPTION 4: Dark Charcoal (Elegant & Neutral)
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button style={{
              padding: '1rem 2rem',
              borderRadius: '16px',
              border: 'none',
              background: 'linear-gradient(135deg, #374151 0%, #4B5563 100%)',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '0.95rem',
              cursor: 'pointer',
              boxShadow: '0 8px 32px rgba(75, 85, 99, 0.4)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              Get in Touch
            </button>
            <button style={{
              padding: '1rem 2rem',
              borderRadius: '16px',
              border: 'none',
              background: 'linear-gradient(135deg, #CE162F 0%, #E91E45 100%)',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '0.95rem',
              cursor: 'pointer',
              boxShadow: '0 8px 32px rgba(206, 22, 47, 0.4)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              Explore Our Services →
            </button>
          </div>
        </div>

        {/* Option 5: Gold/Amber */}
        <div style={{
          padding: '2.5rem',
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '24px',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <p style={{ color: '#888', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            OPTION 5: Gold/Amber (Premium & Warm)
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button style={{
              padding: '1rem 2rem',
              borderRadius: '16px',
              border: 'none',
              background: 'linear-gradient(135deg, #D97706 0%, #FBBF24 100%)',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '0.95rem',
              cursor: 'pointer',
              boxShadow: '0 8px 32px rgba(217, 119, 6, 0.4)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              Get in Touch
            </button>
            <button style={{
              padding: '1rem 2rem',
              borderRadius: '16px',
              border: 'none',
              background: 'linear-gradient(135deg, #CE162F 0%, #E91E45 100%)',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '0.95rem',
              cursor: 'pointer',
              boxShadow: '0 8px 32px rgba(206, 22, 47, 0.4)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              Explore Our Services →
            </button>
          </div>
        </div>

      </div>

      <div style={{ marginTop: '4rem', textAlign: 'center' }}>
        <p style={{ color: '#fff', fontSize: '1.3rem', fontWeight: 600 }}>
          Which color option do you prefer for "Get in Touch"?
        </p>
        <p style={{ color: '#aaa', fontSize: '1rem', marginTop: '1rem' }}>
          Reply with: Option 1, 2, 3, 4, or 5
        </p>
      </div>
    </div>
  );
};

export default ButtonColorOptions;
