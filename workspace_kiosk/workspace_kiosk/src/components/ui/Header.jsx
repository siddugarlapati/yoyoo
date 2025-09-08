import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { path: '/welcome-check-in', label: 'Check In', icon: 'LogIn' },
    { path: '/hot-desk-selection', label: 'Select Desk', icon: 'Monitor' },
    { path: '/booking-confirmation', label: 'Confirm', icon: 'CheckCircle' },
    { path: '/check-in-complete', label: 'Complete', icon: 'Check' },
  ];

  const isActivePath = (path) => location?.pathname === path;

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-soft">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
            <Icon name="Building2" size={20} color="white" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold text-foreground leading-none">
              Workspace Kiosk
            </h1>
            <span className="text-xs text-muted-foreground font-mono">
              v2.1.0
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <Button
              key={item?.path}
              variant={isActivePath(item?.path) ? 'default' : 'ghost'}
              size="sm"
              onClick={() => handleNavigation(item?.path)}
              iconName={item?.icon}
              iconPosition="left"
              iconSize={16}
              className="min-w-touch"
            >
              {item?.label}
            </Button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            iconName={isMenuOpen ? 'X' : 'Menu'}
            iconSize={20}
            className="min-w-touch min-h-touch"
          >
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>

        {/* User Actions - Desktop */}
        <div className="hidden md:flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Settings"
            iconPosition="left"
            iconSize={16}
            onClick={() => console.log('Settings clicked')}
          >
            Settings
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName="HelpCircle"
            iconSize={16}
            onClick={() => console.log('Help clicked')}
          >
            <span className="sr-only">Help</span>
          </Button>
        </div>
      </div>
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-card border-b border-border shadow-elevated">
          <div className="px-6 py-4 space-y-2">
            {navigationItems?.map((item) => (
              <Button
                key={item?.path}
                variant={isActivePath(item?.path) ? 'default' : 'ghost'}
                size="sm"
                fullWidth
                onClick={() => handleNavigation(item?.path)}
                iconName={item?.icon}
                iconPosition="left"
                iconSize={16}
                className="justify-start min-h-touch"
              >
                {item?.label}
              </Button>
            ))}
            
            <div className="pt-4 mt-4 border-t border-border space-y-2">
              <Button
                variant="outline"
                size="sm"
                fullWidth
                iconName="Settings"
                iconPosition="left"
                iconSize={16}
                onClick={() => {
                  console.log('Settings clicked');
                  setIsMenuOpen(false);
                }}
                className="justify-start"
              >
                Settings
              </Button>
              <Button
                variant="ghost"
                size="sm"
                fullWidth
                iconName="HelpCircle"
                iconPosition="left"
                iconSize={16}
                onClick={() => {
                  console.log('Help clicked');
                  setIsMenuOpen(false);
                }}
                className="justify-start"
              >
                Help
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;