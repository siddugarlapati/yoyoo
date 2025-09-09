import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const TabNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationTabs = [
    {
      id: 'workspace',
      label: 'Workspace Analytics',
      path: '/workspace-analytics-dashboard',
      icon: 'Building2',
      description: 'Space utilization and optimization insights'
    },
    {
      id: 'visitors',
      label: 'Visitor & Meetings',
      path: '/visitor-meeting-room-analytics',
      icon: 'Users',
      description: 'Meeting room efficiency and visitor tracking'
    },
    {
      id: 'telephony',
      label: 'Telephony & Costs',
      path: '/telephony-cost-analysis-dashboard',
      icon: 'Phone',
      description: 'Communication expenses and usage analysis'
    }
  ];

  useEffect(() => {
    const currentTab = navigationTabs?.find(tab => tab?.path === location?.pathname);
    if (currentTab) {
      setActiveTab(currentTab?.id);
    }
  }, [location?.pathname]);

  const handleTabClick = (tab) => {
    setActiveTab(tab?.id);
    navigate(tab?.path);
    setIsMobileMenuOpen(false);
  };

  const activeTabData = navigationTabs?.find(tab => tab?.id === activeTab);

  return (
    <nav className="fixed top-16 left-0 right-0 z-40 bg-card border-b border-border">
      {/* Desktop Navigation */}
      <div className="hidden md:block">
        <div className="flex items-center px-6">
          {navigationTabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => handleTabClick(tab)}
              className={`
                relative flex items-center space-x-3 px-6 py-4 text-sm font-medium transition-smooth
                ${activeTab === tab?.id
                  ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }
              `}
            >
              <Icon name={tab?.icon} size={18} />
              <span>{tab?.label}</span>
              
              {/* Active indicator */}
              {activeTab === tab?.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
              )}
            </button>
          ))}
        </div>
      </div>
      {/* Mobile Navigation */}
      <div className="md:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex items-center space-x-2 text-foreground"
          >
            <Icon name={activeTabData?.icon || 'Menu'} size={20} />
            <span className="font-medium">{activeTabData?.label || 'Select Analytics'}</span>
            <Icon 
              name={isMobileMenuOpen ? 'ChevronUp' : 'ChevronDown'} 
              size={16} 
              className="text-muted-foreground"
            />
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-card border-b border-border shadow-elevation-2">
            {navigationTabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => handleTabClick(tab)}
                className={`
                  w-full flex items-center space-x-3 px-4 py-4 text-left transition-smooth
                  ${activeTab === tab?.id
                    ? 'text-primary bg-primary/5 border-r-2 border-primary' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }
                `}
              >
                <Icon name={tab?.icon} size={18} />
                <div>
                  <div className="font-medium">{tab?.label}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {tab?.description}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default TabNavigation;