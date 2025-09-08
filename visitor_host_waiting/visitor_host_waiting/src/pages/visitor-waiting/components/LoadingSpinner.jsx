import React from 'react';
import Icon from '../../../components/AppIcon';

const LoadingSpinner = ({ isWaiting }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative mb-6">
        <div className="w-16 h-16 border-4 border-muted rounded-full animate-spin border-t-primary" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon name="Wifi" size={20} color="var(--color-primary)" strokeWidth={2} />
        </div>
      </div>
      
      <div className="text-center">
        <h3 className="text-xl font-semibold text-foreground mb-2">
          {isWaiting ? 'Waiting for host response...' : 'Processing your request...'}
        </h3>
        
        <p className="text-muted-foreground max-w-md mx-auto">
          We're actively monitoring for your host's acknowledgment. This usually takes just a moment.
        </p>
        
        <div className="flex items-center justify-center space-x-2 mt-4">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;