import React from 'react';
import Icon from '../AppIcon';

const AuthProgressIndicator = ({ 
  currentStep = 1, 
  totalSteps = 3, 
  steps = ['Method Selection', 'Authentication', 'Verification'],
  onStepClick = null 
}) => {
  const handleStepClick = (stepIndex) => {
    if (onStepClick && stepIndex < currentStep) {
      onStepClick(stepIndex);
    }
  };

  return (
    <div className="w-full bg-surface border-b border-border py-4 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          {steps?.map((step, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber === currentStep;
            const isCompleted = stepNumber < currentStep;
            const isClickable = isCompleted && onStepClick;

            return (
              <div key={index} className="flex items-center">
                {/* Step Circle */}
                <div
                  className={`
                    flex items-center justify-center w-8 h-8 rounded-full border-2 transition-standard
                    ${isActive 
                      ? 'bg-primary border-primary text-primary-foreground' 
                      : isCompleted 
                        ? 'bg-success border-success text-success-foreground' 
                        : 'bg-muted border-border text-muted-foreground'
                    }
                    ${isClickable ? 'cursor-pointer hover:scale-105 transition-micro' : ''}
                  `}
                  onClick={() => handleStepClick(stepNumber)}
                >
                  {isCompleted ? (
                    <Icon name="Check" size={16} />
                  ) : (
                    <span className="text-sm font-semibold">{stepNumber}</span>
                  )}
                </div>
                {/* Step Label */}
                <div className="ml-3 flex-1">
                  <p
                    className={`
                      text-sm font-medium transition-standard
                      ${isActive 
                        ? 'text-primary' 
                        : isCompleted 
                          ? 'text-success' :'text-muted-foreground'
                      }
                      ${isClickable ? 'cursor-pointer hover:text-primary' : ''}
                    `}
                    onClick={() => handleStepClick(stepNumber)}
                  >
                    {step}
                  </p>
                </div>
                {/* Connector Line */}
                {index < steps?.length - 1 && (
                  <div className="flex-1 mx-4">
                    <div
                      className={`
                        h-0.5 transition-standard
                        ${stepNumber < currentStep 
                          ? 'bg-success' :'bg-border'
                        }
                      `}
                      style={{ minWidth: '60px' }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Current Step Description */}
        <div className="mt-4 text-center">
          <p className="text-sm text-text-secondary">
            Step {currentStep} of {totalSteps}: {steps?.[currentStep - 1]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthProgressIndicator;