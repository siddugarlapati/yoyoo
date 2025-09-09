import React from 'react';
import Icon from '../AppIcon';

const NavigationHeader = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
            <Icon name="BarChart3" size={20} color="white" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold text-foreground leading-tight">
              WorkSpace Analytics
            </h1>
            <span className="text-xs text-muted-foreground leading-none">
              Business Intelligence Dashboard
            </span>
          </div>
        </div>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative p-2 text-muted-foreground hover:text-foreground transition-micro rounded-md hover:bg-muted">
            <Icon name="Bell" size={20} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-error rounded-full animate-pulse-subtle"></span>
          </button>

          {/* Settings */}
          <button className="p-2 text-muted-foreground hover:text-foreground transition-micro rounded-md hover:bg-muted">
            <Icon name="Settings" size={20} />
          </button>

          {/* User Profile */}
          <div className="flex items-center space-x-3 pl-4 border-l border-border">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Icon name="User" size={16} color="white" />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-foreground">Admin User</p>
              <p className="text-xs text-muted-foreground">Facility Manager</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavigationHeader;