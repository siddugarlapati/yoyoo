import React from 'react';
import Icon from '../../../components/AppIcon';

const RegistrationHeader = () => {
  return (
    <div className="text-center mb-8">
      {/* Header Icon */}
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
          <Icon name="UserPlus" size={32} className="text-primary" />
        </div>
      </div>

      {/* Main Title */}
      <h1 className="text-3xl font-semibold text-text-primary mb-3">
        New Visitor Registration
      </h1>

      {/* Instructions */}
      <div className="max-w-2xl mx-auto">
        <p className="text-text-secondary text-base leading-relaxed mb-4">
          Welcome! Please complete the registration form below to check in for your visit. 
          All required fields must be filled out to proceed.
        </p>
        
        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="flex items-center justify-center space-x-2 p-3 bg-muted/50 rounded-lg">
            <Icon name="Clock" size={16} className="text-primary" />
            <span className="text-sm text-text-secondary">2-3 minutes</span>
          </div>
          
          <div className="flex items-center justify-center space-x-2 p-3 bg-muted/50 rounded-lg">
            <Icon name="Shield" size={16} className="text-success" />
            <span className="text-sm text-text-secondary">Secure & Private</span>
          </div>
          
          <div className="flex items-center justify-center space-x-2 p-3 bg-muted/50 rounded-lg">
            <Icon name="Bell" size={16} className="text-accent" />
            <span className="text-sm text-text-secondary">Auto Notification</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationHeader;