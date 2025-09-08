import React, { useState } from 'react';
import Button from '../../../components/ui/Button';

const ActionButtons = ({ onAcknowledge, onDecline, onClose }) => {
  const [isAcknowledging, setIsAcknowledging] = useState(false);
  const [isDeclining, setIsDeclining] = useState(false);

  const handleAcknowledge = async () => {
    setIsAcknowledging(true);
    try {
      await onAcknowledge();
    } finally {
      setIsAcknowledging(false);
    }
  };

  const handleDecline = async () => {
    setIsDeclining(true);
    try {
      await onDecline();
    } finally {
      setIsDeclining(false);
    }
  };

  return (
    <div className="space-y-3">
      {/* Primary Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="default"
          size="lg"
          fullWidth
          loading={isAcknowledging}
          disabled={isDeclining}
          onClick={handleAcknowledge}
          iconName="CheckCircle"
          iconPosition="left"
          className="order-2 sm:order-1"
        >
          Acknowledge & Greet
        </Button>

        <Button
          variant="outline"
          size="lg"
          fullWidth
          loading={isDeclining}
          disabled={isAcknowledging}
          onClick={handleDecline}
          iconName="XCircle"
          iconPosition="left"
          className="order-1 sm:order-2"
        >
          Decline
        </Button>
      </div>

      {/* Secondary Action */}
      <div className="pt-2 border-t border-border">
        <Button
          variant="ghost"
          size="sm"
          fullWidth
          onClick={onClose}
          iconName="X"
          iconPosition="left"
          disabled={isAcknowledging || isDeclining}
        >
          Dismiss Notification
        </Button>
      </div>
    </div>
  );
};

export default ActionButtons;