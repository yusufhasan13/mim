import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const LoginPopup = ({ isOpen, onClose }) => {
  const products = [
    {
      name: 'Linkext',
      url: 'https://linkext.io',
      logo: 'https://customer-assets.emergentagent.com/job_mim-evolution/artifacts/p9tdlme1_Logo%201.png',
      description: 'Communication Platform'
    },
    {
      name: 'Techxure',
      url: 'https://techxure.io',
      logo: 'https://customer-assets.emergentagent.com/job_mim-evolution/artifacts/v5x6opgc_Logo2.png',
      description: "Omni-Channel That's Built Different"
    },
    {
      name: 'Vocalbox',
      url: 'https://vocalbox.in/Login.aspx',
      logo: 'https://customer-assets.emergentagent.com/job_mim-evolution/artifacts/f7fl41no_Logo3.JPG',
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
            <button className="popup-close-btn" onClick={onClose} type="button">
              <X size={24} />
            </button>

            <div className="login-popup-header">
              <h2>Choose Your Platform</h2>
              <p>Select a product to login</p>
            </div>

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
                    <img 
                      src={product.logo} 
                      alt={product.name}
                      className="login-product-logo-img"
                    />
                  </div>
                  <h3 className="login-product-name">{product.name}</h3>
                  <p className="login-product-desc">{product.description}</p>
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
