import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import SystemStatus from '../../components/ui/SystemStatus';
import RegistrationHeader from './components/RegistrationHeader';
import VisitorForm from './components/VisitorForm';
import Icon from '../../components/AppIcon';

const NewVisitorRegistration = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [systemStatus, setSystemStatus] = useState({
    type: 'info',
    message: '',
    isVisible: false
  });

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    setSystemStatus({
      type: 'info',
      message: 'Processing your registration...',
      isVisible: true
    });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful registration
      console.log('Registration submitted:', formData);
      
      setSystemStatus({
        type: 'success',
        message: `Registration successful! ${formData?.hostEmployee?.name} has been notified of your arrival.`,
        isVisible: true
      });

      // Navigate to waiting screen after success message
      setTimeout(() => {
        // In a real app, this would navigate to a waiting screen
        // navigate('/visitor-waiting');
        alert('Registration completed successfully! You would now be redirected to the waiting area.');
      }, 2000);

    } catch (error) {
      setSystemStatus({
        type: 'error',
        message: 'Registration failed. Please try again or contact reception for assistance.',
        isVisible: true
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    // In a real app, this would navigate back to visitor identification
    // navigate('/visitor-identification');
    if (window.confirm('Are you sure you want to cancel your registration? All entered information will be lost.')) {
      alert('Registration cancelled. You would be redirected to the visitor identification screen.');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header 
        systemTitle="Visitor Registration System"
        logoSrc="/assets/images/logo.png"
      />
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* System Status */}
        {systemStatus?.isVisible && (
          <div className="mb-6">
            <SystemStatus
              type={systemStatus?.type}
              message={systemStatus?.message}
              isLoading={isSubmitting}
            />
          </div>
        )}

        {/* Registration Card */}
        <div className="bg-card rounded-lg shadow-gentle border border-border overflow-hidden">
          {/* Card Header */}
          <div className="px-6 py-8 sm:px-8 sm:py-10">
            <RegistrationHeader />
          </div>

          {/* Card Content */}
          <div className="px-6 pb-8 sm:px-8 sm:pb-10">
            <div className="max-w-2xl mx-auto">
              <VisitorForm
                onSubmit={handleFormSubmit}
                onCancel={handleCancel}
              />
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-2 text-sm text-text-secondary">
            <Icon name="HelpCircle" size={16} />
            <span>Need assistance? Contact reception at</span>
            <a 
              href="tel:+1-555-0123" 
              className="text-primary hover:text-primary/80 font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 rounded"
            >
              (555) 012-3456
            </a>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 max-w-2xl mx-auto">
          <div className="flex items-start space-x-3 p-4 bg-muted/30 rounded-lg border border-border/50">
            <Icon name="Shield" size={20} className="text-primary mt-0.5 flex-shrink-0" />
            <div className="text-sm text-text-secondary">
              <p className="font-medium text-text-primary mb-1">Privacy & Security</p>
              <p>
                Your information is encrypted and securely stored. We only collect data necessary 
                for visitor management and will not share it with third parties without your consent.
              </p>
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 mt-12">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-sm text-text-secondary">
            © {new Date()?.getFullYear()} Visitor Registration System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default NewVisitorRegistration;