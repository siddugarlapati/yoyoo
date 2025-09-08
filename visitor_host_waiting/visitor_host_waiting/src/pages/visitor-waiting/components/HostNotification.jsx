import React from 'react';
import Icon from '../../../components/AppIcon';

const HostNotification = ({ hostName, notificationSent }) => {
  return (
    <div className="bg-card border border-border rounded-xl p-8 mb-8 card-shadow">
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center justify-center w-12 h-12 bg-accent rounded-full">
            <Icon name="Bell" size={24} color="white" strokeWidth={2} />
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="flex items-center justify-center w-12 h-12 bg-secondary rounded-full">
            <Icon name="User" size={24} color="white" strokeWidth={2} />
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-foreground mb-3">
          Notifying {hostName}
        </h2>
        
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className={`w-3 h-3 rounded-full ${notificationSent ? 'bg-success' : 'bg-warning'} breathing-animation`} />
          <span className="text-lg text-muted-foreground font-medium">
            {notificationSent ? 'Notification sent successfully' : 'Sending notification...'}
          </span>
        </div>
        
        <p className="text-muted-foreground">
          {hostName} has been notified of your arrival and will be with you shortly.
        </p>
      </div>
    </div>
  );
};

export default HostNotification;