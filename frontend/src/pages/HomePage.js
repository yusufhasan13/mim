import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import Tilt from 'react-parallax-tilt';
import { ArrowRight, Globe, Users, Building2, TrendingUp, MessageCircle, Mail, Send, Sparkles } from 'lucide-react';
import { apiService } from '../utils/api';
import BookMeetingPopup from '../components/BookMeetingPopup';

const HomePage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedMobile, setExpandedMobile] = useState(null);
  const [showMeetingPopup, setShowMeetingPopup] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await apiService.getServices();
      setServices(response.data.data); // Show ALL services on homepage
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMobileCardClick = (e, index) => {
    // Check if screen is mobile
    if (window.innerWidth <= 768) {
      if (expandedMobile === index) {
        // Second click - allow navigation
        return;
      } else {
        // First click - expand card, prevent navigation
        e.preventDefault();
        setExpandedMobile(index);
      }
    }
  };

  const stats = [
    { icon: <Building2 />, value: 16, suffix: '+', label: 'Years of Excellence' },
    { icon: <Globe />, value: 20, suffix: '+', label: 'Countries Served' },
    { icon: <Users />, value: 25000, suffix: '+', label: 'Business Users' },
    { icon: <TrendingUp />, value: 30, suffix: 'B+', label: 'SMS per Annum' },
    { icon: <MessageCircle />, value: 90, suffix: 'M+', label: 'WhatsApp per Annum' },
    { icon: <Mail />, value: 20, suffix: 'B+', label: 'Emails per Annum' },
  ];

  return (
    <div className="page home-page" data-testid="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="hero-title" data-testid="hero-title">
              Transforming Businesses
              <span className="hero-title-accent"> Globally</span>
            </h1>
            <p className="hero-subtitle" data-testid="hero-subtitle">
              Leading IT & Telecommunication solutions provider delivering cutting-edge services
              to 25,000+ businesses across the Globe for over 16 years.
            </p>
            <div className="hero-buttons">
              <Link to="/services" className="btn btn-primary" data-testid="hero-cta-services">
                <Sparkles size={20} className="btn-icon" />
                Explore Our Services
              </Link>
              <button 
                onClick={() => setShowMeetingPopup(true)} 
                className="btn btn-secondary" 
                data-testid="hero-cta-contact"
              >
                <Send size={20} className="btn-icon" />
                Let's Talk
              </button>
            </div>
            <div className="hero-badges">
              <span className="badge">100% Bootstrapped</span>
              <span className="badge">ISO Certified</span>
              <span className="badge">GDPR Compliant</span>
            </div>

            {/* Global Presence Ribbon - Inside Glass Card */}
            <div className="global-ribbon-inside">
              <span className="ribbon-text">Global Presence:</span>
              <div className="ribbon-flags">
                <span data-flag="🇮🇳">India</span>
                <span data-flag="🇦🇪">UAE</span>
                <span data-flag="🇨🇦">Canada</span>
                <span data-flag="🇺🇸">USA</span>
                <span data-flag="🇸🇦">KSA</span>
                <span data-flag="🇪🇬">Egypt</span>
                <span data-flag="🇦🇺">Australia</span>
                <span data-flag="🇶🇦">Qatar</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5}>
                  <div className="stat-card" data-testid={`stat-card-${index}`}>
                    <div className="stat-icon">{stat.icon}</div>
                    <div className="stat-value">
                      <CountUp
                        end={stat.value}
                        duration={2.5}
                        separator=","
                        suffix={stat.suffix}
                      />
                    </div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="services-preview-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2 className="section-title">Our Services</h2>
            <p className="section-subtitle">
              Comprehensive IT & Telecommunication solutions for modern businesses
            </p>
          </motion.div>

          {loading ? (
            <div className="loading-spinner" data-testid="services-loading">Loading services...</div>
          ) : (
            <div className="services-grid-expandable">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Link 
                    to="/services" 
                    className="service-card-expandable-link"
                    onClick={(e) => handleMobileCardClick(e, index)}
                  >
                    <div 
                      className={`service-card-expandable ${expandedMobile === index ? 'mobile-expanded' : ''}`}
                      data-testid={`service-card-${index}`}
                    >
                      <div className="service-card-header">
                        <div className="service-icon-large">
                          <img src={service.icon} alt={service.title} />
                        </div>
                        <h3 className="service-title-expandable">{service.title}</h3>
                      </div>
                      
                      <div className="service-card-expanded-content">
                        <p className="service-description-expandable">{service.description}</p>
                        <ul className="service-features-expandable">
                          {service.features.map((feature, idx) => (
                            <li key={idx}>{feature}</li>
                          ))}
                        </ul>
                        <div className="service-explore-btn">
                          <span className="explore-arrow">→</span>
                          <span>Click to Explore All Services</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="cta-content"
          >
            <h2>Ready to Transform Your Business?</h2>
            <p>Join 25,000+ businesses worldwide and experience the power of seamless digital communication.</p>
            <Link to="/contact" className="btn btn-primary btn-lg" data-testid="cta-contact">
              Get Started Today
              <ArrowRight size={24} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;