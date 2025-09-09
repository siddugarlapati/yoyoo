import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import AppointmentDetailsCard from './components/AppointmentDetailsCard';

const VisitorDetailsConfirm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentTime, setCurrentTime] = useState(new Date());

  // Mock appointment data - in real app this would come from manual entry search
  const mockAppointment = {
    id: "APT-2025-002",
    visitorName: "Emily Chen",
    visitorCompany: "Digital Solutions Inc.",
    hostName: "David Wilson",
    hostDepartment: "Marketing",
    date: "2025-01-08",
    time: "14:30:00",
    purpose: "Partnership Discussion",
    location: "Meeting Room A-5",
    duration: "45 minutes",
    verificationCode: "VM7892"
  };

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleConfirmAndNotifyHost = () => {
    console.log('Confirming appointment and notifying host:', mockAppointment);
    
    // In real app, this would:
    // 1. Update appointment status to confirmed
    // 2. Send notification to host via email/SMS
    // 3. Log the confirmation event
    // 4. Generate visitor access credentials
    
    // Navigate to waiting screen
    navigate('/4-waiting-for-host', { 
      state: { 
        appointment: mockAppointment,
        confirmed: true 
      }
    });
  };

  const handleIncorrectDetails = () => {
    console.log('Visitor indicated incorrect details');
    
    // In real app, this would:
    // 1. Log the rejection event
    // 2. Clear current search results
    // 3. Reset identification process
    
    // Navigate back to visitor identification
    navigate('/2a-visitor-identification');
  };

  const formatTime = (timeString) => {
    const time = new Date(`2000-01-01T${timeString}`);
    return time?.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
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
                onClick={() => navigate(-1)}
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors duration-150"
              >
                <Icon name="ArrowLeft" size={20} />
                <span className="text-sm font-medium">Back</span>
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

            {/* Main Content Card */}
            <div className="bg-card rounded-xl border border-border elevation-card p-8 md:p-12">
              
              {/* Success Header */}
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center">
                    <Icon name="CheckCircle" size={32} color="var(--color-success)" />
                  </div>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  We found your appointment
                </h1>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Please review the details below to confirm this is your scheduled visit
                </p>
              </div>

              {/* Appointment Details */}
              <div className="mb-8">
                <AppointmentDetailsCard appointment={mockAppointment} />
              </div>

              {/* Action Buttons */}
              <div className="space-y-4 mb-6">
                <Button
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-4 text-lg"
                  onClick={handleConfirmAndNotifyHost}
                >
                  <Icon name="UserCheck" size={20} className="mr-3" />
                  Confirm & Notify Host
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full border-2 border-muted-foreground/20 hover:border-muted-foreground/40 text-muted-foreground hover:text-foreground py-3"
                  onClick={handleIncorrectDetails}
                >
                  <Icon name="AlertCircle" size={20} className="mr-2" />
                  Incorrect Details?
                </Button>
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
                  <div className="flex items-center space-x-2">
                    <Icon name="Hash" size={16} />
                    <span>#{mockAppointment?.verificationCode}</span>
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground max-w-md mx-auto">
                  Once confirmed, your host will be notified of your arrival and you'll receive further instructions for your visit.
                </p>
              </div>
            </div>

            {/* System Status */}
            <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span>Appointment System Active</span>
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

export default VisitorDetailsConfirm;