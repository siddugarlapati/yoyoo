import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const Toast = ({ 
  message, 
  type = 'info', 
  duration = 4000, 
  onClose,
  position = 'top-right'
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, 200);
  };

  const getToastStyles = () => {
    const baseStyles = "fixed z-[1100] max-w-sm w-full bg-card border border-border rounded-lg shadow-elevated p-4 transition-all duration-200 ease-out";
    
    const positionStyles = {
      'top-right': 'top-4 right-4',
      'top-left': 'top-4 left-4',
      'bottom-right': 'bottom-4 right-4',
      'bottom-left': 'bottom-4 left-4',
      'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
      'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2'
    };

    const animationStyles = isExiting 
      ? 'opacity-0 translate-x-full scale-95' :'opacity-100 translate-x-0 scale-100 animate-slide-in';

    return `${baseStyles} ${positionStyles?.[position]} ${animationStyles}`;
  };

  const getIconAndColor = () => {
    switch (type) {
      case 'success':
        return { icon: 'CheckCircle', color: 'text-success', bgColor: 'bg-success/10' };
      case 'error':
        return { icon: 'XCircle', color: 'text-error', bgColor: 'bg-error/10' };
      case 'warning':
        return { icon: 'AlertTriangle', color: 'text-warning', bgColor: 'bg-warning/10' };
      default:
        return { icon: 'Info', color: 'text-primary', bgColor: 'bg-primary/10' };
    }
  };

  if (!isVisible) return null;

  const { icon, color, bgColor } = getIconAndColor();

  return (
    <div className={getToastStyles()}>
      <div className="flex items-start space-x-3">
        <div className={`flex-shrink-0 w-8 h-8 rounded-full ${bgColor} flex items-center justify-center`}>
          <Icon name={icon} size={16} className={color} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground leading-relaxed">
            {message}
          </p>
        </div>
        <button
          onClick={handleClose}
          className="flex-shrink-0 w-6 h-6 rounded-full hover:bg-muted transition-hover flex items-center justify-center"
        >
          <Icon name="X" size={14} className="text-muted-foreground" />
        </button>
      </div>
    </div>
  );
};

const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[1100]">
      {toasts?.map((toast) => (
        <Toast
          key={toast?.id}
          message={toast?.message}
          type={toast?.type}
          duration={toast?.duration}
          position={toast?.position}
          onClose={() => removeToast(toast?.id)}
        />
      ))}
    </div>
  );
};

export { Toast, ToastContainer };
export default Toast;