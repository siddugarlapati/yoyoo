import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import FaceImageDisplay from './components/FaceImageDisplay';
import AppointmentDetails from './components/AppointmentDetails';
import SecurityClearance from './components/SecurityClearance';
import ConfirmationActions from './components/ConfirmationActions';

const FaceConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Mock appointment data - in real app this would come from face recognition results
  const mockAppointment = {
    visitorName: "Sarah Johnson",
    company: "TechCorp Solutions",
    email: "sarah.johnson@techcorp.com",
    host: "Michael Chen",
    location: "Conference Room B - 3rd Floor",
    startTime: "2025-01-08T14:00:00",
    endTime: "2025-01-08T15:30:00",
    purpose: "Quarterly Business Review and Strategic Planning Discussion",
    accessRequirements: [
      "Visitor Badge Required",
      "Escort to Meeting Room",
      "Sign NDA Agreement"
    ]
  };

  const mockFaceData = {
    faceImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    recognitionConfidence: 94
  };

  const mockSecurity = {
    clearanceLevel: "Medium",
    badgeType: "Temporary Visitor Pass",
    facilityAccess: [
      "Main Lobby",
      "3rd Floor Conference Rooms",
      "Cafeteria",
      "Restrooms"
    ]
  };

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const handleConfirmIdentity = async () => {
    setIsLoading(true);
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    navigate('/details-confirmation', {
      state: {
        appointment: mockAppointment,
        faceData: mockFaceData,
        security: mockSecurity,
        checkInTime: currentTime
      }
    });
  };

  const handleRejectIdentity = () => {
    navigate('/visitor-identification', {
      state: { 
        message: "Identity confirmation failed. Please try again or use manual check-in.",
        showManualOption: true
      }
    });
  };

  const handleBackNavigation = () => {
    navigate('/visitor-identification');
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.4
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <motion.main
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="pt-16"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="ghost"
                size="sm"
                iconName="ArrowLeft"
                iconPosition="left"
                iconSize={16}
                onClick={handleBackNavigation}
                className="text-text-secondary hover:text-text-primary"
              >
                Back to Identification
              </Button>
              
              <div className="text-right">
                <p className="text-sm text-text-secondary">
                  {currentTime?.toLocaleDateString('en-US', { 
                    weekday: 'long',
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
                <p className="text-lg font-semibold text-text-primary">
                  {currentTime?.toLocaleTimeString('en-US', { 
                    hour: 'numeric', 
                    minute: '2-digit', 
                    hour12: true 
                  })}
                </p>
              </div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Icon name="CheckCircle" size={24} color="var(--color-success)" strokeWidth={2} />
                <h1 className="text-3xl font-bold text-text-primary">Face Recognition Successful</h1>
              </div>
              <p className="text-text-secondary text-lg">
                Please confirm your identity and appointment details below
              </p>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Face Image */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <FaceImageDisplay 
                  faceImage={mockFaceData?.faceImage}
                  recognitionConfidence={mockFaceData?.recognitionConfidence}
                />
              </motion.div>
            </div>

            {/* Right Column - Details */}
            <div className="lg:col-span-2 space-y-6">
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                <AppointmentDetails appointment={mockAppointment} />
              </motion.div>

              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.3 }}
              >
                <SecurityClearance 
                  clearanceLevel={mockSecurity?.clearanceLevel}
                  badgeType={mockSecurity?.badgeType}
                  facilityAccess={mockSecurity?.facilityAccess}
                />
              </motion.div>
            </div>
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            className="mt-8"
          >
            <ConfirmationActions
              onConfirm={handleConfirmIdentity}
              onReject={handleRejectIdentity}
              isLoading={isLoading}
            />
          </motion.div>

          {/* Status Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.3 }}
            className="mt-6 text-center"
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full">
              <Icon name="Shield" size={16} color="var(--color-success)" strokeWidth={2} />
              <span className="text-sm font-medium text-success">
                Secure Identity Verification Complete
              </span>
            </div>
          </motion.div>
        </div>
      </motion.main>
    </div>
  );
};

export default FaceConfirmation;