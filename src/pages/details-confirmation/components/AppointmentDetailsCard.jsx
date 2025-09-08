import React from 'react';
import Icon from '../../../components/AppIcon';

const AppointmentDetailsCard = ({ appointmentData }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    const time = new Date(`2000-01-01T${timeString}`);
    return time?.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">
          Appointment Details
        </h3>
        <div className="flex items-center space-x-1 text-primary">
          <Icon name="Calendar" size={16} color="currentColor" />
          <span className="text-sm font-medium">Confirmed</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-text-secondary">Meeting Date</label>
            <p className="text-text-primary font-medium">{formatDate(appointmentData?.date)}</p>
          </div>
          
          <div>
            <label className="text-sm font-medium text-text-secondary">Time</label>
            <p className="text-text-primary font-medium">
              {formatTime(appointmentData?.startTime)} - {formatTime(appointmentData?.endTime)}
            </p>
          </div>
          
          <div>
            <label className="text-sm font-medium text-text-secondary">Duration</label>
            <p className="text-text-primary font-medium">{appointmentData?.duration}</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-text-secondary">Host</label>
            <p className="text-text-primary font-medium">{appointmentData?.hostName}</p>
            <p className="text-text-secondary text-sm">{appointmentData?.hostEmail}</p>
          </div>
          
          <div>
            <label className="text-sm font-medium text-text-secondary">Location</label>
            <p className="text-text-primary font-medium">{appointmentData?.location}</p>
          </div>
          
          <div>
            <label className="text-sm font-medium text-text-secondary">Meeting Room</label>
            <p className="text-text-primary font-medium">{appointmentData?.room}</p>
          </div>
        </div>
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <label className="text-sm font-medium text-text-secondary">Purpose of Visit</label>
        <p className="text-text-primary mt-1">{appointmentData?.purpose}</p>
      </div>
    </div>
  );
};

export default AppointmentDetailsCard;