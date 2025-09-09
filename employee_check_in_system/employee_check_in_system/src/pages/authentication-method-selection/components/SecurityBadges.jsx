import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadges = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      label: 'SSL Encrypted',
      description: 'End-to-end encryption',
      verified: true
    },
    {
      icon: 'Lock',
      label: 'GDPR Compliant',
      description: 'Data protection certified',
      verified: true
    },
    {
      icon: 'Eye',
      label: 'Biometric Secure',
      description: 'Advanced recognition',
      verified: true
    },
    {
      icon: 'Server',
      label: 'Enterprise Grade',
      description: 'Corporate standards',
      verified: true
    }
  ];

  return (
    <div className="bg-muted border border-border rounded-lg p-4">
      <div className="flex items-center space-x-2 mb-3">
        <Icon name="ShieldCheck" size={16} className="text-success" />
        <h4 className="text-sm font-semibold text-text-primary">Security & Compliance</h4>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {securityFeatures?.map((feature, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-6 h-6 bg-success bg-opacity-10 rounded">
              <Icon name={feature?.icon} size={12} className="text-success" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-text-primary truncate">
                {feature?.label}
              </p>
              <p className="text-xs text-text-secondary truncate">
                {feature?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center mt-3 pt-3 border-t border-border">
        <div className="flex items-center space-x-2 text-xs text-success">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
          <span>All systems operational • Last verified: {new Date()?.toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
};

export default SecurityBadges;