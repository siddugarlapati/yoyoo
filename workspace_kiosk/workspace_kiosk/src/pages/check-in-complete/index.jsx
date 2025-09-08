import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import SuccessHeader from './components/SuccessHeader';
import WorkspaceSummary from './components/WorkspaceSummary';
import NextStepsCard from './components/NextStepsCard';
import SupportInfo from './components/SupportInfo';
import ActionButtons from './components/ActionButtons';

const CheckInComplete = () => {
  // Mock data for the completed check-in
  const employeeName = "Sarah Johnson";
  
  const workspaceDetails = {
    deskNumber: "WS-A-042",
    zone: "Quiet Zone - Floor 3",
    amenities: ["Dual Monitor", "Standing Desk", "USB-C Hub"],
    checkInTime: new Date()?.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  };

  const nextSteps = [
    {
      icon: 'Navigation',
      title: "Find Your Workspace",
      description: "Head to Floor 3, Quiet Zone. Look for desk WS-A-042 near the north windows.",
      additionalInfo: "Estimated walk time: 2-3 minutes from reception"
    },
    {
      icon: 'Monitor',
      title: "Set Up Your Equipment",
      description: "Connect your laptop using the USB-C hub. Adjust the standing desk to your preferred height.",
      additionalInfo: "Setup guide available on the desk or scan QR code"
    },
    {
      icon: 'Wifi',
      title: "Connect to Network",
      description: "Join the \'OfficeWiFi-Secure\' network using your employee credentials.",
      additionalInfo: "Network password available in your employee portal"
    },
    {
      icon: 'Coffee',
      title: "Get Comfortable",
      description: "Grab a coffee from the nearby break area and settle in for a productive day!",
      additionalInfo: "Coffee station is 30 seconds walk from your desk"
    }
  ];

  const supportDetails = {
    phone: "+1 (555) 123-4567",
    email: "facilities@company.com",
    location: "Main Reception - Ground Floor"
  };

  // Add celebration effect on component mount
  useEffect(() => {
    // Optional: Add confetti or other celebration effects here
    console.log('Check-in completed successfully!');
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-8">
        <div className="max-w-4xl mx-auto px-6">
          {/* Success Header with Animation */}
          <SuccessHeader employeeName={employeeName} />
          
          {/* Workspace Summary */}
          <WorkspaceSummary workspaceDetails={workspaceDetails} />
          
          {/* Next Steps */}
          <NextStepsCard nextSteps={nextSteps} />
          
          {/* Support Information */}
          <SupportInfo supportDetails={supportDetails} />
          
          {/* Action Buttons */}
          <ActionButtons />
          
          {/* Additional Success Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.5 }}
            className="text-center mt-12 pt-8 border-t border-border"
          >
            <p className="text-sm text-muted-foreground mb-2">
              Check-in completed at {new Date()?.toLocaleTimeString()}
            </p>
            <div className="flex items-center justify-center space-x-2 text-success">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">System Status: All Good</span>
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default CheckInComplete;