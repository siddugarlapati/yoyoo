import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import VisitorInfoCard from './components/VisitorInfoCard';
import AppointmentDetailsCard from './components/AppointmentDetailsCard';
import AccessPermissionsCard from './components/AccessPermissionsCard';
import SafetyAcknowledgmentCard from './components/SafetyAcknowledgmentCard';
import EmergencyContactCard from './components/EmergencyContactCard';
import ProgressIndicator from './components/ProgressIndicator';

const DetailsConfirmation = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [safetyAcknowledged, setSafetyAcknowledged] = useState(false);
  const [acknowledgments, setAcknowledgments] = useState({});

  // Mock data for visitor details
  const visitorData = {
    name: "Sarah Johnson",
    company: "TechCorp Solutions",
    email: "demo@tec.com",
    phone: "+1 (555) 123-4567",
    idType: "Driver\'s License",
    idNumber: "DL123456789",
    photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face"
  };

  const appointmentData = {
    date: "2025-01-08",
    startTime: "14:30",
    endTime: "16:00",
    duration: "1 hour 30 minutes",
    hostName: "Michael Rodriguez",
    hostEmail: "michael.rodriguez@tec.com",
    location: "TEC Main Building, Floor 3",
    room: "Conference Room B",
    purpose: "Quarterly business review meeting to discuss project milestones, budget allocation, and strategic planning for Q2 2025 initiatives."
  };

  const accessData = {
    clearanceLevel: "Standard",
    badgeType: "Visitor Badge - Standard",
    validUntil: "01/08/2025 6:00 PM",
    escortRequired: false,
    permittedAreas: [
      "Main Lobby",
      "Conference Room B",
      "Cafeteria - Level 1",
      "Restrooms - All Floors",
      "Emergency Exits"
    ],
    restrictedAreas: [
      "Server Room",
      "Executive Offices",
      "R&D Laboratory",
      "Security Control Room",
      "Employee-Only Areas"
    ]
  };

  const safetyData = {
    briefings: [
      {
        title: "General Safety Orientation",
        duration: "5 minutes",
        type: "Interactive Video"
      },
      {
        title: "Emergency Procedures",
        duration: "3 minutes",
        type: "Digital Guide"
      },
      {
        title: "Facility Guidelines",
        duration: "2 minutes",
        type: "Quick Reference"
      }
    ],
    requirements: [
      {
        id: "safety_protocols",
        text: "I have reviewed and understand the safety protocols",
        description: "Includes emergency procedures, evacuation routes, and safety equipment locations",
        required: true
      },
      {
        id: "facility_policies",
        text: "I agree to comply with all facility policies during my visit",
        description: "Photography restrictions, confidentiality agreements, and behavioral guidelines",
        required: true
      },
      {
        id: "health_declaration",
        text: "I confirm that I am in good health and have no symptoms of illness",
        description: "Required for workplace safety and health compliance",
        required: true
      },
      {
        id: "data_privacy",
        text: "I understand the data privacy and confidentiality requirements",
        description: "Information handling, non-disclosure, and privacy protection policies",
        required: false
      }
    ]
  };

  const [emergencyContact, setEmergencyContact] = useState({
    name: "Robert Johnson",
    relationship: "Spouse",
    phone: "+1 (555) 987-6543",
    email: "robert.johnson@email.com"
  });

  const handleSafetyAcknowledgment = (allAcknowledged, acknowledgmentData) => {
    setSafetyAcknowledged(allAcknowledged);
    setAcknowledgments(acknowledgmentData);
  };

  const handleEmergencyContactUpdate = (updatedContact) => {
    setEmergencyContact(updatedContact);
  };

  const handleCompleteCheckIn = async () => {
    if (!safetyAcknowledged) {
      alert('Please acknowledge all required safety protocols before proceeding.');
      return;
    }

    setIsLoading(true);
    
    // Simulate check-in completion process
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to success page or welcome screen
      navigate('/welcome-screen', { 
        state: { 
          checkInComplete: true,
          visitorName: visitorData?.name,
          badgeNumber: 'VIS-' + Math.random()?.toString(36)?.substr(2, 6)?.toUpperCase()
        }
      });
    }, 2000);
  };

  const handleEditInformation = () => {
    navigate('/face-confirmation', { 
      state: { 
        editMode: true,
        visitorData,
        appointmentData 
      }
    });
  };

  const handleGoBack = () => {
    navigate('/face-confirmation');
  };

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center mb-4">
              <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full">
                <Icon name="CheckCircle" size={32} color="var(--color-primary)" />
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              Review Your Details
            </h1>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Please review all information below for accuracy. Once confirmed, your visitor badge will be generated and you'll be granted access to the facility.
            </p>
          </motion.div>

          {/* Progress Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <ProgressIndicator currentStep={4} totalSteps={5} />
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Information */}
            <div className="lg:col-span-2 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <VisitorInfoCard visitorData={visitorData} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <AppointmentDetailsCard appointmentData={appointmentData} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <AccessPermissionsCard accessData={accessData} />
              </motion.div>
            </div>

            {/* Right Column - Additional Information */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <EmergencyContactCard 
                  emergencyData={emergencyContact}
                  onContactUpdate={handleEmergencyContactUpdate}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <SafetyAcknowledgmentCard 
                  safetyData={safetyData}
                  onAcknowledgmentChange={handleSafetyAcknowledgment}
                />
              </motion.div>
            </div>
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <Button
              variant="outline"
              size="lg"
              onClick={handleGoBack}
              iconName="ArrowLeft"
              iconPosition="left"
              iconSize={18}
              className="w-full sm:w-auto"
            >
              Go Back
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={handleEditInformation}
              iconName="Edit2"
              iconPosition="left"
              iconSize={18}
              className="w-full sm:w-auto"
            >
              Edit Information
            </Button>

            <Button
              variant="default"
              size="lg"
              onClick={handleCompleteCheckIn}
              loading={isLoading}
              disabled={!safetyAcknowledged}
              iconName="Check"
              iconPosition="left"
              iconSize={18}
              className="w-full sm:w-auto"
            >
              {isLoading ? 'Processing...' : 'Complete Check-In'}
            </Button>
          </motion.div>

          {/* Additional Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8 text-center"
          >
            <div className="bg-muted/50 rounded-lg p-6">
              <div className="flex items-center justify-center mb-3">
                <Icon name="Info" size={20} color="var(--color-primary)" />
              </div>
              <h3 className="text-sm font-semibold text-text-primary mb-2">
                What happens next?
              </h3>
              <p className="text-text-secondary text-sm max-w-2xl mx-auto">
                After completing check-in, your visitor badge will be printed automatically. Please proceed to the reception desk to collect your badge and receive any additional instructions from our staff.
              </p>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default DetailsConfirmation;