import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const VehicleDetailsSection = ({ formData, errors, onChange }) => {
  const vehicleTypeOptions = [
    { value: 'car', label: 'Car' },
    { value: 'motorcycle', label: 'Motorcycle' },
    { value: 'truck', label: 'Truck' },
    { value: 'van', label: 'Van' },
    { value: 'bicycle', label: 'Bicycle' },
    { value: 'other', label: 'Other' }
  ];

  const handleInputChange = (field, value) => {
    onChange(field, value);
  };

  const handleCheckboxChange = (checked) => {
    handleInputChange('hasVehicle', checked);
    if (!checked) {
      // Clear vehicle details when checkbox is unchecked
      handleInputChange('vehicleType', '');
      handleInputChange('licensePlate', '');
      handleInputChange('vehicleMake', '');
      handleInputChange('vehicleModel', '');
      handleInputChange('vehicleColor', '');
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
          <span className="text-secondary-foreground text-sm font-semibold">4</span>
        </div>
        <h3 className="text-lg font-semibold text-text-primary">Vehicle Information</h3>
        <span className="text-sm text-text-secondary">(Optional)</span>
      </div>
      <div className="mb-6">
        <Checkbox
          label="I will be arriving by vehicle and need parking"
          description="Check this if you need a parking space during your visit"
          checked={formData?.hasVehicle}
          onChange={(e) => handleCheckboxChange(e?.target?.checked)}
        />
      </div>
      {formData?.hasVehicle && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in">
          <div className="md:col-span-1">
            <Select
              label="Vehicle Type"
              placeholder="Select vehicle type"
              options={vehicleTypeOptions}
              value={formData?.vehicleType}
              onChange={(value) => handleInputChange('vehicleType', value)}
              error={errors?.vehicleType}
              required
              className="mb-4"
            />
          </div>

          <div className="md:col-span-1">
            <Input
              label="License Plate Number"
              type="text"
              placeholder="Enter license plate number"
              value={formData?.licensePlate}
              onChange={(e) => handleInputChange('licensePlate', e?.target?.value)}
              error={errors?.licensePlate}
              required
              className="mb-4"
            />
          </div>

          <div className="md:col-span-1">
            <Input
              label="Vehicle Make"
              type="text"
              placeholder="e.g., Toyota, Honda, Ford"
              value={formData?.vehicleMake}
              onChange={(e) => handleInputChange('vehicleMake', e?.target?.value)}
              error={errors?.vehicleMake}
              className="mb-4"
            />
          </div>

          <div className="md:col-span-1">
            <Input
              label="Vehicle Model"
              type="text"
              placeholder="e.g., Camry, Civic, F-150"
              value={formData?.vehicleModel}
              onChange={(e) => handleInputChange('vehicleModel', e?.target?.value)}
              error={errors?.vehicleModel}
              className="mb-4"
            />
          </div>

          <div className="md:col-span-1">
            <Input
              label="Vehicle Color"
              type="text"
              placeholder="e.g., White, Black, Silver"
              value={formData?.vehicleColor}
              onChange={(e) => handleInputChange('vehicleColor', e?.target?.value)}
              error={errors?.vehicleColor}
              className="mb-4"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleDetailsSection;