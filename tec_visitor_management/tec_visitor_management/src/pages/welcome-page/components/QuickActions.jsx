import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const navigate = useNavigate();

  const quickActionItems = [
    {
      id: 'visitor-registration',
      title: 'Start Visitor Registration',
      description: 'Begin the check-in process',
      icon: 'UserPlus',
      route: '/visitor-information-display',
      variant: 'default'
    },
    {
      id: 'host-login',
      title: 'Host Notification Access',
      description: 'Manage visitor notifications',
      icon: 'Bell',
      route: '/host-notification-popup',
      variant: 'outline'
    }
  ];

  const handleQuickAction = (route) => {
    navigate(route);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-8 shadow-layered">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-foreground">Quick Actions</h3>
          <p className="text-muted-foreground">
            Access frequently used functions directly from here
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {quickActionItems?.map((action) => (
            <div key={action?.id} className="flex-1 max-w-xs">
              <Button
                variant={action?.variant}
                size="lg"
                iconName={action?.icon}
                iconPosition="left"
                iconSize={20}
                fullWidth
                onClick={() => handleQuickAction(action?.route)}
                className="h-auto py-4 flex-col space-y-2"
              >
                <span className="font-semibold">{action?.title}</span>
                <span className="text-xs opacity-80 font-normal">
                  {action?.description}
                </span>
              </Button>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Shield" size={16} className="text-success" />
          <span>Secure • Professional • Efficient</span>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;