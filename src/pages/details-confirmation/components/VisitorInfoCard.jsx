import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const VisitorInfoCard = ({ visitorData }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted">
            <Image
              src={visitorData?.photo}
              alt={`${visitorData?.name} photo`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-text-primary">
              Visitor Information
            </h3>
            <div className="flex items-center space-x-1 text-success">
              <Icon name="CheckCircle" size={16} color="currentColor" />
              <span className="text-sm font-medium">Verified</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-text-secondary">Full Name</label>
              <p className="text-text-primary font-medium">{visitorData?.name}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-text-secondary">Company</label>
              <p className="text-text-primary font-medium">{visitorData?.company}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-text-secondary">Email Address</label>
              <p className="text-text-primary font-medium">{visitorData?.email}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-text-secondary">Phone Number</label>
              <p className="text-text-primary font-medium">{visitorData?.phone}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-text-secondary">ID Type</label>
              <p className="text-text-primary font-medium">{visitorData?.idType}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-text-secondary">ID Number</label>
              <p className="text-text-primary font-medium">{visitorData?.idNumber}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitorInfoCard;