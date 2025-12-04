import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { apiService } from '../utils/api';
import { ArrowLeft, Building2, Target, Lightbulb, TrendingUp } from 'lucide-react';

const CaseStudyDetailPage = () => {
  const { slug } = useParams();
  const [caseStudy, setCaseStudy] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCaseStudy();
  }, [slug]);

  const fetchCaseStudy = async () => {
    try {
      const response = await apiService.getCaseStudy(slug);
      setCaseStudy(response.data);
    } catch (error) {
      console.error('Error fetching case study:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="page">
        <div className="loading-spinner" data-testid="case-study-loading">Loading case study...</div>
      </div>
    );
  }

  if (!caseStudy) {
    return (
      <div className="page">
        <div className="container">
          <div className="empty-state" data-testid="case-study-not-found">
            <h2>Case study not found</h2>
            <Link to="/case-studies" className="btn btn-primary">
              <ArrowLeft size={20} />
              Back to Case Studies
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page case-study-detail-page" data-testid="case-study-detail-page">
      <section className="content-section">
        <div className="container-narrow">
          <Link to="/case-studies" className="back-link" data-testid="back-to-case-studies">
            <ArrowLeft size={20} />
            Back to Case Studies
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {caseStudy.featured_image && (
              <img src={caseStudy.featured_image} alt={caseStudy.title} className="case-study-detail-image" />
            )}

            <div className="case-study-detail-header">
              <span className="case-study-industry-badge">
                <Building2 size={18} />
                {caseStudy.industry}
              </span>
              <h1 className="case-study-detail-title">{caseStudy.title}</h1>
              <p className="case-study-client-name">{caseStudy.client_name}</p>
            </div>

            <div className="case-study-sections">
              <div className="case-study-section">
                <div className="section-icon challenge-icon">
                  <Target size={24} />
                </div>
                <h2>The Challenge</h2>
                <p>{caseStudy.challenge}</p>
              </div>

              <div className="case-study-section">
                <div className="section-icon solution-icon">
                  <Lightbulb size={24} />
                </div>
                <h2>Our Solution</h2>
                <p>{caseStudy.solution}</p>
              </div>

              <div className="case-study-section">
                <div className="section-icon results-icon">
                  <TrendingUp size={24} />
                </div>
                <h2>Results & Impact</h2>
                <p>{caseStudy.results}</p>
              </div>
            </div>

            {caseStudy.technologies && caseStudy.technologies.length > 0 && (
              <div className="technologies-section">
                <h3>Technologies Used</h3>
                <div className="technologies-list">
                  {caseStudy.technologies.map((tech, index) => (
                    <span key={index} className="technology-badge">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudyDetailPage;