import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeHeader = () => {
  const getCurrentDateTime = () => {
    const now = new Date();
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return now?.toLocaleDateString('en-US', options);
  };

  return (
    <div className="text-center space-y-6 mb-12">
      {/* Logo and Branding */}
      <div className="flex items-center justify-center space-x-4">
        <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-xl shadow-layered">
          <Icon name="Shield" size={32} color="white" strokeWidth={2} />
        </div>
        <div className="text-left">
          <h1 className="text-3xl lg:text-4xl font-semibold text-foreground">
            TEC Visitor Management
          </h1>
          <p className="text-lg text-muted-foreground font-medium">
            Professional Access Control System
          </p>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="space-y-3">
        <h2 className="text-2xl lg:text-3xl font-semibold text-foreground">
          Welcome to TEC Office
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Your secure gateway to professional workspace management. Access visitor services, host notifications, and building information.
        </p>
      </div>

      {/* Current Date and Time */}
      <div className="inline-flex items-center space-x-3 bg-card border border-border rounded-lg px-6 py-3 shadow-layered">
        <Icon name="Clock" size={20} className="text-primary" />
        <span className="text-sm font-medium text-foreground">
          {getCurrentDateTime()}
        </span>
      </div>
    </div>
  );
};

export default WelcomeHeader;