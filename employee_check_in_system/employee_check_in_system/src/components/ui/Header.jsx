import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigationItems = [
    { label: 'Dashboard', path: '/', icon: 'LayoutDashboard' },
    { label: 'Check-in', path: '/authentication-method-selection', icon: 'UserCheck' },
    { label: 'Reports', path: '/reports', icon: 'BarChart3' },
    { label: 'Employees', path: '/employees', icon: 'Users' },
  ];

  const secondaryItems = [
    { label: 'Settings', path: '/settings', icon: 'Settings' },
    { label: 'Help', path: '/help', icon: 'HelpCircle' },
    { label: 'Admin', path: '/admin', icon: 'Shield' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface border-b border-border shadow-card">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
            <Icon name="UserCheck" size={24} color="white" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold text-text-primary leading-tight">
              CheckIn Pro
            </h1>
            <span className="text-xs text-text-secondary font-medium">
              Employee System
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <a
              key={item?.path}
              href={item?.path}
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-text-secondary hover:text-primary hover:bg-muted rounded-lg transition-micro hover-lift"
            >
              <Icon name={item?.icon} size={18} />
              <span>{item?.label}</span>
            </a>
          ))}
          
          {/* More Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              iconName="MoreHorizontal"
              iconSize={18}
              onClick={toggleMenu}
              className="ml-2"
            >
              More
            </Button>
            
            {isMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-modal z-50">
                <div className="py-2">
                  {secondaryItems?.map((item) => (
                    <a
                      key={item?.path}
                      href={item?.path}
                      className="flex items-center space-x-3 px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-micro"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Icon name={item?.icon} size={16} />
                      <span>{item?.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          iconName="Menu"
          iconSize={20}
          onClick={toggleMenu}
          className="md:hidden"
        >
        </Button>
      </div>
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-surface border-t border-border">
          <nav className="px-6 py-4 space-y-2">
            {navigationItems?.map((item) => (
              <a
                key={item?.path}
                href={item?.path}
                className="flex items-center space-x-3 px-3 py-2 text-sm font-medium text-text-secondary hover:text-primary hover:bg-muted rounded-lg transition-micro"
                onClick={() => setIsMenuOpen(false)}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.label}</span>
              </a>
            ))}
            
            <div className="border-t border-border pt-2 mt-4">
              {secondaryItems?.map((item) => (
                <a
                  key={item?.path}
                  href={item?.path}
                  className="flex items-center space-x-3 px-3 py-2 text-sm text-text-secondary hover:text-primary hover:bg-muted rounded-lg transition-micro"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon name={item?.icon} size={16} />
                  <span>{item?.label}</span>
                </a>
              ))}
            </div>
          </nav>
        </div>
      )}
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;