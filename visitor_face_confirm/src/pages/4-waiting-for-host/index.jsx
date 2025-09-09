import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const WaitingForHost = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [waitingDuration, setWaitingDuration] = useState(0);
  
  // Get appointment data from location state
  const appointment = location?.state?.appointment || {};
  const isConfirmed = location?.state?.confirmed || false;

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Update waiting duration
  useEffect(() => {
    const timer = setInterval(() => {
      setWaitingDuration(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatWaitingTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds?.toString()?.padStart(2, '0')}`;
  };

  const handleCancelVisit = () => {
    console.log('Visitor cancelled the visit');
    // In real app, this would notify the host of cancellation
    navigate('/2a-visitor-identification');
  };

  const handleContactHost = () => {
    console.log('Attempting to contact host:', appointment?.hostName);
    // In real app, this would send an urgent message to the host
    alert('Host has been notified of your urgent request. Please wait for their response.');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 py-8">
          <div className="w-full max-w-2xl mx-auto space-y-8">
            
            {/* Current Time */}
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Current Time</p>
              <p className="text-lg font-mono text-foreground">
                {currentTime?.toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: true
                })}
              </p>
            </div>

            {/* Main Waiting Card */}
            <div className="bg-card rounded-xl border border-border elevation-card p-8 md:p-12">
              
              {/* Waiting Header */}
              <div className="text-center mb-8">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="Clock" size={40} color="var(--color-primary)" className="animate-pulse" />
                  </div>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                  Waiting for Your Host
                </h1>
                <p className="text-muted-foreground max-w-md mx-auto mb-4">
                  {isConfirmed ? 'Your host has been notified of your arrival.' : 'Please wait while we contact your host.'} 
                  They will be with you shortly.
                </p>
                
                {/* Waiting Duration */}
                <div className="flex items-center justify-center space-x-2 text-lg font-mono text-primary">
                  <Icon name="Timer" size={20} />
                  <span>Waiting: {formatWaitingTime(waitingDuration)}</span>
                </div>
              </div>

              {/* Appointment Summary */}
              {appointment?.hostName && (
                <div className="bg-muted/20 rounded-lg p-6 mb-8 space-y-4">
                  <h3 className="font-semibold text-foreground text-center mb-4">
                    Appointment Details
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-3">
                      <Icon name="User" size={16} color="var(--color-muted-foreground)" />
                      <div>
                        <p className="text-muted-foreground">Host</p>
                        <p className="font-medium text-foreground">{appointment?.hostName}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Icon name="Building" size={16} color="var(--color-muted-foreground)" />
                      <div>
                        <p className="text-muted-foreground">Department</p>
                        <p className="font-medium text-foreground">{appointment?.hostDepartment}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Icon name="MapPin" size={16} color="var(--color-muted-foreground)" />
                      <div>
                        <p className="text-muted-foreground">Location</p>
                        <p className="font-medium text-foreground">{appointment?.location}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Icon name="Target" size={16} color="var(--color-muted-foreground)" />
                      <div>
                        <p className="text-muted-foreground">Purpose</p>
                        <p className="font-medium text-foreground">{appointment?.purpose}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Status Indicators */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="flex items-center space-x-3 p-4 bg-success/10 rounded-lg">
                  <Icon name="CheckCircle" size={20} color="var(--color-success)" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Check-in Complete</p>
                    <p className="text-xs text-muted-foreground">You're in the system</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-4 bg-primary/10 rounded-lg">
                  <Icon name="Bell" size={20} color="var(--color-primary)" className="animate-pulse" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Host Notified</p>
                    <p className="text-xs text-muted-foreground">Notification sent</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-4 bg-muted/20 rounded-lg">
                  <Icon name="Clock" size={20} color="var(--color-muted-foreground)" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Awaiting Response</p>
                    <p className="text-xs text-muted-foreground">Please be patient</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full border-2 border-primary/30 hover:border-primary text-primary hover:bg-primary/5 py-3"
                  onClick={handleContactHost}
                >
                  <Icon name="MessageSquare" size={20} className="mr-2" />
                  Send Urgent Message to Host
                </Button>
                
                <Button
                  variant="ghost"
                  size="lg"
                  className="w-full text-muted-foreground hover:text-destructive hover:bg-destructive/5 py-3"
                  onClick={handleCancelVisit}
                >
                  <Icon name="X" size={20} className="mr-2" />
                  Cancel Visit
                </Button>
              </div>
            </div>

            {/* Instructions */}
            <div className="text-center space-y-4">
              <div className="bg-muted/20 rounded-lg p-4">
                <p className="text-sm text-muted-foreground">
                  <Icon name="Info" size={16} className="inline mr-2" />
                  Please remain in the reception area. Your host will come to meet you or send further instructions.
                </p>
              </div>
              
              {/* System Status */}
              <div className="flex items-center justify-center space-x-6 text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span>Host Notification Active</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span>Real-time Updates</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Shield" size={12} />
                  <span>Secure Session</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WaitingForHost;