import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';


const Header = ({ showBackButton = false, backButtonPath = '/' }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(backButtonPath);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-10 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-primary-foreground"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" />
                    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-semibold text-foreground leading-tight">
                    SecurePortal
                  </span>
                  <span className="text-xs text-muted-foreground leading-tight">
                    Employee Access
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Section */}
          <div className="flex items-center space-x-4">
            {showBackButton && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackClick}
                iconName="ArrowLeft"
                iconPosition="left"
                className="text-muted-foreground hover:text-foreground transition-smooth"
              >
                Back
              </Button>
            )}
            
            {/* Help Link */}
            <Button
              variant="ghost"
              size="sm"
              iconName="HelpCircle"
              iconPosition="left"
              className="text-muted-foreground hover:text-foreground transition-smooth hidden sm:flex"
            >
              Help
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;