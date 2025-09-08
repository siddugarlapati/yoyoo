import React from 'react';
import Icon from '../../../components/AppIcon';

const AccessPermissionsCard = ({ accessData }) => {
  const getAccessLevelColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'standard':
        return 'text-success bg-success/10';
      case 'restricted':
        return 'text-warning bg-warning/10';
      case 'high':
        return 'text-error bg-error/10';
      default:
        return 'text-text-secondary bg-muted';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">
          Access Permissions
        </h3>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getAccessLevelColor(accessData?.clearanceLevel)}`}>
          {accessData?.clearanceLevel} Access
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm font-semibold text-text-primary mb-3">Permitted Areas</h4>
          <div className="space-y-2">
            {accessData?.permittedAreas?.map((area, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Icon name="CheckCircle" size={16} color="var(--color-success)" />
                <span className="text-text-primary text-sm">{area}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-semibold text-text-primary mb-3">Restricted Areas</h4>
          <div className="space-y-2">
            {accessData?.restrictedAreas?.map((area, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Icon name="XCircle" size={16} color="var(--color-error)" />
                <span className="text-text-secondary text-sm">{area}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium text-text-secondary">Badge Type</label>
            <p className="text-text-primary font-medium">{accessData?.badgeType}</p>
          </div>
          
          <div>
            <label className="text-sm font-medium text-text-secondary">Valid Until</label>
            <p className="text-text-primary font-medium">{accessData?.validUntil}</p>
          </div>
          
          <div>
            <label className="text-sm font-medium text-text-secondary">Escort Required</label>
            <p className={`font-medium ${accessData?.escortRequired ? 'text-warning' : 'text-success'}`}>
              {accessData?.escortRequired ? 'Yes' : 'No'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessPermissionsCard;