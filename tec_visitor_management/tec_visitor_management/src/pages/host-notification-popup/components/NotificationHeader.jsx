import React from 'react';
import Icon from '../../../components/AppIcon';

const NotificationHeader = ({ onClose }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="Bell" size={20} className="text-primary" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-foreground">
            Visitor Arrival
          </h1>
          <p className="text-sm text-muted-foreground">
            New visitor waiting for you
          </p>
        </div>
      </div>

      <button
        onClick={onClose}
        className="w-8 h-8 rounded-lg hover:bg-muted transition-hover flex items-center justify-center group"
        aria-label="Close notification"
      >
        <Icon 
          name="X" 
          size={18} 
          className="text-muted-foreground group-hover:text-foreground transition-colors" 
        />
      </button>
    </div>
  );
};

export default NotificationHeader;