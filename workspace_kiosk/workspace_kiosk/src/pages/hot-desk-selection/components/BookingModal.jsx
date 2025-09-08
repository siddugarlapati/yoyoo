import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BookingModal = ({ isOpen, onClose, desk, onConfirm, isLoading }) => {
  if (!desk) return null;

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-card border border-border rounded-lg shadow-elevated max-w-md w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e?.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h2 className="text-xl font-semibold text-foreground">
                  Confirm Desk Booking
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  iconName="X"
                  iconSize={20}
                  className="min-w-touch min-h-touch"
                >
                  <span className="sr-only">Close</span>
                </Button>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Desk Preview */}
                <div className="bg-muted rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                      <Icon name="Monitor" size={24} color="white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-1">
                        {desk?.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Icon name="MapPin" size={14} />
                        <span>{desk?.zone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-success">
                        <Icon name="CheckCircle" size={14} />
                        <span>Available Now</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Booking Details */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <span className="text-sm text-muted-foreground">Date</span>
                    <span className="text-sm font-medium text-foreground">
                      {new Date()?.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <span className="text-sm text-muted-foreground">Time</span>
                    <span className="text-sm font-medium text-foreground">
                      9:00 AM - 6:00 PM
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <span className="text-sm text-muted-foreground">Duration</span>
                    <span className="text-sm font-medium text-foreground">
                      Full Day
                    </span>
                  </div>
                </div>

                {/* Amenities */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-foreground mb-3">
                    Included Amenities
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {desk?.amenities?.map((amenity, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <Icon name="Check" size={14} color="var(--color-success)" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={onClose}
                    disabled={isLoading}
                    iconName="ArrowLeft"
                    iconPosition="left"
                    iconSize={16}
                  >
                    Back to Selection
                  </Button>
                  <Button
                    variant="default"
                    fullWidth
                    onClick={onConfirm}
                    loading={isLoading}
                    iconName="CheckCircle"
                    iconPosition="left"
                    iconSize={16}
                  >
                    Confirm Booking
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;