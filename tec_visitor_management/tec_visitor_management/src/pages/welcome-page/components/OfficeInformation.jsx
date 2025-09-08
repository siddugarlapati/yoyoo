import React from 'react';
import Icon from '../../../components/AppIcon';

const OfficeInformation = () => {
  const officeHours = [
    { day: 'Monday - Friday', hours: '8:00 AM - 6:00 PM' },
    { day: 'Saturday', hours: '9:00 AM - 2:00 PM' },
    { day: 'Sunday', hours: 'Closed' }
  ];

  const emergencyContacts = [
    { type: 'Security', number: '(555) 123-4567', icon: 'Shield' },
    { type: 'Reception', number: '(555) 123-4568', icon: 'Phone' },
    { type: 'Emergency', number: '911', icon: 'AlertTriangle' }
  ];

  const announcements = [
    {
      id: 1,
      title: 'Building Maintenance',
      message: 'Scheduled elevator maintenance on floors 5-8 this weekend. Please use alternate elevators.',
      type: 'warning',
      date: '2025-09-10'
    },
    {
      id: 2,
      title: 'New Security Protocol',
      message: 'All visitors must now complete digital check-in process. Physical sign-in books are no longer in use.',
      type: 'info',
      date: '2025-09-08'
    },
    {
      id: 3,
      title: 'Wi-Fi Network Update',
      message: 'Guest Wi-Fi network has been upgraded for better connectivity. New credentials will be provided upon check-in.',
      type: 'success',
      date: '2025-09-05'
    }
  ];

  const getAnnouncementIcon = (type) => {
    switch (type) {
      case 'warning':
        return { icon: 'AlertTriangle', color: 'text-warning' };
      case 'success':
        return { icon: 'CheckCircle', color: 'text-success' };
      default:
        return { icon: 'Info', color: 'text-primary' };
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Office Hours */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-layered">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Clock" size={20} className="text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Office Hours</h3>
        </div>
        <div className="space-y-3">
          {officeHours?.map((schedule, index) => (
            <div key={index} className="flex justify-between items-center py-2 border-b border-border last:border-b-0">
              <span className="text-sm font-medium text-foreground">{schedule?.day}</span>
              <span className="text-sm text-muted-foreground">{schedule?.hours}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Emergency Contacts */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-layered">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
            <Icon name="Phone" size={20} className="text-error" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Emergency Contacts</h3>
        </div>
        <div className="space-y-3">
          {emergencyContacts?.map((contact, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
              <div className="w-8 h-8 bg-background rounded-lg flex items-center justify-center">
                <Icon name={contact?.icon} size={16} className="text-muted-foreground" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-foreground">{contact?.type}</div>
                <div className="text-sm text-muted-foreground">{contact?.number}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Announcements */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-layered">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="Megaphone" size={20} className="text-accent" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Announcements</h3>
        </div>
        <div className="space-y-4 max-h-64 overflow-y-auto">
          {announcements?.map((announcement) => {
            const { icon, color } = getAnnouncementIcon(announcement?.type);
            return (
              <div key={announcement?.id} className="p-3 bg-muted/30 rounded-lg border-l-4 border-l-primary">
                <div className="flex items-start space-x-3">
                  <Icon name={icon} size={16} className={`mt-1 ${color}`} />
                  <div className="flex-1 space-y-1">
                    <h4 className="text-sm font-medium text-foreground">{announcement?.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {announcement?.message}
                    </p>
                    <span className="text-xs text-muted-foreground opacity-75">
                      {new Date(announcement.date)?.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OfficeInformation;