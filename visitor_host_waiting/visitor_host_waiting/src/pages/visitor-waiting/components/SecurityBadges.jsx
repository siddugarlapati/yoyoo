import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadges = () => {
  return (
    <div className="flex items-center justify-center space-x-8 py-6 border-t border-border">
      <div className="flex items-center space-x-2">
        <Icon name="Shield" size={20} color="var(--color-success)" strokeWidth={2} />
        <span className="text-sm text-muted-foreground font-medium">SSL Secured</span>
      </div>
      
      <div className="w-px h-4 bg-border" />
      
      <div className="flex items-center space-x-2">
        <Icon name="Lock" size={20} color="var(--color-success)" strokeWidth={2} />
        <span className="text-sm text-muted-foreground font-medium">Data Protected</span>
      </div>
      
      <div className="w-px h-4 bg-border" />
      
      <div className="flex items-center space-x-2">
        <Icon name="CheckCircle" size={20} color="var(--color-success)" strokeWidth={2} />
        <span className="text-sm text-muted-foreground font-medium">Verified System</span>
      </div>
    </div>
  );
};

export default SecurityBadges;