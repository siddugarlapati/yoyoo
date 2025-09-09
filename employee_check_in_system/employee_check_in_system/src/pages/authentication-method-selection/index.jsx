import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import AuthProgressIndicator from '../../components/ui/AuthProgressIndicator';
import SecurityTrustBar from '../../components/ui/SecurityTrustBar';
import AuthMethodCard from './components/AuthMethodCard';
import WorkspaceBookingInfo from './components/WorkspaceBookingInfo';
import SecurityBadges from './components/SecurityBadges';
import CheckInStatus from './components/CheckInStatus';
import FaceCameraView from './components/FaceCameraView';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const AuthenticationMethodSelection = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showFaceCamera, setShowFaceCamera] = useState(false);

  // Mock employee data
  const employee = {
    id: "EMP001234",
    firstName: "Sarah",
    lastName: "Johnson",
    department: "Engineering",
    role: "Senior Developer",
    status: "active"
  };

  // Mock booking data
  const bookingData = {
    workspaceId: "WS-A-101",
    location: "Tech Tower Building A",
    floor: 3,
    deskNumber: "A-301-15",
    bookingTime: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes from now
    duration: "8 hours",
    status: "confirmed"
  };

  // Mock check-in data
  const lastCheckIn = {
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
    method: "Face Recognition",
    location: "Building A"
  };

  const todayStats = {
    checkIns: 1,
    hoursWorked: 6.5,
    status: "In Office"
  };

  // Authentication methods configuration
  const authMethods = [
    {
      method: 'face-recognition',
      icon: 'Camera',
      title: 'Face Recognition',
      description: 'Quick and secure biometric authentication using your camera',
      features: [
        'Instant recognition in under 2 seconds',
        'Works in various lighting conditions',
        'No physical contact required',
        'Highest security level'
      ],
      isRecommended: true,
      disabled: false
    },
    {
      method: 'badge-scanning',
      icon: 'CreditCard',
      title: 'Badge Scanning',
      description: 'Scan your employee badge using your device camera',
      features: [
        'Compatible with all badge types',
        'QR code and barcode support',
        'Backup authentication method',
        'Works offline'
      ],
      isRecommended: false,
      disabled: false
    },
    {
      method: 'email-login',
      icon: 'Mail',
      title: 'Email Login',
      description: 'Traditional email and password authentication',
      features: [
        'Familiar login process',
        'Two-factor authentication',
        'Password recovery available',
        'Universal compatibility'
      ],
      isRecommended: false,
      disabled: false
    }
  ];

  const handleMethodSelection = async (method) => {
    setSelectedMethod(method);
    
    if (method === 'face-recognition') {
      // Show live camera view immediately for face recognition
      setShowFaceCamera(true);
      return;
    }
    
    setIsLoading(true);

    // Simulate loading delay for other methods
    setTimeout(() => {
      setIsLoading(false);
      
      // Navigate based on selected method
      switch (method) {
        case 'badge-scanning': navigate('/badge-scanning-auth');
          break;
        case 'email-login': navigate('/email-login-auth');
          break;
        default:
          console.error('Unknown authentication method:', method);
      }
    }, 1500);
  };

  const handleCloseFaceCamera = () => {
    setShowFaceCamera(false);
    setSelectedMethod(null);
  };

  const handleBackToDashboard = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Progress Indicator */}
        <AuthProgressIndicator 
          currentStep={1}
          totalSteps={3}
          steps={['Method Selection', 'Authentication', 'Verification']}
        />

        <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
          {/* Page Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Button
                variant="ghost"
                size="sm"
                iconName="ArrowLeft"
                iconPosition="left"
                onClick={handleBackToDashboard}
                className="absolute left-6 top-4"
              >
                Back to Dashboard
              </Button>
            </div>
            
            <h1 className="text-3xl font-bold text-text-primary">
              Choose Your Check-in Method
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Select your preferred authentication method to access your workspace. 
              All methods are secure and comply with corporate security standards.
            </p>
          </div>

          {/* Employee Status */}
          <CheckInStatus 
            employee={employee}
            lastCheckIn={lastCheckIn}
            todayStats={todayStats}
          />

          {/* Authentication Methods */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-text-primary mb-2">
                Available Authentication Methods
              </h2>
              <p className="text-text-secondary">
                Choose the method that works best for you
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {authMethods?.map((method) => (
                <AuthMethodCard
                  key={method?.method}
                  method={method?.method}
                  icon={method?.icon}
                  title={method?.title}
                  description={method?.description}
                  features={method?.features}
                  isRecommended={method?.isRecommended}
                  disabled={method?.disabled || isLoading || showFaceCamera}
                  onClick={() => handleMethodSelection(method?.method)}
                />
              ))}
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-card rounded-lg p-8 max-w-sm mx-4 text-center">
                <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  Initializing {selectedMethod?.replace('-', ' ')}...
                </h3>
                <p className="text-text-secondary">
                  Please wait while we prepare your authentication method
                </p>
              </div>
            </div>
          )}

          {/* Secondary Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Workspace Booking Info */}
            <WorkspaceBookingInfo bookingData={bookingData} />

            {/* Security Information */}
            <div className="space-y-4">
              <SecurityBadges />
              
              {/* Help Section */}
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Icon name="HelpCircle" size={16} className="text-primary" />
                  <h4 className="text-sm font-semibold text-text-primary">Need Help?</h4>
                </div>
                <p className="text-xs text-text-secondary mb-3">
                  Having trouble with authentication? Our support team is here to help.
                </p>
                <div className="flex space-x-2">
                  <Button variant="outline" size="xs" iconName="Phone">
                    Call Support
                  </Button>
                  <Button variant="ghost" size="xs" iconName="MessageCircle">
                    Live Chat
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-muted border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              Authentication Statistics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">98.7%</div>
                <div className="text-xs text-text-secondary">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success">1.2s</div>
                <div className="text-xs text-text-secondary">Avg. Speed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-warning">24/7</div>
                <div className="text-xs text-text-secondary">Availability</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-text-primary">15,847</div>
                <div className="text-xs text-text-secondary">Daily Check-ins</div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Face Camera View Modal */}
      {showFaceCamera && (
        <FaceCameraView 
          onClose={handleCloseFaceCamera}
          employee={employee}
        />
      )}
      
      <SecurityTrustBar />
    </div>
  );
};

export default AuthenticationMethodSelection;