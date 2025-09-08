import React from 'react';
import Icon from '../../../components/AppIcon';

const AppointmentDetails = ({ appointment }) => {
  const formatTime = (timeString) => {
    const date = new Date(timeString);
    return date?.toLocaleTimeString('en-US', { 
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
    <div className="bg-white rounded-xl shadow-sm border border-border p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Calendar" size={20} color="var(--color-primary)" strokeWidth={2} />
        <h3 className="text-lg font-semibold text-text-primary">Appointment Details</h3>
      </div>
      <div className="space-y-4">
        {/* Visitor Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <Icon name="User" size={16} color="var(--color-text-secondary)" strokeWidth={2} />
              <div>
                <p className="text-sm text-text-secondary">Visitor Name</p>
                <p className="font-medium text-text-primary">{appointment?.visitorName}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Icon name="Building" size={16} color="var(--color-text-secondary)" strokeWidth={2} />
              <div>
                <p className="text-sm text-text-secondary">Company</p>
                <p className="font-medium text-text-primary">{appointment?.company}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Icon name="Mail" size={16} color="var(--color-text-secondary)" strokeWidth={2} />
              <div>
                <p className="text-sm text-text-secondary">Email</p>
                <p className="font-medium text-text-primary">{appointment?.email}</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <Icon name="UserCheck" size={16} color="var(--color-text-secondary)" strokeWidth={2} />
              <div>
                <p className="text-sm text-text-secondary">Host</p>
                <p className="font-medium text-text-primary">{appointment?.host}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Icon name="MapPin" size={16} color="var(--color-text-secondary)" strokeWidth={2} />
              <div>
                <p className="text-sm text-text-secondary">Meeting Location</p>
                <p className="font-medium text-text-primary">{appointment?.location}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Icon name="Clock" size={16} color="var(--color-text-secondary)" strokeWidth={2} />
              <div>
                <p className="text-sm text-text-secondary">Time</p>
                <p className="font-medium text-text-primary">
                  {formatTime(appointment?.startTime)} - {formatTime(appointment?.endTime)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Meeting Purpose */}
        <div className="border-t border-border pt-4">
          <div className="flex items-start space-x-3">
            <Icon name="FileText" size={16} color="var(--color-text-secondary)" strokeWidth={2} />
            <div className="flex-1">
              <p className="text-sm text-text-secondary">Meeting Purpose</p>
              <p className="font-medium text-text-primary mt-1">{appointment?.purpose}</p>
            </div>
          </div>
        </div>

        {/* Access Requirements */}
        {appointment?.accessRequirements && (
          <div className="border-t border-border pt-4">
            <div className="flex items-start space-x-3">
              <Icon name="Shield" size={16} color="var(--color-text-secondary)" strokeWidth={2} />
              <div className="flex-1">
                <p className="text-sm text-text-secondary">Access Requirements</p>
                <div className="mt-2 space-y-1">
                  {appointment?.accessRequirements?.map((requirement, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Icon name="Check" size={12} color="var(--color-success)" strokeWidth={2} />
                      <span className="text-sm text-text-primary">{requirement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentDetails;