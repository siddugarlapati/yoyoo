import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FormActions = ({ 
  onSubmit, 
  onSaveDraft, 
  onBack, 
  isSubmitting, 
  isSavingDraft, 
  isFormValid,
  showBackButton = true 
}) => {
  return (
    <div className="bg-card rounded-lg border border-border p-6 space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        {/* Back Button */}
        {showBackButton && (
          <div className="w-full sm:w-auto">
            <Button
              variant="outline"
              onClick={onBack}
              iconName="ArrowLeft"
              iconPosition="left"
              iconSize={16}
              className="w-full sm:w-auto"
              disabled={isSubmitting || isSavingDraft}
            >
              Back to Check-in
            </Button>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Button
            variant="secondary"
            onClick={onSaveDraft}
            loading={isSavingDraft}
            iconName="Save"
            iconPosition="left"
            iconSize={16}
            className="w-full sm:w-auto"
            disabled={isSubmitting}
          >
            Save as Draft
          </Button>

          <Button
            variant="default"
            onClick={onSubmit}
            loading={isSubmitting}
            iconName="UserCheck"
            iconPosition="left"
            iconSize={16}
            className="w-full sm:w-auto"
            disabled={!isFormValid || isSavingDraft}
          >
            Submit Registration
          </Button>
        </div>
      </div>

      {/* Form Status Messages */}
      <div className="pt-4 border-t border-border">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} color="var(--color-text-secondary)" className="mt-0.5 flex-shrink-0" />
          <div className="text-sm text-text-secondary space-y-1">
            <p>
              <strong>Required fields:</strong> All fields marked with an asterisk (*) must be completed before submission.
            </p>
            <p>
              <strong>Save as Draft:</strong> Your progress will be saved and you can complete registration later.
            </p>
            <p>
              <strong>Next Steps:</strong> After submission, you'll receive a confirmation and can proceed to facility check-in.
            </p>
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={16} color="var(--color-accent)" className="mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <p className="font-medium text-text-primary mb-1">Security Notice</p>
            <p className="text-text-secondary">
              All visitor information is encrypted and stored securely in compliance with privacy regulations. 
              Data is used solely for facility security and visitor management purposes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormActions;