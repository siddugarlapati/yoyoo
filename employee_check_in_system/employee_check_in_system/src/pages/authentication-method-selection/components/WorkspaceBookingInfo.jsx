import React from 'react';
import Icon from '../../../components/AppIcon';

const WorkspaceBookingInfo = ({ bookingData }) => {
  if (!bookingData) {
    return (
      <div className="bg-muted border border-border rounded-lg p-4">
        <div className="flex items-center space-x-2 text-muted-foreground">
          <Icon name="Info" size={16} />
          <span className="text-sm">No active workspace booking</span>
        </div>
      </div>
    );
  }

  const { workspaceId, location, floor, deskNumber, bookingTime, duration, status } = bookingData;

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'text-success bg-success bg-opacity-10';
      case 'pending':
        return 'text-warning bg-warning bg-opacity-10';
      case 'expired':
        return 'text-error bg-error bg-opacity-10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-text-primary">Current Booking</h3>
        <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(status)}`}>
          {status?.charAt(0)?.toUpperCase() + status?.slice(1)}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Workspace Details */}
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Icon name="MapPin" size={16} className="text-primary" />
            <div>
              <p className="text-sm font-medium text-text-primary">{location}</p>
              <p className="text-xs text-text-secondary">Floor {floor} • Desk {deskNumber}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Icon name="Calendar" size={16} className="text-primary" />
            <div>
              <p className="text-sm font-medium text-text-primary">
                {new Date(bookingTime)?.toLocaleDateString()}
              </p>
              <p className="text-xs text-text-secondary">
                {new Date(bookingTime)?.toLocaleTimeString()} • {duration}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <Icon name="Clock" size={14} />
            <span>Check-in required by {new Date(bookingTime)?.toLocaleTimeString()}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-success">
            <Icon name="Shield" size={14} />
            <span>Workspace ID: {workspaceId}</span>
          </div>
        </div>
      </div>
      {/* Progress Bar */}
      {status === 'confirmed' && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-text-secondary">
            <span>Booking Progress</span>
            <span>Ready for check-in</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-success h-2 rounded-full" style={{ width: '75%' }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkspaceBookingInfo;