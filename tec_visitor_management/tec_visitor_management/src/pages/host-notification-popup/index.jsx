import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/ui/Modal';
import Toast from '../../components/ui/Toast';
import Header from '../../components/ui/Header';
import NotificationHeader from './components/NotificationHeader';
import VisitorInfoCard from './components/VisitorInfoCard';
import ActionButtons from './components/ActionButtons';

const HostNotificationPopup = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [toast, setToast] = useState(null);

  // Mock visitor data
  const visitorData = {
    id: "VIS-2025-001",
    name: "Sarah Johnson",
    company: "TechCorp Solutions",
    arrivalTime: "2:45 PM",
    purpose: "Product demonstration meeting",
    phone: "+1 (555) 123-4567",
    email: "sarah.johnson@techcorp.com"
  };

  // Mock API call for acknowledgment
  const mockAcknowledgeAPI = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: "Host acknowledgment recorded" });
      }, 1500);
    });
  };

  // Mock API call for decline
  const mockDeclineAPI = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: "Visitor notified of host unavailability" });
      }, 1500);
    });
  };

  const handleAcknowledge = async () => {
    try {
      await mockAcknowledgeAPI();
      setToast({
        id: Date.now(),
        message: "Visitor acknowledged successfully! You can now greet them at reception.",
        type: "success",
        duration: 4000
      });
      
      // Close modal after short delay
      setTimeout(() => {
        setIsModalOpen(false);
        navigate('/visitor-information-display');
      }, 2000);
    } catch (error) {
      setToast({
        id: Date.now(),
        message: "Failed to acknowledge visitor. Please try again.",
        type: "error",
        duration: 4000
      });
    }
  };

  const handleDecline = async () => {
    try {
      await mockDeclineAPI();
      setToast({
        id: Date.now(),
        message: "Visitor has been notified that you are currently unavailable.",
        type: "warning",
        duration: 4000
      });
      
      // Close modal after short delay
      setTimeout(() => {
        setIsModalOpen(false);
        navigate('/welcome-page');
      }, 2000);
    } catch (error) {
      setToast({
        id: Date.now(),
        message: "Failed to decline visitor. Please try again.",
        type: "error",
        duration: 4000
      });
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate('/welcome-page');
  };

  const removeToast = () => {
    setToast(null);
  };

  // Auto-close modal after 5 minutes if no action taken
  useEffect(() => {
    const autoCloseTimer = setTimeout(() => {
      if (isModalOpen) {
        setToast({
          id: Date.now(),
          message: "Notification expired. Visitor has been informed of no response.",
          type: "warning",
          duration: 4000
        });
        setIsModalOpen(false);
        navigate('/welcome-page');
      }
    }, 300000); // 5 minutes

    return () => clearTimeout(autoCloseTimer);
  }, [isModalOpen, navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
        <div className="w-full max-w-md">
          {/* Background overlay for demonstration */}
          <div className="bg-card rounded-lg border border-border shadow-layered p-6 mb-4">
            <div className="text-center space-y-2">
              <h2 className="text-lg font-semibold text-foreground">
                Host Dashboard
              </h2>
              <p className="text-sm text-muted-foreground">
                You will receive visitor notifications here
              </p>
              <div className="w-full h-32 bg-muted/30 rounded-lg flex items-center justify-center">
                <span className="text-muted-foreground text-sm">
                  Your normal work interface
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Notification Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Visitor Notification"
        size="default"
        showCloseButton={false}
        closeOnBackdrop={false}
        closeOnEscape={false}
      >
        <div className="space-y-6">
          <NotificationHeader onClose={handleCloseModal} />
          <VisitorInfoCard visitor={visitorData} />
          <ActionButtons
            onAcknowledge={handleAcknowledge}
            onDecline={handleDecline}
            onClose={handleCloseModal}
          />
        </div>
      </Modal>
      {/* Toast Notifications */}
      {toast && (
        <Toast
          message={toast?.message}
          type={toast?.type}
          duration={toast?.duration}
          onClose={removeToast}
          position="top-right"
        />
      )}
    </div>
  );
};

export default HostNotificationPopup;