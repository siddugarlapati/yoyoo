import React from 'react';
import Icon from '../AppIcon';

const SecurityTrustBar = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      label: 'SSL Encrypted',
      description: 'End-to-end encryption'
    },
    {
      icon: 'Lock',
      label: 'GDPR Compliant',
      description: 'Data protection certified'
    },
    {
      icon: 'Eye',
      label: 'Biometric Secure',
      description: 'Advanced face recognition'
    },
    {
      icon: 'Server',
      label: 'Enterprise Grade',
      description: 'Corporate security standards'
    }
  ];

  return (
    <footer className="bg-muted border-t border-border py-4 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          {/* Security Features */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-6">
            {securityFeatures?.map((feature, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 text-xs text-muted-foreground"
              >
                <Icon 
                  name={feature?.icon} 
                  size={14} 
                  className="text-success" 
                />
                <span className="font-medium">{feature?.label}</span>
              </div>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
              <span>System Online</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={12} />
              <span>Last updated: {new Date()?.toLocaleTimeString()}</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-4 pt-4 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            © 2025 CheckIn Pro Employee System. All rights reserved. 
            <span className="mx-2">|</span>
            <a href="/privacy" className="hover:text-primary transition-micro">
              Privacy Policy
            </a>
            <span className="mx-2">|</span>
            <a href="/terms" className="hover:text-primary transition-micro">
              Terms of Service
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default SecurityTrustBar;