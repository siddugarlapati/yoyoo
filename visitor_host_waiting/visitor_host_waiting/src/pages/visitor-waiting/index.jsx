import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import WaitingHeader from './components/WaitingHeader';
import HostNotification from './components/HostNotification';
import LoadingSpinner from './components/LoadingSpinner';
import WaitingInstructions from './components/WaitingInstructions';
import SecurityBadges from './components/SecurityBadges';

const VisitorWaiting = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Mock data - in real app this would come from props/state
  const mockVisitorData = {
    visitorName: "Sarah Johnson",
    hostName: "Michael Chen",
    checkInTime: new Date()?.toLocaleTimeString(),
    visitPurpose: "Business Meeting"
  };
  
  // Get data from navigation state or use mock data
  const visitorData = location?.state || mockVisitorData;
  
  const [notificationSent, setNotificationSent] = useState(false);
  const [isWaiting, setIsWaiting] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState('connecting');
  const [acknowledgmentReceived, setAcknowledgmentReceived] = useState(false);

  // Simulate WebSocket connection and host notification
  useEffect(() => {
    let notificationTimer;
    let acknowledgmentTimer;
    let websocketSimulation;

    // Simulate sending notification to host
    notificationTimer = setTimeout(() => {
      setNotificationSent(true);
      setConnectionStatus('connected');
      
      // Log notification sent (mock API call)
      console.log('Notification sent to host:', {
        hostName: visitorData?.hostName,
        visitorName: visitorData?.visitorName,
        timestamp: new Date()?.toISOString(),
        method: 'push_notification'
      });
    }, 2000);

    // Simulate WebSocket connection for real-time updates
    websocketSimulation = setTimeout(() => {
      setIsWaiting(true);
      
      // Simulate host acknowledgment after random time (5-15 seconds)
      const acknowledgmentDelay = Math.random() * 10000 + 5000;
      
      acknowledgmentTimer = setTimeout(() => {
        setAcknowledgmentReceived(true);
        
        // Log acknowledgment received (mock API call)
        console.log('Host acknowledgment received:', {
          hostName: visitorData?.hostName,
          visitorName: visitorData?.visitorName,
          acknowledgmentTime: new Date()?.toISOString(),
          responseTime: acknowledgmentDelay
        });
        
        // Auto-transition to completion screen
        setTimeout(() => {
          navigate('/check-in-complete', {
            state: {
              ...visitorData,
              acknowledgmentTime: new Date()?.toISOString(),
              status: 'acknowledged'
            }
          });
        }, 2000);
      }, acknowledgmentDelay);
    }, 3000);

    // Cleanup function
    return () => {
      if (notificationTimer) clearTimeout(notificationTimer);
      if (acknowledgmentTimer) clearTimeout(acknowledgmentTimer);
      if (websocketSimulation) clearTimeout(websocketSimulation);
    };
  }, [navigate, visitorData]);

  // Handle connection retry (mock)
  const handleRetryConnection = () => {
    setConnectionStatus('connecting');
    setNotificationSent(false);
    
    setTimeout(() => {
      setConnectionStatus('connected');
      setNotificationSent(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Connection Status Indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium ${
            connectionStatus === 'connected' ?'bg-success/10 text-success' 
              : connectionStatus === 'connecting' ?'bg-warning/10 text-warning' :'bg-error/10 text-error'
          }`}>
            <div className={`w-2 h-2 rounded-full ${
              connectionStatus === 'connected' ?'bg-success breathing-animation' 
                : connectionStatus === 'connecting' ?'bg-warning animate-pulse' :'bg-error'
            }`} />
            <span>
              {connectionStatus === 'connected' && 'System Connected'}
              {connectionStatus === 'connecting' && 'Connecting...'}
              {connectionStatus === 'error' && 'Connection Error'}
            </span>
          </div>
        </div>

        {/* Main Waiting Interface */}
        <div className="space-y-8">
          <WaitingHeader visitorName={visitorData?.visitorName} />
          
          <HostNotification 
            hostName={visitorData?.hostName} 
            notificationSent={notificationSent} 
          />
          
          {acknowledgmentReceived ? (
            <div className="bg-success/10 border border-success/20 rounded-xl p-8 text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-success rounded-full mb-4 mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-success mb-2">
                Host Acknowledged!
              </h3>
              <p className="text-success/80">
                {visitorData?.hostName} has confirmed your arrival. Redirecting you now...
              </p>
            </div>
          ) : (
            <LoadingSpinner isWaiting={isWaiting} />
          )}
          
          <WaitingInstructions />
          
          {/* Visit Details Card */}
          <div className="bg-card border border-border rounded-xl p-6 card-shadow">
            <h3 className="text-lg font-semibold text-foreground mb-4">Visit Details</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Check-in Time:</span>
                <span className="ml-2 font-medium text-foreground">{visitorData?.checkInTime}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Purpose:</span>
                <span className="ml-2 font-medium text-foreground">{visitorData?.visitPurpose}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Host:</span>
                <span className="ml-2 font-medium text-foreground">{visitorData?.hostName}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Status:</span>
                <span className={`ml-2 font-medium ${
                  acknowledgmentReceived ? 'text-success' : notificationSent ? 'text-warning' : 'text-muted-foreground'
                }`}>
                  {acknowledgmentReceived ? 'Acknowledged' : notificationSent ? 'Waiting' : 'Processing'}
                </span>
              </div>
            </div>
          </div>
          
          <SecurityBadges />
        </div>

        {/* Connection Error Retry */}
        {connectionStatus === 'error' && (
          <div className="fixed bottom-6 right-6">
            <button
              onClick={handleRetryConnection}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Retry Connection
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default VisitorWaiting;