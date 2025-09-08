import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import { ToastContainer } from '../../components/ui/Toast';
import WelcomeSection from './components/WelcomeSection';
import HostStatusCard from './components/HostStatusCard';
import WorkspaceCard from './components/WorkspaceCard';
import WiFiCredentialsCard from './components/WiFiCredentialsCard';
import QRCodeSection from './components/QRCodeSection';
import ActionSection from './components/ActionSection';

const VisitorInformationDisplay = () => {
  const navigate = useNavigate();
  const [toasts, setToasts] = useState([]);

  // Mock visitor data
  const visitorData = {
    name: "Sarah Johnson",
    company: "TechCorp Solutions",
    hostName: "Michael Rodriguez",
    notificationTime: "2:18 PM",
    workspace: {
      type: "Meeting Room",
      location: "Conference Room B-204",
      floor: "2nd Floor, Building B",
      additionalInfo: "Room is equipped with video conferencing, whiteboard, and presentation screen. Please keep your visitor badge visible at all times."
    },
    wifi: {
      networkName: "TEC-Guest-WiFi",
      password: "Welcome2024!"
    }
  };

  const addToast = (message, type = 'info') => {
    const id = Date.now();
    const newToast = { id, message, type, duration: 4000, position: 'top-right' };
    setToasts(prev => [...prev, newToast]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev?.filter(toast => toast?.id !== id));
  };

  const handleDone = () => {
    addToast('Redirecting to welcome page...', 'success');
    setTimeout(() => {
      navigate('/welcome-page');
    }, 1000);
  };

  const handleTimerComplete = () => {
    addToast('Auto-redirecting to welcome page', 'info');
    setTimeout(() => {
      navigate('/welcome-page');
    }, 1500);
  };

  useEffect(() => {
    // Show initial success message
    const timer = setTimeout(() => {
      addToast('Check-in completed successfully! Your host has been notified.', 'success');
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-8">
          {/* Welcome Section */}
          <WelcomeSection 
            visitorName={visitorData?.name}
            companyName={visitorData?.company}
          />
          
          {/* Host Status */}
          <HostStatusCard 
            hostName={visitorData?.hostName}
            notificationTime={visitorData?.notificationTime}
          />
          
          {/* Workspace Information */}
          <WorkspaceCard 
            workspaceType={visitorData?.workspace?.type}
            location={visitorData?.workspace?.location}
            floor={visitorData?.workspace?.floor}
            additionalInfo={visitorData?.workspace?.additionalInfo}
          />
          
          {/* Wi-Fi Credentials */}
          <WiFiCredentialsCard 
            networkName={visitorData?.wifi?.networkName}
            password={visitorData?.wifi?.password}
          />
          
          {/* QR Codes */}
          <QRCodeSection />
          
          {/* Action Section with Timer */}
          <ActionSection 
            onDone={handleDone}
            onTimerComplete={handleTimerComplete}
          />
        </div>
      </main>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
};

export default VisitorInformationDisplay;