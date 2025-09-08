import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from '../../components/ui/Header';
import BookingModal from './components/BookingModal';
import BookingSuccess from './components/BookingSuccess';

const BookingConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedDesk, setSelectedDesk] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Mock desk data - in real app this would come from props/state
  const mockSelectedDesk = {
    id: 'desk-42',
    name: 'Desk 42',
    zone: 'Collaboration Zone',
    status: 'available',
    amenities: ['Dual Monitor', 'Standing Desk', 'Whiteboard', 'Power Outlet'],
    floor: '2nd Floor',
    section: 'East Wing'
  };

  useEffect(() => {
    // Get selected desk from location state or use mock data
    const deskFromState = location?.state?.selectedDesk || mockSelectedDesk;
    setSelectedDesk(deskFromState);
    
    // Auto-open modal when component mounts
    setIsModalOpen(true);
  }, [location?.state]);

  const handleConfirmBooking = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Close modal and show success
      setIsModalOpen(false);
      setTimeout(() => {
        setShowSuccess(true);
      }, 300);
      
    } catch (error) {
      console.error('Booking confirmation failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Navigate back to hot desk selection
    navigate('/hot-desk-selection');
  };

  const handleCompleteCheckIn = () => {
    setShowSuccess(false);
    // Navigate to check-in complete screen
    navigate('/check-in-complete', {
      state: {
        selectedDesk,
        bookingConfirmed: true,
        checkInTime: new Date()?.toISOString()
      }
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Main Content - Hidden behind modal */}
      <main className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center p-8">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-semibold text-foreground mb-4">
              Booking Confirmation
            </h1>
            <p className="text-muted-foreground mb-6">
              Please review and confirm your workspace selection.
            </p>
            
            {/* Fallback content if modal doesn't open */}
            {!isModalOpen && !showSuccess && selectedDesk && (
              <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
                <h2 className="text-lg font-medium text-foreground mb-2">
                  {selectedDesk?.name}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {selectedDesk?.zone}
                </p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Review Booking
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
      {/* Modal Components */}
      <AnimatePresence mode="wait">
        {isModalOpen && (
          <BookingModal
            key="booking-modal"
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            selectedDesk={selectedDesk}
            onConfirm={handleConfirmBooking}
            isLoading={isLoading}
          />
        )}
        
        {showSuccess && (
          <BookingSuccess
            key="booking-success"
            isVisible={showSuccess}
            selectedDesk={selectedDesk}
            onComplete={handleCompleteCheckIn}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default BookingConfirmation;