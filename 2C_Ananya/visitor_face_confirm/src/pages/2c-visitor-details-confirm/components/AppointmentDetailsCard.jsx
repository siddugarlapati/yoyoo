import React from 'react';
import Icon from '../../../components/AppIcon';

const AppointmentDetailsCard = ({ appointment }) => {
  const formatTime = (timeString) => {
    const time = new Date(`2000-01-01T${timeString}`);
    return time?.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="bg-muted/30 border border-border rounded-lg p-6 shadow-sm">
        
        {/* Simplified Visitor Details */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="User" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Appointment Details</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-sm font-medium text-muted-foreground">Name:</span>
              <span className="text-base font-semibold text-foreground">
                {appointment?.visitorName}
              </span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-sm font-medium text-muted-foreground">Company:</span>
              <span className="text-base font-semibold text-foreground">
                {appointment?.visitorCompany}
              </span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-sm font-medium text-muted-foreground">Host:</span>
              <span className="text-base font-semibold text-foreground">
                {appointment?.hostName}
              </span>
            </div>
            
            <div className="flex justify-between items-center py-2">
              <span className="text-sm font-medium text-muted-foreground">Time:</span>
              <span className="text-base font-semibold text-foreground">
                {formatTime(appointment?.time)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetailsCard;