import React from 'react';
import Button from '../../../components/ui/Button';
import Timer from '../../../components/ui/Timer';

const ActionSection = ({ onDone, onTimerComplete }) => {
  return (
    <div className="bg-card rounded-lg border border-border shadow-layered p-6">
      <div className="text-center space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Ready to Proceed?
          </h3>
          <p className="text-muted-foreground">
            You'll be automatically redirected to the welcome page, or click Done to continue immediately
          </p>
        </div>
        
        <Timer
          duration={60}
          onComplete={onTimerComplete}
          onManualOverride={onDone}
          showProgress={true}
          showControls={false}
          autoStart={true}
          size="default"
        />
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            variant="default"
            size="lg"
            iconName="ArrowRight"
            iconPosition="right"
            onClick={onDone}
            className="w-full sm:w-auto"
          >
            Done - Continue
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            iconName="RotateCcw"
            iconPosition="left"
            onClick={() => window.location?.reload()}
            className="w-full sm:w-auto"
          >
            Refresh Information
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ActionSection;