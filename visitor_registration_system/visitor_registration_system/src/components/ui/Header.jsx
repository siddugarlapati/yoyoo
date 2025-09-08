import React from 'react';
import Icon from '../AppIcon';

const Header = ({ 
  logoSrc = '/assets/images/logo.png', 
  systemTitle = 'Visitor Registration System',
  brandLink = '/',
  className = ''
}) => {
  return (
    <header className={`bg-card border-b border-border shadow-gentle ${className}`}>
      <div className="w-full px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Brand Identity Area */}
          <div className="flex items-center space-x-3">
            <a 
              href={brandLink}
              className="flex items-center space-x-3 focus-ring rounded-md p-1 -m-1 transition-colors duration-200 hover:bg-muted"
              aria-label="Go to homepage"
            >
              <div className="flex-shrink-0">
                <img
                  src={logoSrc}
                  alt="Company Logo"
                  className="h-8 w-auto"
                  onError={(e) => {
                    e.target.src = '/assets/images/no_image.png';
                  }}
                />
              </div>
              <div className="flex flex-col">
                <h1 className="text-lg font-semibold text-text-primary leading-tight">
                  {systemTitle}
                </h1>
                <span className="text-xs text-text-secondary font-normal">
                  Secure • Professional • Efficient
                </span>
              </div>
            </a>
          </div>

          {/* System Status Indicator */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-text-secondary">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="hidden sm:inline">System Online</span>
              </div>
            </div>
            
            {/* Help/Support Access */}
            <button
              type="button"
              className="p-2 text-text-secondary hover:text-text-primary hover:bg-muted rounded-md transition-colors duration-200 focus-ring"
              aria-label="Help and support"
            >
              <Icon name="HelpCircle" size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;