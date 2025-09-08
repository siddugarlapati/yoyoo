import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const SecurityClearanceSection = ({ formData, errors, onChange }) => {
  const idTypeOptions = [
    { value: 'drivers_license', label: "Driver\'s License" },
    { value: 'passport', label: 'Passport' },
    { value: 'state_id', label: 'State ID' },
    { value: 'military_id', label: 'Military ID' },
    { value: 'employee_badge', label: 'Employee Badge' },
    { value: 'other', label: 'Other Government ID' }
  ];

  const handleInputChange = (field, value) => {
    onChange(field, value);
  };

  const handleCheckboxChange = (field, checked) => {
    handleInputChange(field, checked);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
          <span className="text-accent-foreground text-sm font-semibold">5</span>
        </div>
        <h3 className="text-lg font-semibold text-text-primary">Security & Identification</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-1">
          <Select
            label="ID Type"
            placeholder="Select ID type"
            options={idTypeOptions}
            value={formData?.idType}
            onChange={(value) => handleInputChange('idType', value)}
            error={errors?.idType}
            required
            className="mb-4"
          />
        </div>

        <div className="md:col-span-1">
          <Input
            label="ID Number"
            type="text"
            placeholder="Enter ID number"
            value={formData?.idNumber}
            onChange={(e) => handleInputChange('idNumber', e?.target?.value)}
            error={errors?.idNumber}
            required
            className="mb-4"
          />
        </div>
      </div>
      {/* Photo Capture Section */}
      <div className="border border-border rounded-lg p-4 bg-muted">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="Camera" size={20} color="var(--color-text-secondary)" />
          <h4 className="font-medium text-text-primary">Visitor Photo</h4>
        </div>
        
        <div className="flex flex-col items-center justify-center py-8 border-2 border-dashed border-border rounded-lg bg-background">
          <Icon name="User" size={48} color="var(--color-text-secondary)" className="mb-4" />
          <p className="text-sm text-text-secondary mb-4">Photo will be captured during check-in</p>
          <div className="flex items-center space-x-2 text-xs text-text-secondary">
            <Icon name="Info" size={14} />
            <span>Required for security badge generation</span>
          </div>
        </div>
      </div>
      {/* Policy Acknowledgments */}
      <div className="space-y-4 pt-4 border-t border-border">
        <h4 className="font-medium text-text-primary mb-4">Security Policies & Agreements</h4>
        
        <Checkbox
          label="I agree to follow all facility security policies"
          description="Including badge wearing, escort requirements, and restricted area compliance"
          checked={formData?.agreeSecurityPolicy}
          onChange={(e) => handleCheckboxChange('agreeSecurityPolicy', e?.target?.checked)}
          error={errors?.agreeSecurityPolicy}
          required
        />

        <Checkbox
          label="I consent to security screening if required"
          description="This may include bag inspection and metal detection"
          checked={formData?.consentScreening}
          onChange={(e) => handleCheckboxChange('consentScreening', e?.target?.checked)}
          error={errors?.consentScreening}
          required
        />

        <Checkbox
          label="I understand photography/recording restrictions"
          description="No unauthorized photography or recording is permitted in the facility"
          checked={formData?.understandPhotoPolicy}
          onChange={(e) => handleCheckboxChange('understandPhotoPolicy', e?.target?.checked)}
          error={errors?.understandPhotoPolicy}
          required
        />

        <Checkbox
          label="I agree to data processing for security purposes"
          description="Personal information will be processed in accordance with privacy policy"
          checked={formData?.consentDataProcessing}
          onChange={(e) => handleCheckboxChange('consentDataProcessing', e?.target?.checked)}
          error={errors?.consentDataProcessing}
          required
        />
      </div>
    </div>
  );
};

export default SecurityClearanceSection;