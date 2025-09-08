import React from 'react';
import Icon from '../../../components/AppIcon';

const HostStatusCard = ({ hostName, notificationTime }) => {
  return (
    <div className="bg-card rounded-lg border border-border shadow-layered p-6">
      <div className="flex items-center space-x-4">
        <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full">
          <Icon name="Bell" size={24} className="text-primary" />
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-1">
            Host Notification Sent
          </h3>
          <p className="text-muted-foreground text-sm mb-2">
            {hostName} has been notified of your arrival
          </p>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-success">
              Host is on their way
            </span>
          </div>
        </div>
        
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Notified at</p>
          <p className="text-sm font-medium text-foreground">{notificationTime}</p>
        </div>
      </div>
    </div>
  );
};

export default HostStatusCard;