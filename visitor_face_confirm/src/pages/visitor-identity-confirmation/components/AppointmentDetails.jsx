import React from 'react';
import Icon from '../../../components/AppIcon';

const AppointmentDetails = ({ appointment }) => {
  const formatTime = (timeString) => {
    const time = new Date(`2000-01-01T${timeString}`);
    return time?.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card border border-border rounded-lg p-6 elevation-card">
        <h2 className="text-fluid-lg font-semibold text-foreground mb-4 text-center">
          Appointment Details
        </h2>
        
        <div className="space-y-4">
          {/* Host Information */}
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="User" size={20} color="var(--color-primary)" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Meeting with</p>
              <p className="text-fluid-base font-medium text-foreground">
                {appointment?.hostName}
              </p>
            </div>
          </div>

          {/* Date Information */}
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0 w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
              <Icon name="Calendar" size={20} color="var(--color-accent)" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Date</p>
              <p className="text-fluid-base font-medium text-foreground">
                {formatDate(appointment?.date)}
              </p>
            </div>
          </div>

          {/* Time Information */}
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0 w-10 h-10 bg-warning/10 rounded-full flex items-center justify-center">
              <Icon name="Clock" size={20} color="var(--color-warning)" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Scheduled time</p>
              <p className="text-fluid-base font-medium text-foreground">
                {formatTime(appointment?.time)}
              </p>
            </div>
          </div>

          {/* Purpose Information */}
          {appointment?.purpose && (
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                <Icon name="FileText" size={20} color="var(--color-secondary)" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Purpose</p>
                <p className="text-fluid-base font-medium text-foreground">
                  {appointment?.purpose}
                </p>
              </div>
            </div>
          )}

          {/* Location Information */}
          {appointment?.location && (
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                <Icon name="MapPin" size={20} color="var(--color-success)" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="text-fluid-base font-medium text-foreground">
                  {appointment?.location}
                </p>
              </div>
            </div>
          )}

          {/* Duration Information */}
          {appointment?.duration && (
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-10 h-10 bg-info/10 rounded-full flex items-center justify-center">
                <Icon name="Timer" size={20} color="var(--color-info)" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Duration</p>
                <p className="text-fluid-base font-medium text-foreground">
                  {appointment?.duration}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetails;