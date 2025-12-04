import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { apiService } from '../utils/api';
import { Star, Quote } from 'lucide-react';

const TestimonialsPage = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await apiService.getTestimonials({ published_only: true });
      setTestimonials(response.data.data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page testimonials-page" data-testid="testimonials-page">
      <section className="page-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="page-title" data-testid="testimonials-title">Client Testimonials</h1>
            <p className="page-subtitle">
              Hear what our clients have to say about working with My Inbox Media®
            </p>
          </motion.div>
        </div>
      </section>

      <section className="content-section">
        <div className="container">
          {loading ? (
            <div className="loading-spinner" data-testid="testimonials-loading">Loading testimonials...</div>
          ) : testimonials.length === 0 ? (
            <div className="empty-state" data-testid="testimonials-empty">
              <p>No testimonials available yet. Check back soon!</p>
            </div>
          ) : (
            <div className="testimonials-grid">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <div className="testimonial-card" data-testid={`testimonial-${index}`}>
                    <Quote className="testimonial-quote-icon" size={40} />
                    <div className="testimonial-rating">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          size={18}
                          fill={i < testimonial.rating ? '#E55227' : 'none'}
                          stroke={i < testimonial.rating ? '#E55227' : '#D1D5DB'}
                        />
                      ))}
                    </div>
                    <p className="testimonial-text">{testimonial.testimonial_text}</p>
                    <div className="testimonial-author">
                      {testimonial.client_image && (
                        <img src={testimonial.client_image} alt={testimonial.client_name} className="testimonial-avatar" />
                      )}
                      <div>
                        <h4>{testimonial.client_name}</h4>
                        <p>{testimonial.client_position}</p>
                        <p className="testimonial-company">{testimonial.client_company}</p>
                      </div>
                    </div>
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

export default TestimonialsPage;