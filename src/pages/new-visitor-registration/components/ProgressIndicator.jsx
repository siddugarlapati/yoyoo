import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ currentStep, totalSteps, completedSections }) => {
  const steps = [
    { id: 1, label: 'Personal Info', key: 'personal' },
    { id: 2, label: 'Appointment', key: 'appointment' },
    { id: 3, label: 'Emergency', key: 'emergency' },
    { id: 4, label: 'Vehicle', key: 'vehicle' },
    { id: 5, label: 'Security', key: 'security' }
  ];

  const getStepStatus = (step) => {
    if (completedSections?.includes(step?.key)) {
      return 'completed';
    } else if (step?.id === currentStep) {
      return 'current';
    } else if (step?.id < currentStep) {
      return 'completed';
    } else {
      return 'upcoming';
    }
  };

  const getStepClasses = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success text-success-foreground border-success';
      case 'current':
        return 'bg-primary text-primary-foreground border-primary';
      case 'upcoming':
        return 'bg-muted text-muted-foreground border-border';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getConnectorClasses = (index) => {
    const nextStep = steps?.[index + 1];
    if (!nextStep) return '';
    
    const nextStatus = getStepStatus(nextStep);
    return nextStatus === 'completed' || nextStatus === 'current' 
      ? 'bg-primary' :'bg-border';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Registration Progress</h3>
        <span className="text-sm text-text-secondary">
          {completedSections?.length} of {totalSteps} sections completed
        </span>
      </div>
      {/* Desktop Progress Bar */}
      <div className="hidden md:flex items-center justify-between">
        {steps?.map((step, index) => {
          const status = getStepStatus(step);
          const stepClasses = getStepClasses(status);
          
          return (
            <React.Fragment key={step?.id}>
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${stepClasses}`}>
                  {status === 'completed' ? (
                    <Icon name="Check" size={16} color="currentColor" strokeWidth={2} />
                  ) : (
                    <span className="text-sm font-semibold">{step?.id}</span>
                  )}
                </div>
                <span className={`mt-2 text-xs font-medium ${
                  status === 'current' ? 'text-primary' : 
                  status === 'completed' ? 'text-success' : 'text-text-secondary'
                }`}>
                  {step?.label}
                </span>
              </div>
              {index < steps?.length - 1 && (
                <div className={`flex-1 h-0.5 mx-4 transition-all duration-200 ${getConnectorClasses(index)}`} />
              )}
            </React.Fragment>
          );
        })}
      </div>
      {/* Mobile Progress Bar */}
      <div className="md:hidden">
        <div className="flex items-center space-x-2 mb-3">
          <div className="flex-1 bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(completedSections?.length / totalSteps) * 100}%` }}
            />
          </div>
          <span className="text-sm font-medium text-text-primary">
            {Math.round((completedSections?.length / totalSteps) * 100)}%
          </span>
        </div>
        
        <div className="flex justify-between text-xs text-text-secondary">
          <span>Step {currentStep} of {totalSteps}</span>
          <span>{steps?.find(s => s?.id === currentStep)?.label}</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;