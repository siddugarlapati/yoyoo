import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ currentStep, totalSteps }) => {
  const steps = [
    { id: 1, label: 'Welcome', icon: 'Home' },
    { id: 2, label: 'Identification', icon: 'UserCheck' },
    { id: 3, label: 'Face Verification', icon: 'Camera' },
    { id: 4, label: 'Details Review', icon: 'CheckCircle' },
    { id: 5, label: 'Complete', icon: 'Check' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-text-primary">Check-in Progress</h4>
        <span className="text-xs text-text-secondary">
          Step {currentStep} of {totalSteps}
        </span>
      </div>
      <div className="mt-4">
        <div className="flex items-center justify-between">
          {steps?.map((step, index) => (
            <div key={step?.id} className="flex flex-col items-center">
              <div className={`
                flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-200
                ${step?.id <= currentStep 
                  ? 'bg-primary border-primary text-primary-foreground' 
                  : 'bg-background border-border text-text-secondary'
                }
              `}>
                <Icon 
                  name={step?.id <= currentStep ? 'Check' : step?.icon} 
                  size={14} 
                  color="currentColor" 
                />
              </div>
              
              <span className={`
                text-xs mt-2 font-medium transition-colors duration-200
                ${step?.id <= currentStep ? 'text-primary' : 'text-text-secondary'}
              `}>
                {step?.label}
              </span>
              
              {index < steps?.length - 1 && (
                <div className={`
                  absolute h-0.5 w-16 mt-4 transition-colors duration-200
                  ${step?.id < currentStep ? 'bg-primary' : 'bg-border'}
                `} 
                style={{ 
                  left: `${(index * 100) / (steps?.length - 1) + 10}%`,
                  transform: 'translateX(-50%)'
                }} />
              )}
            </div>
          ))}
        </div>
        
        <div className="relative mt-2">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-border" />
          <div 
            className="absolute top-0 left-0 h-0.5 bg-primary transition-all duration-500"
            style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;