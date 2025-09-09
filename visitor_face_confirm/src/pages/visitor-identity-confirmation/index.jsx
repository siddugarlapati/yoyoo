import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import VisitorProfileCard from './components/VisitorProfileCard';
import AppointmentDetails from './components/AppointmentDetails';
import ConfirmationActions from './components/ConfirmationActions';
import SecurityBadge from './components/SecurityBadge';
import Icon from '../../components/AppIcon';

const VisitorIdentityConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  // Mock visitor data - in real app this would come from face recognition system
  const mockVisitor = {
    id: "VIS-2025-001",
    name: "Sarah Johnson",
    profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    email: "sarah.johnson@techcorp.com",
    phone: "+1 (555) 123-4567",
    company: "TechCorp Solutions",
    confidenceScore: 96
  };

  const mockAppointment = {
    id: "APT-2025-001",
    hostName: "Michael Rodriguez",
    hostEmail: "michael.rodriguez@company.com",
    hostDepartment: "Engineering",
    date: "2025-01-08",
    time: "17:30:00",
    purpose: "Product Demo & Technical Discussion",
    location: "Conference Room B-12",
    duration: "60 minutes"
  };

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Enhanced confirmation handler with host notification simulation
  const handleConfirmation = (visitor, appointment) => {
    console.log('🚀 Processing visitor check-in...');
    console.log('📧 Sending notification to host:', appointment?.hostEmail);
    console.log('📱 Host notification details:', {
      hostName: appointment?.hostName,
      visitorName: visitor?.name,
      appointmentTime: appointment?.time,
      location: appointment?.location
    });
    
    // In real implementation, this would trigger:
    // - Email notification to host
    // - SMS/Push notification if configured
    // - Database update for visitor status
    // - Access control system integration
    // - Security logging for audit trail
  };

  // Enhanced rejection handler with security logging
  const handleRejection = (visitor) => {
    console.log('🔒 Identity verification rejected');
    console.log('📝 Security log entry created:', {
      rejectedVisitorId: visitor?.id,
      confidenceScore: visitor?.confidenceScore,
      timestamp: new Date()?.toISOString(),
      action: 'user_rejected_identity'
    });
    
    // In real implementation, this would:
    // - Clear facial recognition session data
    // - Log security event for monitoring
    // - Reset the identification workflow
    // - Prepare manual input form with pre-filled data if available
  };

  // Handle back navigation with state preservation
  const handleBackToIdentification = () => {
    navigate('/visitor-identification', {
      state: {
        returnFromConfirmation: true,
        preservedData: location?.state
      }
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 py-8">
          <div className="w-full max-w-2xl mx-auto space-y-8">
            
            {/* Back Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={handleBackToIdentification}
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors duration-150"
              >
                <Icon name="ArrowLeft" size={20} />
                <span className="text-sm font-medium">Back to Identification</span>
              </button>
              
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Current Time</p>
                <p className="text-sm font-mono text-foreground">
                  {currentTime?.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: true
                  })}
                </p>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="bg-card rounded-xl border border-border elevation-card p-8 md:p-12">
              
              {/* Security Badge */}
              <div className="flex justify-center mb-8">
                <SecurityBadge confidence={mockVisitor?.confidenceScore} />
              </div>

              {/* Visitor Profile */}
              <div className="mb-8">
                <VisitorProfileCard visitor={mockVisitor} />
              </div>

              {/* Appointment Details */}
              <div className="mb-8">
                <AppointmentDetails appointment={mockAppointment} />
              </div>

              {/* Confirmation Actions */}
              <div className="mb-6">
                <ConfirmationActions
                  visitor={mockVisitor}
                  appointment={mockAppointment}
                  onConfirm={handleConfirmation}
                  onReject={handleRejection}
                />
              </div>

              {/* Additional Information */}
              <div className="text-center space-y-4 pt-6 border-t border-border">
                <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Icon name="MapPin" size={16} />
                    <span>{mockAppointment?.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Timer" size={16} />
                    <span>{mockAppointment?.duration}</span>
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground max-w-md mx-auto">
                  By confirming your identity, you agree to follow all building security protocols and visitor guidelines during your stay.
                </p>
              </div>
            </div>

            {/* System Status */}
            <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span>Face Recognition Active</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span>Host Notification Ready</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Shield" size={12} />
                <span>Secure Connection</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VisitorIdentityConfirmation;