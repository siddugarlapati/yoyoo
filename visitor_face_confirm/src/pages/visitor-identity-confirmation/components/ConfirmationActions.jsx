import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ConfirmationActions = ({ visitor, appointment, onConfirm, onReject }) => {
  const navigate = useNavigate();
  const [isConfirming, setIsConfirming] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);

  const handleConfirmation = async () => {
    setIsConfirming(true);
    try {
      // Simulate host notification process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Trigger confirmation callback
      if (onConfirm) {
        onConfirm(visitor, appointment);
      }

      // In real app, this would:
      // 1. Send notification to host via email/SMS/push notification
      // 2. Update visitor status in database to "checked-in"
      // 3. Log check-in event with timestamp
      // 4. Generate visitor badge/QR code for access control
      // 5. Start tracking visitor location/duration
      console.log('✅ Host notification sent successfully');
      console.log('✅ Visitor checked in:', { 
        visitorId: visitor?.id, 
        appointmentId: appointment?.id,
        checkInTime: new Date()?.toISOString()
      });
      
      // Navigate to waiting screen with visitor data
      navigate('/waiting-for-host', {
        state: {
          visitor,
          appointment,
          checkInTime: new Date()?.toISOString(),
          hostNotified: true
        }
      });
    } catch (error) {
      console.error('❌ Check-in failed:', error);
      // In real app, show error modal/toast to user
    } finally {
      setIsConfirming(false);
    }
  };

  const handleRejection = async () => {
    setIsRejecting(true);
    try {
      // Simulate rejection process
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Trigger rejection callback
      if (onReject) {
        onReject(visitor);
      }

      // In real app, this would:
      // 1. Log rejection event for security audit
      // 2. Clear face recognition cache/session
      // 3. Reset identification process
      // 4. Increment failed identification counter
      // 5. Trigger security alert if multiple failures
      console.log('❌ Identity rejected by user:', {
        rejectedVisitor: visitor?.id,
        timestamp: new Date()?.toISOString(),
        reason: 'User-initiated rejection'
      });
      
      // Navigate back to identification screen with manual input visible
      navigate('/visitor-identification', {
        state: {
          showManualInput: true,
          rejectedIdentity: visitor,
          fromRejection: true,
          message: 'Please enter your details manually to proceed.'
        }
      });
    } catch (error) {
      console.error('❌ Rejection process failed:', error);
      // In real app, show error modal/toast to user
    } finally {
      setIsRejecting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      {/* Primary Confirmation Button */}
      <Button
        variant="default"
        size="lg"
        fullWidth
        loading={isConfirming}
        disabled={isRejecting}
        onClick={handleConfirmation}
        iconName="UserCheck"
        iconPosition="left"
        iconSize={20}
        className="h-14 text-fluid-base font-semibold bg-green-600 hover:bg-green-700 border-green-600 hover:border-green-700"
      >
        {isConfirming ? 'Notifying Host...' : 'Yes, Check Me In'}
      </Button>

      {/* Secondary Rejection Button */}
      <Button
        variant="outline"
        size="lg"
        fullWidth
        loading={isRejecting}
        disabled={isConfirming}
        onClick={handleRejection}
        iconName="UserX"
        iconPosition="left"
        iconSize={20}
        className="h-14 text-fluid-base font-medium border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 hover:text-red-700"
      >
        {isRejecting ? 'Redirecting...' : "No, That's Not Me"}
      </Button>

      {/* Help Text */}
      <div className="text-center pt-4">
        <p className="text-sm text-muted-foreground">
          Having trouble? Contact reception for assistance
        </p>
        <div className="flex items-center justify-center space-x-2 mt-2">
          <Icon name="Phone" size={16} color="var(--color-muted-foreground)" />
          <span className="text-sm text-muted-foreground font-mono">
            Ext: 1001
          </span>
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} color="#3B82F6" className="mt-0.5 flex-shrink-0" />
          <div className="text-xs text-blue-700">
            <p className="font-medium mb-1">Security Notice</p>
            <p>Your host will be immediately notified upon check-in. Please proceed to the designated waiting area.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationActions;