import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const EmergencyContactSection = ({ formData, errors, onChange }) => {
  const relationshipOptions = [
    { value: 'spouse', label: 'Spouse' },
    { value: 'parent', label: 'Parent' },
    { value: 'sibling', label: 'Sibling' },
    { value: 'child', label: 'Child' },
    { value: 'colleague', label: 'Colleague' },
    { value: 'friend', label: 'Friend' },
    { value: 'other', label: 'Other' }
  ];

  const handleInputChange = (field, value) => {
    onChange(field, value);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
          <span className="text-secondary-foreground text-sm font-semibold">3</span>
        </div>
        <h3 className="text-lg font-semibold text-text-primary">Emergency Contact</h3>
        <span className="text-sm text-text-secondary">(Optional)</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-1">
          <Input
            label="Contact Name"
            type="text"
            placeholder="Enter emergency contact name"
            value={formData?.emergencyName}
            onChange={(e) => handleInputChange('emergencyName', e?.target?.value)}
            error={errors?.emergencyName}
            className="mb-4"
          />
        </div>

        <div className="md:col-span-1">
          <Select
            label="Relationship"
            placeholder="Select relationship"
            options={relationshipOptions}
            value={formData?.emergencyRelationship}
            onChange={(value) => handleInputChange('emergencyRelationship', value)}
            error={errors?.emergencyRelationship}
            className="mb-4"
          />
        </div>

        <div className="md:col-span-1">
          <Input
            label="Phone Number"
            type="tel"
            placeholder="Enter emergency contact phone"
            value={formData?.emergencyPhone}
            onChange={(e) => handleInputChange('emergencyPhone', e?.target?.value)}
            error={errors?.emergencyPhone}
            className="mb-4"
          />
        </div>

        <div className="md:col-span-1">
          <Input
            label="Email Address"
            type="email"
            placeholder="Enter emergency contact email"
            value={formData?.emergencyEmail}
            onChange={(e) => handleInputChange('emergencyEmail', e?.target?.value)}
            error={errors?.emergencyEmail}
            className="mb-4"
          />
        </div>
      </div>
    </div>
  );
};

export default EmergencyContactSection;