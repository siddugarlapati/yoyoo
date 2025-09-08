import React from 'react';
import Icon from '../../../components/AppIcon';

const WaitingHeader = ({ visitorName }) => {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-full">
          <Icon name="Clock" size={32} color="white" strokeWidth={2} />
        </div>
      </div>
      
      <h1 className="text-4xl md:text-5xl font-semibold text-foreground mb-4">
        Thank you, {visitorName}!
      </h1>
      
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
        Your check-in has been completed successfully. Please take a seat while we notify your host.
      </p>
    </div>
  );
};

export default WaitingHeader;