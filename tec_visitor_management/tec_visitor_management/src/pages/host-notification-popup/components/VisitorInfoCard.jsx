import React from 'react';
import Icon from '../../../components/AppIcon';

const VisitorInfoCard = ({ visitor }) => {
  return (
    <div className="text-center space-y-4 mb-6">
      {/* Visitor Avatar */}
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
          <Icon name="User" size={32} className="text-primary" />
        </div>
      </div>
      {/* Visitor Information */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-foreground">
          {visitor?.name}
        </h2>
        <p className="text-muted-foreground font-medium">
          {visitor?.company}
        </p>
        <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Clock" size={16} />
          <span>Arrived at {visitor?.arrivalTime}</span>
        </div>
      </div>
      {/* Visit Purpose */}
      {visitor?.purpose && (
        <div className="bg-muted/50 rounded-lg p-3 mt-4">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium">Purpose:</span> {visitor?.purpose}
          </p>
        </div>
      )}
    </div>
  );
};

export default VisitorInfoCard;