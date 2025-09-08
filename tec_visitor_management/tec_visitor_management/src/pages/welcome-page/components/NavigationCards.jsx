import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NavigationCards = () => {
  const navigate = useNavigate();

  const navigationOptions = [
    {
      id: 'visitor-checkin',
      title: 'Visitor Check-In',
      description: 'Complete your visitor registration and receive workspace information',
      icon: 'UserCheck',
      route: '/visitor-information-display',
      color: 'bg-primary',
      textColor: 'text-primary-foreground',
      hoverColor: 'hover:bg-primary/90'
    },
    {
      id: 'host-notifications',
      title: 'Host Notifications',
      description: 'Receive and manage visitor arrival notifications',
      icon: 'Bell',
      route: '/host-notification-popup',
      color: 'bg-accent',
      textColor: 'text-accent-foreground',
      hoverColor: 'hover:bg-accent/90'
    },
    {
      id: 'office-info',
      title: 'Office Information',
      description: 'Access building directory, amenities, and general information',
      icon: 'Info',
      route: '/welcome-page',
      color: 'bg-secondary',
      textColor: 'text-secondary-foreground',
      hoverColor: 'hover:bg-secondary/90'
    }
  ];

  const handleNavigation = (route) => {
    navigate(route);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      {navigationOptions?.map((option) => (
        <div
          key={option?.id}
          className="bg-card border border-border rounded-lg p-6 shadow-layered hover:shadow-elevated transition-all duration-200 group cursor-pointer"
          onClick={() => handleNavigation(option?.route)}
        >
          <div className="space-y-4">
            {/* Icon */}
            <div className={`w-12 h-12 ${option?.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
              <Icon name={option?.icon} size={24} color="white" strokeWidth={2} />
            </div>

            {/* Content */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {option?.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {option?.description}
              </p>
            </div>

            {/* Action Button */}
            <Button
              variant="outline"
              size="sm"
              iconName="ArrowRight"
              iconPosition="right"
              iconSize={16}
              className="w-full group-hover:border-primary group-hover:text-primary transition-colors"
              onClick={(e) => {
                e?.stopPropagation();
                handleNavigation(option?.route);
              }}
            >
              Access
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NavigationCards;