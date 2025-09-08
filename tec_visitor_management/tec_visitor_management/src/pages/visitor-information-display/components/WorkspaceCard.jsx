import React from 'react';
import Icon from '../../../components/AppIcon';

const WorkspaceCard = ({ workspaceType, location, floor, additionalInfo }) => {
  const getWorkspaceIcon = () => {
    return workspaceType === 'Meeting Room' ? 'Users' : 'Briefcase';
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-layered p-6">
      <div className="flex items-start space-x-4">
        <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-full">
          <Icon name={getWorkspaceIcon()} size={24} className="text-accent" />
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Assigned Workspace
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Icon name="MapPin" size={16} className="text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">{workspaceType}</p>
                <p className="text-sm text-muted-foreground">{location}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Icon name="Building" size={16} className="text-muted-foreground" />
              <p className="text-sm text-foreground">{floor}</p>
            </div>
            
            {additionalInfo && (
              <div className="bg-muted/50 rounded-lg p-3 mt-3">
                <p className="text-sm text-muted-foreground">{additionalInfo}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceCard;