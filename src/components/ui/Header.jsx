import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { path: '/welcome-screen', label: 'Welcome', icon: 'Home' },
    { path: '/visitor-identification', label: 'Check In', icon: 'UserCheck' },
    { path: '/face-confirmation', label: 'Verify', icon: 'Camera' },
    { path: '/details-confirmation', label: 'Confirm', icon: 'CheckCircle' },
  ];

  const moreItems = [
    { path: '/new-visitor-registration', label: 'Register', icon: 'UserPlus' },
    { path: '/settings', label: 'Settings', icon: 'Settings' },
    { path: '/help', label: 'Help', icon: 'HelpCircle' },
  ];

  const isActivePath = (path) => location?.pathname === path;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface border-b border-border shadow-sm">
      <div className="w-full">
        <div className="flex items-center justify-between h-16 px-6">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
              <Icon name="Shield" size={24} color="white" strokeWidth={2} />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-semibold text-text-primary leading-tight">
                TEC Workplace
              </h1>
              <span className="text-xs text-text-secondary font-medium">
                Management
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <a
                key={item?.path}
                href={item?.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-150 ease-out ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                }`}
              >
                <Icon 
                  name={item?.icon} 
                  size={16} 
                  color="currentColor" 
                  strokeWidth={2} 
                />
                <span>{item?.label}</span>
              </a>
            ))}

            {/* More Menu */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMenu}
                iconName="MoreHorizontal"
                iconPosition="left"
                iconSize={16}
                className="text-text-secondary hover:text-text-primary"
              >
                More
              </Button>

              {isMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-md py-2 animate-in">
                  {moreItems?.map((item) => (
                    <a
                      key={item?.path}
                      href={item?.path}
                      className={`flex items-center space-x-3 px-4 py-2 text-sm font-medium transition-colors duration-150 ${
                        isActivePath(item?.path)
                          ? 'bg-accent text-accent-foreground'
                          : 'text-popover-foreground hover:bg-muted'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Icon 
                        name={item?.icon} 
                        size={16} 
                        color="currentColor" 
                        strokeWidth={2} 
                      />
                      <span>{item?.label}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              iconName={isMenuOpen ? "X" : "Menu"}
              iconSize={20}
              className="text-text-secondary hover:text-text-primary"
            />
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-surface border-t border-border animate-in">
            <nav className="px-6 py-4 space-y-2">
              {[...navigationItems, ...moreItems]?.map((item) => (
                <a
                  key={item?.path}
                  href={item?.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-150 ${
                    isActivePath(item?.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon 
                    name={item?.icon} 
                    size={18} 
                    color="currentColor" 
                    strokeWidth={2} 
                  />
                  <span>{item?.label}</span>
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-20 z-[-1] md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;