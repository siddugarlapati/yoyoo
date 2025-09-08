import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityClearance = ({ clearanceLevel, badgeType, facilityAccess }) => {
  const getClearanceColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'high':
        return 'text-error bg-red-50 border-red-200';
      case 'medium':
        return 'text-warning bg-yellow-50 border-yellow-200';
      case 'low':
        return 'text-success bg-green-50 border-green-200';
      default:
        return 'text-text-secondary bg-gray-50 border-gray-200';
    }
  };

  const getClearanceIcon = (level) => {
    switch (level?.toLowerCase()) {
      case 'high':
        return 'ShieldAlert';
      case 'medium':
        return 'Shield';
      case 'low':
        return 'ShieldCheck';
      default:
        return 'Shield';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-border p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Lock" size={20} color="var(--color-primary)" strokeWidth={2} />
        <h3 className="text-lg font-semibold text-text-primary">Security Clearance</h3>
      </div>
      <div className="space-y-4">
        {/* Clearance Level */}
        <div className="flex items-center justify-between p-3 rounded-lg border">
          <div className="flex items-center space-x-3">
            <Icon 
              name={getClearanceIcon(clearanceLevel)} 
              size={20} 
              color="currentColor" 
              strokeWidth={2} 
            />
            <div>
              <p className="text-sm text-text-secondary">Clearance Level</p>
              <p className="font-semibold text-text-primary">{clearanceLevel} Security</p>
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full border text-xs font-medium ${getClearanceColor(clearanceLevel)}`}>
            {clearanceLevel?.toUpperCase()}
          </div>
        </div>

        {/* Badge Type */}
        <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
          <Icon name="CreditCard" size={16} color="var(--color-text-secondary)" strokeWidth={2} />
          <div>
            <p className="text-sm text-text-secondary">Visitor Badge</p>
            <p className="font-medium text-text-primary">{badgeType}</p>
          </div>
        </div>

        {/* Facility Access */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Icon name="Building" size={16} color="var(--color-text-secondary)" strokeWidth={2} />
            <p className="text-sm font-medium text-text-secondary">Authorized Areas</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {facilityAccess?.map((area, index) => (
              <div key={index} className="flex items-center space-x-2 p-2 bg-green-50 rounded-md border border-green-200">
                <Icon name="CheckCircle" size={14} color="var(--color-success)" strokeWidth={2} />
                <span className="text-sm text-success font-medium">{area}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Validity Period */}
        <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <Icon name="Clock" size={16} color="var(--color-primary)" strokeWidth={2} />
          <div>
            <p className="text-sm text-primary">Access Valid Until</p>
            <p className="font-medium text-primary">
              {new Date(Date.now() + 8 * 60 * 60 * 1000)?.toLocaleString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityClearance;