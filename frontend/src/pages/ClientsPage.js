import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { apiService } from '../utils/api';
import useEmblaCarousel from 'embla-carousel-react';

const ClientsPage = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [emblaRef] = useEmblaCarousel({ loop: true });

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await apiService.getClients();
      setClients(response.data.data);
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setLoading(false);
    }
  };

  // Group clients into rows of 6
  const clientRows = [];
  for (let i = 0; i < clients.length; i += 6) {
    clientRows.push(clients.slice(i, i + 6));
  }

  return (
    <div className="page clients-page" data-testid="clients-page">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="page-title" data-testid="clients-title">Our Clients</h1>
            <p className="page-subtitle">
              Trusted by 25,000+ businesses across the Globe and multiple industries
            </p>
          </motion.div>
        </div>
      </section>

      {/* Industries Section - Above Client Logos */}
      <section className="industries-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Industries We Serve</h2>
            <div className="industries-grid">
              {['Banking & Finance', 'Automotive', 'Retail & Consumer', 'Media & Entertainment', 'Real Estate & Hospitality', 'Pharma & Healthcare', 'Education & Training', 'Food & Beverage'].map((industry, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="industry-card" data-testid={`industry-${index}`}>
                    <h3>{industry}</h3>
                    <p>Customized solutions for your industry needs</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Client Logos Section with New Heading */}
      <section className="content-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Powering the World's Leading Brands</h2>
            <p className="section-subtitle">
              Trusted by industry leaders across the Globe
            </p>
          </motion.div>
          
          {loading ? (
            <div className="loading-spinner" data-testid="clients-loading">Loading clients...</div>
          ) : (
            <div className="clients-grid">
              {clients.map((client, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (index % 18) * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="client-logo-card" data-testid={`client-${index}`}>
                    <img
                      src={client.logo_url}
                      alt={client.name || 'Client logo'}
                      className="client-logo-img"
                      loading="lazy"
                      onError={(e) => {
                        console.log('Failed to load:', client.logo_url);
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ClientsPage;