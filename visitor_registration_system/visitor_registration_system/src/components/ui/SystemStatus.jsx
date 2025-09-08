import React from 'react';
import Icon from '../AppIcon';

const SystemStatus = ({ 
  isLoading = false,
  isConnected = true,
  message = '',
  type = 'info', // 'info', 'success', 'warning', 'error'
  showIcon = true,
  className = ''
}) => {
  const getStatusConfig = () => {
    if (isLoading) {
      return {
        icon: 'Loader2',
        iconClass: 'animate-spin text-primary',
        bgClass: 'bg-primary/10 border-primary/20',
        textClass: 'text-primary',
        message: message || 'Processing...'
      };
    }

    if (!isConnected) {
      return {
        icon: 'WifiOff',
        iconClass: 'text-error',
        bgClass: 'bg-error/10 border-error/20',
        textClass: 'text-error',
        message: message || 'Connection lost. Please check your internet connection.'
      };
    }

    switch (type) {
      case 'success':
        return {
          icon: 'CheckCircle',
          iconClass: 'text-success',
          bgClass: 'bg-success/10 border-success/20',
          textClass: 'text-success',
          message: message || 'Operation completed successfully'
        };
      case 'warning':
        return {
          icon: 'AlertTriangle',
          iconClass: 'text-warning',
          bgClass: 'bg-warning/10 border-warning/20',
          textClass: 'text-warning',
          message: message || 'Please review the information'
        };
      case 'error':
        return {
          icon: 'AlertCircle',
          iconClass: 'text-error',
          bgClass: 'bg-error/10 border-error/20',
          textClass: 'text-error',
          message: message || 'An error occurred'
        };
      default:
        return {
          icon: 'Info',
          iconClass: 'text-primary',
          bgClass: 'bg-primary/10 border-primary/20',
          textClass: 'text-primary',
          message: message || 'System information'
        };
    }
  };

  const config = getStatusConfig();

  if (!message && !isLoading && isConnected && type === 'info') {
    return null;
  }

  return (
    <div className={`animate-fade-in ${className}`}>
      <div className={`
        flex items-center space-x-3 p-3 rounded-md border transition-all duration-200
        ${config?.bgClass}
      `}>
        {showIcon && (
          <div className="flex-shrink-0">
            <Icon 
              name={config?.icon} 
              size={18} 
              className={config?.iconClass}
            />
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-medium ${config?.textClass}`}>
            {config?.message}
          </p>
        </div>

        {/* Connection Status Indicator */}
        {isConnected && !isLoading && (
          <div className="flex-shrink-0">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-xs text-text-secondary hidden sm:inline">
                Online
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SystemStatus;