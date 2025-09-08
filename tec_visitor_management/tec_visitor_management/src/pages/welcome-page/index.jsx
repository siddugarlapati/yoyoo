import React from 'react';
import Header from '../../components/ui/Header';
import WelcomeHeader from './components/WelcomeHeader';
import NavigationCards from './components/NavigationCards';
import OfficeInformation from './components/OfficeInformation';
import QuickActions from './components/QuickActions';

const WelcomePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Welcome Header Section */}
        <WelcomeHeader />

        {/* Navigation Cards Section */}
        <NavigationCards />

        {/* Quick Actions Section */}
        <div className="mb-12">
          <QuickActions />
        </div>

        {/* Office Information Section */}
        <OfficeInformation />

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-border">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
              <span>TEC Visitor Management System</span>
              <span>•</span>
              <span>Professional Access Control</span>
              <span>•</span>
              <span>Secure & Efficient</span>
            </div>
            <p className="text-xs text-muted-foreground">
              © {new Date()?.getFullYear()} TEC Office Solutions. All rights reserved.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default WelcomePage;