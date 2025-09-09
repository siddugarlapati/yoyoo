import React from 'react';
import Image from '../../../components/AppImage';

const VisitorProfileCard = ({ visitor }) => {
  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Circular Profile Image */}
      <div className="relative">
        <div className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden border-4 border-primary elevation-card bg-card">
          <Image
            src={visitor?.profileImage}
            alt={`${visitor?.name} profile picture`}
            className="w-full h-full object-cover"
          />
        </div>
        {/* Status Indicator */}
        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-success rounded-full border-4 border-background flex items-center justify-center">
          <div className="w-3 h-3 bg-white rounded-full"></div>
        </div>
      </div>
      {/* Welcome Message */}
      <div className="text-center space-y-2">
        <h1 className="text-fluid-2xl md:text-fluid-3xl font-semibold text-foreground">
          Welcome, {visitor?.name}!
        </h1>
        <p className="text-fluid-base text-muted-foreground">
          We've identified you using face recognition
        </p>
      </div>
    </div>
  );
};

export default VisitorProfileCard;