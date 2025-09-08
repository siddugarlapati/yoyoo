import React from 'react';
import Icon from '../AppIcon';

const Header = () => {
  const navigationItems = [
    {
      title: 'Welcome',
      path: '/welcome-page',
      icon: 'Home',
      description: 'System entry point'
    },
    {
      title: 'Host Notifications',
      path: '/host-notification-popup',
      icon: 'Bell',
      description: 'Visitor notifications'
    },
    {
      title: 'Visitor Display',
      path: '/visitor-information-display',
      icon: 'Users',
      description: 'Check-in completion'
    }
  ];

  const handleNavigation = (path) => {
    window.location.href = path;
  };

  return (
    <header className="w-full bg-card border-b border-border shadow-layered sticky top-0 z-50">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
            <Icon name="Shield" size={24} color="white" strokeWidth={2} />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold text-foreground leading-tight">
              TEC Visitor Management
            </h1>
            <span className="text-xs text-muted-foreground font-medium">
              Professional Access Control
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-hover group"
              title={item?.description}
            >
              <Icon 
                name={item?.icon} 
                size={18} 
                className="group-hover:text-primary transition-colors" 
              />
              <span>{item?.title}</span>
            </button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-muted transition-hover">
          <Icon name="Menu" size={20} color="currentColor" />
        </button>
      </div>
      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-border bg-card">
        <nav className="px-4 py-3 space-y-1">
          {navigationItems?.map((item) => (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className="flex items-center space-x-3 w-full px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-hover"
            >
              <Icon name={item?.icon} size={18} />
              <div className="flex flex-col items-start">
                <span>{item?.title}</span>
                <span className="text-xs text-muted-foreground">{item?.description}</span>
              </div>
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;