import React, { useState } from 'react';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const SafetyAcknowledgmentCard = ({ safetyData, onAcknowledgmentChange }) => {
  const [acknowledgments, setAcknowledgments] = useState({});

  const handleCheckboxChange = (id, checked) => {
    const newAcknowledgments = {
      ...acknowledgments,
      [id]: checked
    };
    setAcknowledgments(newAcknowledgments);
    
    // Check if all required items are acknowledged
    const allAcknowledged = safetyData?.requirements?.every(req => 
      req?.required ? newAcknowledgments?.[req?.id] : true
    );
    
    onAcknowledgmentChange(allAcknowledged, newAcknowledgments);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Shield" size={20} color="var(--color-warning)" />
        <h3 className="text-lg font-semibold text-text-primary">
          Safety & Compliance
        </h3>
      </div>
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-text-primary mb-3">Required Safety Briefings</h4>
        <div className="space-y-3">
          {safetyData?.briefings?.map((briefing, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
              <Icon name="PlayCircle" size={16} color="var(--color-primary)" className="mt-0.5" />
              <div className="flex-1">
                <p className="text-text-primary font-medium text-sm">{briefing?.title}</p>
                <p className="text-text-secondary text-xs mt-1">{briefing?.duration} • {briefing?.type}</p>
              </div>
              <div className="flex items-center space-x-1 text-success">
                <Icon name="CheckCircle" size={14} color="currentColor" />
                <span className="text-xs font-medium">Completed</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-sm font-semibold text-text-primary mb-4">Acknowledgment Required</h4>
        <div className="space-y-4">
          {safetyData?.requirements?.map((requirement) => (
            <Checkbox
              key={requirement?.id}
              label={requirement?.text}
              description={requirement?.description}
              required={requirement?.required}
              checked={acknowledgments?.[requirement?.id] || false}
              onChange={(e) => handleCheckboxChange(requirement?.id, e?.target?.checked)}
              className="text-sm"
            />
          ))}
        </div>
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-start space-x-3 p-4 bg-warning/10 rounded-lg">
          <Icon name="AlertTriangle" size={16} color="var(--color-warning)" className="mt-0.5" />
          <div>
            <p className="text-warning font-medium text-sm">Important Notice</p>
            <p className="text-text-secondary text-xs mt-1">
              By proceeding, you acknowledge that you have read and understood all safety protocols and agree to comply with TEC workplace policies during your visit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyAcknowledgmentCard;