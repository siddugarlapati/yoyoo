import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="w-full bg-card border-b border-border card-shadow sticky top-0 z-50">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
            <Icon name="Users" size={24} color="white" strokeWidth={2} />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold text-foreground leading-tight">
              Visitor Host
            </h1>
            <span className="text-xs text-muted-foreground font-medium">
              Waiting System
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <Button
            variant="ghost"
            className="px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
            onClick={() => window.location.href = '/visitor-waiting'}
          >
            <Icon name="Clock" size={18} className="mr-2" />
            Waiting Room
          </Button>
          
          <Button
            variant="ghost"
            className="px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
            onClick={() => console.log('Dashboard clicked')}
          >
            <Icon name="BarChart3" size={18} className="mr-2" />
            Dashboard
          </Button>
          
          <Button
            variant="ghost"
            className="px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
            onClick={() => console.log('Visitors clicked')}
          >
            <Icon name="UserCheck" size={18} className="mr-2" />
            Visitors
          </Button>
          
          <Button
            variant="ghost"
            className="px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
            onClick={() => console.log('Hosts clicked')}
          >
            <Icon name="Users" size={18} className="mr-2" />
            Hosts
          </Button>

          {/* More Menu */}
          <div className="relative ml-2">
            <Button
              variant="ghost"
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted"
              onClick={toggleMenu}
            >
              <Icon name="MoreHorizontal" size={18} />
            </Button>
            
            {isMenuOpen && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={closeMenu}
                />
                <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg card-shadow z-20">
                  <div className="py-2">
                    <Button
                      variant="ghost"
                      className="w-full justify-start px-4 py-2 text-sm text-foreground hover:bg-muted"
                      onClick={() => {
                        console.log('Settings clicked');
                        closeMenu();
                      }}
                    >
                      <Icon name="Settings" size={16} className="mr-3" />
                      Settings
                    </Button>
                    
                    <Button
                      variant="ghost"
                      className="w-full justify-start px-4 py-2 text-sm text-foreground hover:bg-muted"
                      onClick={() => {
                        console.log('Reports clicked');
                        closeMenu();
                      }}
                    >
                      <Icon name="FileText" size={16} className="mr-3" />
                      Reports
                    </Button>
                    
                    <Button
                      variant="ghost"
                      className="w-full justify-start px-4 py-2 text-sm text-foreground hover:bg-muted"
                      onClick={() => {
                        console.log('Help clicked');
                        closeMenu();
                      }}
                    >
                      <Icon name="HelpCircle" size={16} className="mr-3" />
                      Help
                    </Button>
                    
                    <div className="border-t border-border my-2" />
                    
                    <Button
                      variant="ghost"
                      className="w-full justify-start px-4 py-2 text-sm text-foreground hover:bg-muted"
                      onClick={() => {
                        console.log('Admin clicked');
                        closeMenu();
                      }}
                    >
                      <Icon name="Shield" size={16} className="mr-3" />
                      Admin
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </nav>

        {/* User Profile Section */}
        <div className="hidden md:flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full breathing-animation" />
            <span className="text-sm text-muted-foreground font-mono">
              Online
            </span>
          </div>
          
          <div className="w-px h-6 bg-border" />
          
          <Button
            variant="ghost"
            className="flex items-center space-x-2 px-3 py-2 hover:bg-muted gentle-hover"
            onClick={() => console.log('Profile clicked')}
          >
            <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
              <Icon name="User" size={16} color="white" />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-sm font-medium text-foreground">
                Reception
              </span>
              <span className="text-xs text-muted-foreground">
                Staff
              </span>
            </div>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          className="md:hidden p-2"
          onClick={toggleMenu}
        >
          <Icon name={isMenuOpen ? "X" : "Menu"} size={24} />
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-card">
          <nav className="px-6 py-4 space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start px-4 py-3 text-sm font-medium text-foreground hover:bg-muted"
              onClick={() => {
                window.location.href = '/visitor-waiting';
                closeMenu();
              }}
            >
              <Icon name="Clock" size={18} className="mr-3" />
              Waiting Room
            </Button>
            
            <Button
              variant="ghost"
              className="w-full justify-start px-4 py-3 text-sm font-medium text-foreground hover:bg-muted"
              onClick={() => {
                console.log('Dashboard clicked');
                closeMenu();
              }}
            >
              <Icon name="BarChart3" size={18} className="mr-3" />
              Dashboard
            </Button>
            
            <Button
              variant="ghost"
              className="w-full justify-start px-4 py-3 text-sm font-medium text-foreground hover:bg-muted"
              onClick={() => {
                console.log('Visitors clicked');
                closeMenu();
              }}
            >
              <Icon name="UserCheck" size={18} className="mr-3" />
              Visitors
            </Button>
            
            <Button
              variant="ghost"
              className="w-full justify-start px-4 py-3 text-sm font-medium text-foreground hover:bg-muted"
              onClick={() => {
                console.log('Hosts clicked');
                closeMenu();
              }}
            >
              <Icon name="Users" size={18} className="mr-3" />
              Hosts
            </Button>
            
            <div className="border-t border-border my-3" />
            
            <Button
              variant="ghost"
              className="w-full justify-start px-4 py-3 text-sm font-medium text-foreground hover:bg-muted"
              onClick={() => {
                console.log('Settings clicked');
                closeMenu();
              }}
            >
              <Icon name="Settings" size={18} className="mr-3" />
              Settings
            </Button>
            
            <Button
              variant="ghost"
              className="w-full justify-start px-4 py-3 text-sm font-medium text-foreground hover:bg-muted"
              onClick={() => {
                console.log('Reports clicked');
                closeMenu();
              }}
            >
              <Icon name="FileText" size={18} className="mr-3" />
              Reports
            </Button>
            
            <Button
              variant="ghost"
              className="w-full justify-start px-4 py-3 text-sm font-medium text-foreground hover:bg-muted"
              onClick={() => {
                console.log('Help clicked');
                closeMenu();
              }}
            >
              <Icon name="HelpCircle" size={18} className="mr-3" />
              Help
            </Button>
            
            <Button
              variant="ghost"
              className="w-full justify-start px-4 py-3 text-sm font-medium text-foreground hover:bg-muted"
              onClick={() => {
                console.log('Admin clicked');
                closeMenu();
              }}
            >
              <Icon name="Shield" size={18} className="mr-3" />
              Admin
            </Button>
            
            <div className="border-t border-border my-3" />
            
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} color="white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-foreground">
                    Reception Staff
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full breathing-animation" />
                    <span className="text-xs text-muted-foreground font-mono">
                      Online
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;