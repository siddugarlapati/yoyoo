import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AuthMethodCard = ({ 
  method, 
  icon, 
  title, 
  description, 
  features, 
  isRecommended = false,
  onClick,
  disabled = false 
}) => {
  return (
    <div 
      className={`
        relative bg-card border border-border rounded-xl p-6 transition-standard hover-lift cursor-pointer
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-primary hover:shadow-interactive'}
        ${isRecommended ? 'ring-2 ring-primary ring-opacity-20' : ''}
      `}
      onClick={disabled ? undefined : onClick}
    >
      {/* Recommended Badge */}
      {isRecommended && (
        <div className="absolute -top-3 left-6">
          <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
            Recommended
          </div>
        </div>
      )}
      {/* Icon */}
      <div className="flex items-center justify-center w-16 h-16 bg-primary bg-opacity-10 rounded-xl mb-4">
        <Icon name={icon} size={32} className="text-primary" />
      </div>
      {/* Content */}
      <div className="space-y-3">
        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-1">
            {title}
          </h3>
          <p className="text-sm text-text-secondary">
            {description}
          </p>
        </div>

        {/* Features */}
        <ul className="space-y-2">
          {features?.map((feature, index) => (
            <li key={index} className="flex items-center space-x-2 text-sm text-text-secondary">
              <Icon name="Check" size={16} className="text-success flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* Action Button */}
        <div className="pt-2">
          <Button
            variant="outline"
            fullWidth
            iconName="ArrowRight"
            iconPosition="right"
            disabled={disabled}
            className="group"
          >
            <span className="group-hover:text-primary transition-micro">
              Select {title}
            </span>
          </Button>
        </div>
      </div>
      {/* Status Indicator */}
      {disabled && (
        <div className="absolute top-4 right-4">
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <Icon name="AlertCircle" size={14} />
            <span>Unavailable</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthMethodCard;