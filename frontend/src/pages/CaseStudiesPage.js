import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { apiService } from '../utils/api';
import { Building2, ArrowRight } from 'lucide-react';

const CaseStudiesPage = () => {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  const fetchCaseStudies = async () => {
    try {
      const response = await apiService.getCaseStudies({ published_only: true });
      setCaseStudies(response.data.data);
    } catch (error) {
      console.error('Error fetching case studies:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page case-studies-page" data-testid="case-studies-page">
      <section className="page-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="page-title" data-testid="case-studies-title">Case Studies</h1>
            <p className="page-subtitle">
              Real-world success stories showcasing how we've helped businesses transform
            </p>
          </motion.div>
        </div>
      </section>

      <section className="content-section">
        <div className="container">
          {loading ? (
            <div className="loading-spinner" data-testid="case-studies-loading">Loading case studies...</div>
          ) : caseStudies.length === 0 ? (
            <div className="empty-state" data-testid="case-studies-empty">
              <p>No case studies available yet. Check back soon!</p>
            </div>
          ) : (
            <div className="case-studies-grid">
              {caseStudies.map((study, index) => (
                <motion.div
                  key={study.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Link
                    to={`/case-studies/${study.slug}`}
                    className="case-study-card"
                    data-testid={`case-study-${index}`}
                  >
                    {study.featured_image && (
                      <img src={study.featured_image} alt={study.title} className="case-study-image" />
                    )}
                    <div className="case-study-content">
                      <div className="case-study-header">
                        <Building2 size={20} />
                        <span className="case-study-industry">{study.industry}</span>
                      </div>
                      <h3 className="case-study-title">{study.title}</h3>
                      <p className="case-study-client">{study.client_name}</p>
                      <span className="case-study-link">
                        Read Full Case Study
                        <ArrowRight size={16} />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CaseStudiesPage;