import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const WelcomeFooter = () => {
  const currentYear = new Date()?.getFullYear();

  return (
    <motion.footer 
      className="mt-16 pt-8 border-t border-border"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Help Section */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center space-x-8 text-sm text-text-secondary">
            <div className="flex items-center space-x-2 hover:text-text-primary transition-colors cursor-pointer">
              <Icon name="HelpCircle" size={16} strokeWidth={2} />
              <span>Need Help?</span>
            </div>
            <div className="flex items-center space-x-2 hover:text-text-primary transition-colors cursor-pointer">
              <Icon name="Phone" size={16} strokeWidth={2} />
              <span>Call Reception: (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-2 hover:text-text-primary transition-colors cursor-pointer">
              <Icon name="Settings" size={16} strokeWidth={2} />
              <span>System Settings</span>
            </div>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="flex items-center justify-center space-x-6 mb-6">
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-text-secondary">System Online</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-text-secondary">Camera Ready</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-text-secondary">Network Connected</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-text-secondary">
          <p>© {currentYear} TEC Workplace Management. All rights reserved.</p>
          <p className="mt-1">Secure • Reliable • Professional</p>
        </div>
      </div>
    </motion.footer>
  );
};

export default WelcomeFooter;