import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const WelcomeHeader = () => {
  return (
    <motion.div 
      className="text-center mb-12"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Logo Section */}
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-xl shadow-lg">
          <Icon name="Shield" size={32} color="white" strokeWidth={2} />
        </div>
        <div className="ml-4 text-left">
          <h1 className="text-3xl font-bold text-text-primary">TEC Workplace</h1>
          <p className="text-lg text-text-secondary font-medium">Management System</p>
        </div>
      </div>
      {/* Welcome Message */}
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold text-text-primary mb-3">
          Welcome to TEC Workplace
        </h2>
        <p className="text-lg text-text-secondary leading-relaxed">
          Please select your check-in option below to begin the secure access process
        </p>
      </div>
      {/* Security Indicators */}
      <div className="flex items-center justify-center mt-6 space-x-6">
        <div className="flex items-center space-x-2 text-sm text-text-secondary">
          <Icon name="Lock" size={16} color="var(--color-success)" strokeWidth={2} />
          <span>Secure Access</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-text-secondary">
          <Icon name="Shield" size={16} color="var(--color-success)" strokeWidth={2} />
          <span>SSL Protected</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-text-secondary">
          <Icon name="CheckCircle" size={16} color="var(--color-success)" strokeWidth={2} />
          <span>Verified System</span>
        </div>
      </div>
    </motion.div>
  );
};

export default WelcomeHeader;