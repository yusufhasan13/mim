import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { apiService } from '../utils/api';
import { Check } from 'lucide-react';

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await apiService.getServices();
      setServices(response.data.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page services-page" data-testid="services-page">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="page-title" data-testid="services-title">Our Services</h1>
            <p className="page-subtitle">
              Comprehensive IT & Telecommunication solutions designed to drive your business forward
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="content-section">
        <div className="container">
          {loading ? (
            <div className="loading-spinner" data-testid="services-loading">Loading services...</div>
          ) : (
            <div className="services-detail-grid">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5}>
                    <div className="service-detail-card" data-testid={`service-detail-${index}`}>
                      <div className="service-detail-header">
                        <img src={service.icon} alt={service.title} className="service-detail-icon" />
                        <h3 className="service-detail-title">{service.title}</h3>
                      </div>
                      <p className="service-detail-description">{service.description}</p>
                      <div className="service-features-list">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="feature-item">
                            <Check size={18} className="feature-check" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Tilt>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;