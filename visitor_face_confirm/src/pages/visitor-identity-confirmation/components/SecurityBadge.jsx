import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadge = ({ confidence = 95 }) => {
  const getConfidenceColor = (score) => {
    if (score >= 90) return 'text-success';
    if (score >= 75) return 'text-warning';
    return 'text-error';
  };

  const getConfidenceIcon = (score) => {
    if (score >= 90) return 'ShieldCheck';
    if (score >= 75) return 'Shield';
    return 'ShieldAlert';
  };

  return (
    <div className="flex items-center justify-center space-x-2 py-3 px-4 bg-muted/50 rounded-lg border border-border">
      <Icon 
        name={getConfidenceIcon(confidence)} 
        size={18} 
        className={getConfidenceColor(confidence)}
      />
      <span className="text-sm font-medium text-foreground">
        Face Match: {confidence}%
      </span>
      <div className="flex items-center space-x-1">
        <Icon name="Lock" size={14} color="var(--color-muted-foreground)" />
        <span className="text-xs text-muted-foreground">Secure</span>
      </div>
    </div>
  );
};

export default SecurityBadge;