import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const LoginPopup = ({ isOpen, onClose }) => {
  const products = [
    {
      name: 'Linkext',
      url: 'https://linkext.io',
      logo: 'https://linkext.io/assets/images/logo.png', // Will use placeholder if not available
      description: 'Communication Platform'
    },
    {
      name: 'Techxure',
      url: 'https://techxure.io',
      logo: 'https://techxure.io/assets/images/logo.png', // Will use placeholder
      description: 'Technology Solutions'
    },
    {
      name: 'Vocalbox',
      url: 'https://vocalbox.in/Login.aspx',
      logo: 'https://vocalbox.in/assets/images/logo.png', // Will use placeholder
      description: 'Voice Solutions'
    }
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="popup-overlay"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="login-popup-glass-card"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button className="popup-close-btn" onClick={onClose} type="button">
              <X size={24} />
            </button>

            {/* Header */}
            <div className="login-popup-header">
              <h2>Choose Your Platform</h2>
              <p>Select a product to login</p>
            </div>

            {/* Product Cards */}
            <div className="login-products-grid">
              {products.map((product, index) => (
                <a
                  key={index}
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="login-product-card"
                >
                  <div className="login-product-logo">
                    <div className="login-product-logo-placeholder">
                      <span>{product.name.charAt(0)}</span>
                    </div>
                  </div>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoginPopup;
