import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BookingSuccess = ({ 
  isVisible, 
  selectedDesk, 
  onComplete 
}) => {
  if (!isVisible || !selectedDesk) return null;

  const getCurrentTime = () => {
    return new Date()?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const getBookingReference = () => {
    const timestamp = Date.now()?.toString()?.slice(-6);
    return `WS-${timestamp}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: "spring", duration: 0.4 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <div className="bg-card rounded-2xl shadow-elevated border border-border max-w-md w-full mx-4 overflow-hidden">
        {/* Success Header */}
        <div className="bg-success/10 px-6 py-6 text-center border-b border-border">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="flex items-center justify-center w-16 h-16 bg-success rounded-full mx-auto mb-4"
          >
            <Icon name="Check" size={32} color="white" />
          </motion.div>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Booking Confirmed!
          </h2>
          <p className="text-muted-foreground">
            Your workspace has been successfully reserved
          </p>
        </div>

        {/* Booking Details */}
        <div className="p-6 space-y-4">
          <div className="bg-muted/30 rounded-lg p-4 border border-border">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-foreground">
                {selectedDesk?.name}
              </h3>
              <div className="text-xs text-muted-foreground font-mono">
                Ref: {getBookingReference()}
              </div>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Zone:</span>
                <span className="text-foreground font-medium">
                  {selectedDesk?.zone}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Confirmed at:</span>
                <span className="text-foreground font-medium">
                  {getCurrentTime()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <div className="inline-flex items-center px-2 py-1 bg-success/10 text-success text-xs font-medium rounded-full">
                  <Icon name="Circle" size={6} className="mr-1 fill-current" />
                  Reserved
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
            <h4 className="font-medium text-foreground mb-3 flex items-center">
              <Icon name="Info" size={16} className="mr-2 text-primary" />
              Next Steps
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start">
                <Icon name="ArrowRight" size={14} className="mr-2 mt-0.5 text-primary" />
                Proceed to complete your check-in process
              </li>
              <li className="flex items-start">
                <Icon name="ArrowRight" size={14} className="mr-2 mt-0.5 text-primary" />
                Your desk will be held for 15 minutes
              </li>
              <li className="flex items-start">
                <Icon name="ArrowRight" size={14} className="mr-2 mt-0.5 text-primary" />
                Check-in at the desk to activate your booking
              </li>
            </ul>
          </div>
        </div>

        {/* Action Button */}
        <div className="px-6 py-4 bg-muted/20 border-t border-border">
          <Button
            variant="default"
            fullWidth
            onClick={onComplete}
            iconName="ArrowRight"
            iconPosition="right"
            iconSize={16}
            className="min-h-touch"
          >
            Complete Check-in
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default BookingSuccess;