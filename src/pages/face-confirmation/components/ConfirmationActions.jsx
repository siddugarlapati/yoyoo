import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const ConfirmationActions = ({ onConfirm, onReject, isLoading }) => {
  const navigate = useNavigate();

  const handleConfirmIdentity = () => {
    if (onConfirm) {
      onConfirm();
    } else {
      // Default navigation to details confirmation
      navigate('/details-confirmation');
    }
  };

  const handleReject = () => {
    if (onReject) {
      onReject();
    } else {
      // Default navigation back to visitor identification
      navigate('/visitor-identification');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-border p-6">
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-text-primary mb-2">
            Confirm Your Identity
          </h3>
          <p className="text-text-secondary text-sm">
            Please verify that the information above is correct before proceeding with check-in.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="default"
            size="lg"
            fullWidth
            loading={isLoading}
            iconName="CheckCircle"
            iconPosition="left"
            iconSize={20}
            onClick={handleConfirmIdentity}
            className="order-2 sm:order-1"
          >
            Confirm Identity & Check In
          </Button>

          <Button
            variant="outline"
            size="lg"
            fullWidth
            iconName="X"
            iconPosition="left"
            iconSize={20}
            onClick={handleReject}
            className="order-1 sm:order-2"
            disabled={isLoading}
          >
            This Isn't Me
          </Button>
        </div>

        <div className="text-center pt-2">
          <p className="text-xs text-text-secondary">
            By confirming, you agree to follow all facility security protocols and visitor guidelines.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationActions;