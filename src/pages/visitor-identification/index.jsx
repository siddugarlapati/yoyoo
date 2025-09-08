import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import CameraSection from './components/CameraSection';
import ManualIdentification from './components/ManualIdentification';
import RecognitionStatus from './components/RecognitionStatus';

const VisitorIdentification = () => {
  const navigate = useNavigate();
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [recognitionStatus, setRecognitionStatus] = useState(null);
  const [showManualOptions, setShowManualOptions] = useState(false);
  const [cameraExpanded, setCameraExpanded] = useState(true);

  const handleStartRecognition = () => {
    setIsRecognizing(true);
    setRecognitionStatus('processing');
  };

  const handleRecognitionComplete = (success) => {
    setIsRecognizing(false);
    
    if (success) {
      setRecognitionStatus('success');
      // Auto-proceed after 2 seconds
      setTimeout(() => {
        navigate('/face-confirmation');
      }, 2000);
    } else {
      setRecognitionStatus('failed');
      setCameraExpanded(false);
      setShowManualOptions(true);
    }
  };

  const handleRetryRecognition = () => {
    setRecognitionStatus(null);
    setCameraExpanded(true);
    setShowManualOptions(false);
  };

  const handleProceedToConfirmation = () => {
    navigate('/face-confirmation');
  };

  const handleBackNavigation = () => {
    navigate('/welcome-screen');
  };

  return (
    <>
      <Helmet>
        <title>Visitor Identification - TEC Workplace Management</title>
        <meta name="description" content="Identify yourself through face recognition or manual appointment lookup" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          <div className="max-w-4xl mx-auto px-6 py-8">
            {/* Page Header */}
            <motion.div
              className="text-center space-y-4 mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-center space-x-4 mb-4">
                <Button
                  variant="ghost"
                  onClick={handleBackNavigation}
                  iconName="ArrowLeft"
                  iconPosition="left"
                  iconSize={20}
                  className="absolute left-6 top-24"
                >
                  Back
                </Button>
                
                <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-full">
                  <Icon name="UserCheck" size={32} color="white" strokeWidth={2} />
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-text-primary">
                Visitor Identification
              </h1>
              <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                Please position yourself in front of the camera for face recognition, 
                or use manual identification below
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Camera Section */}
              <motion.div
                className="lg:col-span-2 space-y-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="bg-card rounded-lg border border-border p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-text-primary">
                      Face Recognition
                    </h2>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                      <span className="text-text-secondary text-sm">Ready</span>
                    </div>
                  </div>

                  <CameraSection
                    isRecognizing={isRecognizing}
                    onRecognitionComplete={handleRecognitionComplete}
                    isExpanded={cameraExpanded}
                  />

                  {/* Recognition Controls */}
                  <div className="flex justify-center">
                    {!isRecognizing && !recognitionStatus && (
                      <Button
                        variant="default"
                        size="lg"
                        onClick={handleStartRecognition}
                        iconName="Camera"
                        iconPosition="left"
                        iconSize={20}
                      >
                        Start Face Recognition
                      </Button>
                    )}
                  </div>

                  {/* Recognition Status */}
                  {recognitionStatus && (
                    <RecognitionStatus
                      status={recognitionStatus}
                      onRetry={handleRetryRecognition}
                      onProceed={handleProceedToConfirmation}
                    />
                  )}
                </div>
              </motion.div>

              {/* Manual Identification Section */}
              <motion.div
                className="lg:col-span-1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="bg-card rounded-lg border border-border p-6 h-fit">
                  <ManualIdentification isVisible={showManualOptions || !cameraExpanded} />
                  
                  {/* Alternative Options */}
                  {!showManualOptions && cameraExpanded && (
                    <div className="space-y-4">
                      <div className="text-center space-y-3">
                        <Icon name="Smartphone" size={48} color="var(--color-muted-foreground)" strokeWidth={1.5} />
                        <h3 className="text-lg font-medium text-text-primary">
                          Alternative Options
                        </h3>
                        <p className="text-text-secondary text-sm">
                          Having trouble with face recognition? Try these alternatives
                        </p>
                      </div>

                      <div className="space-y-3">
                        <Button
                          variant="outline"
                          fullWidth
                          onClick={() => {
                            setCameraExpanded(false);
                            setShowManualOptions(true);
                          }}
                          iconName="Mail"
                          iconPosition="left"
                          iconSize={16}
                        >
                          Use Email Lookup
                        </Button>
                        
                        <Button
                          variant="outline"
                          fullWidth
                          onClick={() => navigate('/new-visitor-registration')}
                          iconName="UserPlus"
                          iconPosition="left"
                          iconSize={16}
                        >
                          New Visitor Registration
                        </Button>
                      </div>

                      {/* Help Information */}
                      <div className="bg-muted rounded-lg p-4 space-y-2">
                        <div className="flex items-center space-x-2">
                          <Icon name="HelpCircle" size={16} color="var(--color-primary)" strokeWidth={2} />
                          <span className="text-primary text-sm font-medium">Tips</span>
                        </div>
                        <ul className="text-text-secondary text-xs space-y-1 ml-6">
                          <li>• Ensure good lighting</li>
                          <li>• Remove glasses if needed</li>
                          <li>• Look directly at camera</li>
                          <li>• Keep face centered in frame</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Progress Indicator */}
            <motion.div
              className="mt-12 flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                    <Icon name="Home" size={16} color="var(--color-text-secondary)" strokeWidth={2} />
                  </div>
                  <span className="text-text-secondary text-sm">Welcome</span>
                </div>
                
                <div className="w-8 h-0.5 bg-border" />
                
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="UserCheck" size={16} color="white" strokeWidth={2} />
                  </div>
                  <span className="text-primary text-sm font-medium">Identify</span>
                </div>
                
                <div className="w-8 h-0.5 bg-border" />
                
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                    <Icon name="Camera" size={16} color="var(--color-text-secondary)" strokeWidth={2} />
                  </div>
                  <span className="text-text-secondary text-sm">Verify</span>
                </div>
                
                <div className="w-8 h-0.5 bg-border" />
                
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                    <Icon name="CheckCircle" size={16} color="var(--color-text-secondary)" strokeWidth={2} />
                  </div>
                  <span className="text-text-secondary text-sm">Confirm</span>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </>
  );
};

export default VisitorIdentification;