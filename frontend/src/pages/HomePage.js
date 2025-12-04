import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import Tilt from 'react-parallax-tilt';
import { ArrowRight, Globe, Users, Building2, TrendingUp } from 'lucide-react';
import { apiService } from '../utils/api';

const HomePage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const stats = [
    { icon: <Building2 />, value: 16, suffix: '+', label: 'Years of Excellence' },
    { icon: <Globe />, value: 20, suffix: '+', label: 'Countries Served' },
    { icon: <Users />, value: 25000, suffix: '+', label: 'Business Users' },
    { icon: <TrendingUp />, value: 30, suffix: 'B+', label: 'SMS per Annum' },
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
              to 25,000+ businesses across 20+ countries for over 16 years.
            </p>
            <div className="hero-buttons">
              <Link to="/services" className="btn btn-primary" data-testid="hero-cta-services">
                Explore Our Services
                <ArrowRight size={20} />
              </Link>
              <Link to="/contact" className="btn btn-secondary" data-testid="hero-cta-contact">
                Get in Touch
              </Link>
            </div>
            <div className="hero-badges">
              <span className="badge">100% Bootstrapped</span>
              <span className="badge">ISO Certified</span>
              <span className="badge">GDPR Compliant</span>
            </div>
          </motion.div>
        </div>

        {/* Global Presence Ribbon */}
        <div className="global-ribbon">
          <span className="ribbon-text">Global Presence:</span>
          <div className="ribbon-flags">
            <span>🇮🇳 India</span>
            <span>🇦🇪 UAE</span>
            <span>🇨🇦 Canada</span>
            <span>🇺🇸 USA</span>
            <span>🇸🇦 KSA</span>
            <span>🇪🇬 Egypt</span>
            <span>🇦🇺 Australia</span>
            <span>🇶🇦 Qatar</span>
          </div>
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
            <div className="services-grid">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10}>
                    <div className="service-card" data-testid={`service-card-${index}`}>
                      <div className="service-icon">{service.icon}</div>
                      <h3 className="service-title">{service.title}</h3>
                      <p className="service-description">{service.description}</p>
                      <ul className="service-features">
                        {service.features.slice(0, 3).map((feature, idx) => (
                          <li key={idx}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  </Tilt>
                </motion.div>
              ))}
            </div>
          )}

          <div className="section-cta">
            <Link to="/services" className="btn btn-primary" data-testid="view-all-services">
              View All Services
              <ArrowRight size={20} />
            </Link>
          </div>
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