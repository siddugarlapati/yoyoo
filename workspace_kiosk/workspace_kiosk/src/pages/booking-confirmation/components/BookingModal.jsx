import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BookingModal = ({ 
  isOpen, 
  onClose, 
  selectedDesk, 
  onConfirm, 
  isLoading 
}) => {
  if (!isOpen || !selectedDesk) return null;

  const amenityIcons = {
    'Dual Monitor': 'Monitor',
    'Standing Desk': 'ArrowUp',
    'Whiteboard': 'PenTool',
    'Power Outlet': 'Zap',
    'USB Hub': 'Usb',
    'Desk Lamp': 'Lightbulb'
  };

  const formatBookingTime = () => {
    const now = new Date();
    const endTime = new Date(now.getTime() + 8 * 60 * 60 * 1000); // 8 hours later
    
    return {
      start: now?.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      }),
      end: endTime?.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      }),
      date: now?.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    };
  };

  const bookingTime = formatBookingTime();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Modal Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", duration: 0.3 }}
        className="relative bg-card rounded-2xl shadow-elevated border border-border max-w-md w-full mx-4 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-primary/5 px-6 py-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-full">
                <Icon name="CheckCircle" size={20} color="white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Confirm Booking
                </h2>
                <p className="text-sm text-muted-foreground">
                  Review your workspace selection
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              iconName="X"
              iconSize={20}
              className="text-muted-foreground hover:text-foreground"
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Desk Information */}
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-12 h-12 bg-success rounded-lg">
                  <Icon name="Monitor" size={24} color="white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-lg">
                    {selectedDesk?.name}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {selectedDesk?.zone}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="inline-flex items-center px-2 py-1 bg-success/10 text-success text-xs font-medium rounded-full">
                  <Icon name="Circle" size={8} className="mr-1 fill-current" />
                  Available
                </div>
              </div>
            </div>

            {/* Location Details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2 text-sm">
                <Icon name="MapPin" size={16} color="var(--color-muted-foreground)" />
                <span className="text-muted-foreground">Floor:</span>
                <span className="font-medium text-foreground">2nd Floor</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Icon name="Building" size={16} color="var(--color-muted-foreground)" />
                <span className="text-muted-foreground">Section:</span>
                <span className="font-medium text-foreground">East Wing</span>
              </div>
            </div>
          </div>

          {/* Amenities */}
          {selectedDesk?.amenities && selectedDesk?.amenities?.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-medium text-foreground flex items-center">
                <Icon name="Star" size={16} className="mr-2 text-warning" />
                Available Amenities
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {selectedDesk?.amenities?.map((amenity, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 p-2 bg-muted/20 rounded-lg border border-border"
                  >
                    <Icon 
                      name={amenityIcons?.[amenity] || 'Check'} 
                      size={16} 
                      color="var(--color-primary)" 
                    />
                    <span className="text-sm text-foreground">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Booking Duration */}
          <div className="space-y-3">
            <h4 className="font-medium text-foreground flex items-center">
              <Icon name="Clock" size={16} className="mr-2 text-primary" />
              Booking Details
            </h4>
            <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Date:</span>
                  <span className="text-sm font-medium text-foreground">
                    {bookingTime?.date}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Duration:</span>
                  <span className="text-sm font-medium text-foreground">
                    {bookingTime?.start} - {bookingTime?.end}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Hours:</span>
                  <span className="text-sm font-medium text-primary">8 hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 py-4 bg-muted/20 border-t border-border">
          <div className="flex space-x-3">
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
  );
};

export default BookingModal;