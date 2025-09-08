import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeSection = ({ visitorName, companyName }) => {
  return (
    <div className="bg-card rounded-lg border border-border shadow-layered p-8 text-center">
      <div className="flex items-center justify-center w-16 h-16 bg-success/10 rounded-full mx-auto mb-6">
        <Icon name="CheckCircle" size={32} className="text-success" />
      </div>
      
      <h1 className="text-3xl font-semibold text-foreground mb-2">
        Welcome, {visitorName}!
      </h1>
      
      <p className="text-lg text-muted-foreground mb-4">
        Check-in completed successfully
      </p>
      
      <div className="bg-muted/50 rounded-lg p-4 inline-block">
        <p className="text-sm text-muted-foreground">Visiting</p>
        <p className="text-base font-medium text-foreground">{companyName}</p>
      </div>
    </div>
  );
};

export default WelcomeSection;