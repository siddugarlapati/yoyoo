import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  const handleMoreMenuToggle = () => {
    setIsMoreMenuOpen(!isMoreMenuOpen);
  };

  const handleMenuItemClick = () => {
    setIsMoreMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border elevation-card">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
            <Icon name="Shield" size={24} color="white" strokeWidth={2} />
          </div>
          <div className="flex flex-col">
            <h1 className="text-fluid-lg font-semibold text-foreground leading-tight">
              Visitor Face Confirm
            </h1>
            <span className="text-xs text-muted-foreground font-mono">
              Security Management
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {/* Primary Navigation Items */}
          <Button
            variant="ghost"
            className="text-foreground hover:text-primary hover:bg-muted transition-colors duration-150"
            onClick={() => window.location.href = '/visitor-identity-confirmation'}
          >
            <Icon name="UserCheck" size={18} className="mr-2" />
            Identity Verification
          </Button>

          <Button
            variant="ghost"
            className="text-foreground hover:text-primary hover:bg-muted transition-colors duration-150"
            onClick={() => window.location.href = '/visitor-dashboard'}
          >
            <Icon name="Users" size={18} className="mr-2" />
            Visitor Dashboard
          </Button>

          <Button
            variant="ghost"
            className="text-foreground hover:text-primary hover:bg-muted transition-colors duration-150"
            onClick={() => window.location.href = '/security-monitoring'}
          >
            <Icon name="Monitor" size={18} className="mr-2" />
            Security Monitor
          </Button>

          <Button
            variant="ghost"
            className="text-foreground hover:text-primary hover:bg-muted transition-colors duration-150"
            onClick={() => window.location.href = '/reports'}
          >
            <Icon name="FileText" size={18} className="mr-2" />
            Reports
          </Button>

          {/* More Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              className="text-foreground hover:text-primary hover:bg-muted transition-colors duration-150"
              onClick={handleMoreMenuToggle}
            >
              <Icon name="MoreHorizontal" size={18} className="mr-2" />
              More
              <Icon 
                name="ChevronDown" 
                size={16} 
                className={`ml-1 transition-transform duration-150 ${isMoreMenuOpen ? 'rotate-180' : ''}`} 
              />
            </Button>

            {/* Dropdown Menu */}
            {isMoreMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-popover border border-border rounded-lg elevation-interactive animate-fade-in">
                <div className="py-2">
                  <Button
                    variant="ghost"
                    className="w-full justify-start px-4 py-2 text-sm text-popover-foreground hover:bg-muted"
                    onClick={handleMenuItemClick}
                  >
                    <Icon name="Settings" size={16} className="mr-3" />
                    Settings
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start px-4 py-2 text-sm text-popover-foreground hover:bg-muted"
                    onClick={handleMenuItemClick}
                  >
                    <Icon name="HelpCircle" size={16} className="mr-3" />
                    Help & Support
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start px-4 py-2 text-sm text-popover-foreground hover:bg-muted"
                    onClick={handleMenuItemClick}
                  >
                    <Icon name="Shield" size={16} className="mr-3" />
                    Admin Panel
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start px-4 py-2 text-sm text-popover-foreground hover:bg-muted"
                    onClick={handleMenuItemClick}
                  >
                    <Icon name="Database" size={16} className="mr-3" />
                    System Logs
                  </Button>
                  <div className="border-t border-border my-2"></div>
                  <Button
                    variant="ghost"
                    className="w-full justify-start px-4 py-2 text-sm text-popover-foreground hover:bg-muted"
                    onClick={handleMenuItemClick}
                  >
                    <Icon name="LogOut" size={16} className="mr-3" />
                    Sign Out
                  </Button>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="text-foreground hover:text-primary hover:bg-muted"
            onClick={handleMoreMenuToggle}
          >
            <Icon name="Menu" size={24} />
          </Button>
        </div>

        {/* Status Indicator */}
        <div className="hidden lg:flex items-center space-x-3 ml-6">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-sm text-muted-foreground font-mono">
              System Online
            </span>
          </div>
          <div className="text-xs text-muted-foreground font-mono">
            {new Date()?.toLocaleTimeString()}
          </div>
        </div>
      </div>
      {/* Mobile Menu Overlay */}
      {isMoreMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-popover border-b border-border elevation-interactive animate-slide-up">
          <div className="py-4 px-6 space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start text-popover-foreground hover:bg-muted"
              onClick={handleMenuItemClick}
            >
              <Icon name="UserCheck" size={18} className="mr-3" />
              Identity Verification
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-popover-foreground hover:bg-muted"
              onClick={handleMenuItemClick}
            >
              <Icon name="Users" size={18} className="mr-3" />
              Visitor Dashboard
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-popover-foreground hover:bg-muted"
              onClick={handleMenuItemClick}
            >
              <Icon name="Monitor" size={18} className="mr-3" />
              Security Monitor
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-popover-foreground hover:bg-muted"
              onClick={handleMenuItemClick}
            >
              <Icon name="FileText" size={18} className="mr-3" />
              Reports
            </Button>
            <div className="border-t border-border my-3"></div>
            <Button
              variant="ghost"
              className="w-full justify-start text-popover-foreground hover:bg-muted"
              onClick={handleMenuItemClick}
            >
              <Icon name="Settings" size={18} className="mr-3" />
              Settings
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-popover-foreground hover:bg-muted"
              onClick={handleMenuItemClick}
            >
              <Icon name="HelpCircle" size={18} className="mr-3" />
              Help & Support
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;