import React from 'react';
import Icon from '../AppIcon';

const FormProgressIndicator = ({ 
  currentStep = 1, 
  totalSteps = 3, 
  steps = [],
  className = '' 
}) => {
  const defaultSteps = [
    { id: 1, title: 'Personal Information', description: 'Basic details' },
    { id: 2, title: 'Visit Purpose', description: 'Meeting details' },
    { id: 3, title: 'Confirmation', description: 'Review & submit' }
  ];

  const progressSteps = steps?.length > 0 ? steps : defaultSteps;
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className={`w-full ${className}`}>
      {/* Progress Bar */}
      <div className="relative mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-text-primary">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm text-text-secondary">
            {Math.round(progressPercentage)}% Complete
          </span>
        </div>
        
        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <div 
            className="bg-primary h-full rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
      {/* Step Indicators */}
      <div className="flex items-center justify-between">
        {progressSteps?.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          const isUpcoming = stepNumber > currentStep;

          return (
            <div key={step?.id} className="flex flex-col items-center flex-1">
              {/* Step Circle */}
              <div className="relative flex items-center justify-center mb-2">
                <div
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200
                    ${isCompleted 
                      ? 'bg-success text-success-foreground' 
                      : isCurrent 
                        ? 'bg-primary text-primary-foreground ring-4 ring-primary/20' 
                        : 'bg-muted text-text-secondary'
                    }
                  `}
                >
                  {isCompleted ? (
                    <Icon name="Check" size={16} />
                  ) : (
                    stepNumber
                  )}
                </div>
              </div>
              {/* Step Content */}
              <div className="text-center">
                <div
                  className={`
                    text-xs font-medium mb-1 transition-colors duration-200
                    ${isCurrent ? 'text-primary' : isCompleted ? 'text-success' : 'text-text-secondary'}
                  `}
                >
                  {step?.title}
                </div>
                <div className="text-xs text-text-secondary hidden sm:block">
                  {step?.description}
                </div>
              </div>
              {/* Connector Line */}
              {index < progressSteps?.length - 1 && (
                <div className="absolute top-4 left-1/2 w-full h-0.5 -z-10 hidden sm:block">
                  <div
                    className={`
                      h-full transition-colors duration-300
                      ${stepNumber < currentStep ? 'bg-success' : 'bg-muted'}
                    `}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FormProgressIndicator;