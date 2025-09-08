import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AppointmentInfoSection = ({ formData, errors, onChange }) => {
  const visitPurposeOptions = [
    { value: 'business_meeting', label: 'Business Meeting' },
    { value: 'interview', label: 'Job Interview' },
    { value: 'delivery', label: 'Delivery/Pickup' },
    { value: 'maintenance', label: 'Maintenance/Service' },
    { value: 'training', label: 'Training Session' },
    { value: 'consultation', label: 'Consultation' },
    { value: 'vendor_meeting', label: 'Vendor Meeting' },
    { value: 'other', label: 'Other' }
  ];

  const durationOptions = [
    { value: '30', label: '30 minutes' },
    { value: '60', label: '1 hour' },
    { value: '90', label: '1.5 hours' },
    { value: '120', label: '2 hours' },
    { value: '180', label: '3 hours' },
    { value: '240', label: '4 hours' },
    { value: 'full_day', label: 'Full Day' }
  ];

  const hostOptions = [
    { value: 'john.smith@tec.com', label: 'John Smith - Engineering' },
    { value: 'sarah.johnson@tec.com', label: 'Sarah Johnson - HR' },
    { value: 'mike.davis@tec.com', label: 'Mike Davis - Operations' },
    { value: 'lisa.wilson@tec.com', label: 'Lisa Wilson - Marketing' },
    { value: 'david.brown@tec.com', label: 'David Brown - Finance' },
    { value: 'emma.taylor@tec.com', label: 'Emma Taylor - IT' },
    { value: 'other', label: 'Other (specify below)' }
  ];

  const handleInputChange = (field, value) => {
    onChange(field, value);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
          <span className="text-primary-foreground text-sm font-semibold">2</span>
        </div>
        <h3 className="text-lg font-semibold text-text-primary">Appointment Information</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-1">
          <Select
            label="Purpose of Visit"
            placeholder="Select visit purpose"
            options={visitPurposeOptions}
            value={formData?.visitPurpose}
            onChange={(value) => handleInputChange('visitPurpose', value)}
            error={errors?.visitPurpose}
            required
            className="mb-4"
          />
        </div>

        <div className="md:col-span-1">
          <Select
            label="Expected Duration"
            placeholder="Select duration"
            options={durationOptions}
            value={formData?.duration}
            onChange={(value) => handleInputChange('duration', value)}
            error={errors?.duration}
            required
            className="mb-4"
          />
        </div>

        <div className="md:col-span-1">
          <Input
            label="Preferred Date"
            type="date"
            value={formData?.visitDate}
            onChange={(e) => handleInputChange('visitDate', e?.target?.value)}
            error={errors?.visitDate}
            required
            className="mb-4"
          />
        </div>

        <div className="md:col-span-1">
          <Input
            label="Preferred Time"
            type="time"
            value={formData?.visitTime}
            onChange={(e) => handleInputChange('visitTime', e?.target?.value)}
            error={errors?.visitTime}
            required
            className="mb-4"
          />
        </div>

        <div className="md:col-span-2">
          <Select
            label="Host Contact"
            placeholder="Select your host"
            options={hostOptions}
            value={formData?.hostContact}
            onChange={(value) => handleInputChange('hostContact', value)}
            error={errors?.hostContact}
            required
            searchable
            className="mb-4"
          />
        </div>

        {formData?.hostContact === 'other' && (
          <div className="md:col-span-2">
            <Input
              label="Host Details"
              type="text"
              placeholder="Enter host name and contact information"
              value={formData?.customHost}
              onChange={(e) => handleInputChange('customHost', e?.target?.value)}
              error={errors?.customHost}
              required
              className="mb-4"
            />
          </div>
        )}

        <div className="md:col-span-2">
          <Input
            label="Additional Notes"
            type="text"
            placeholder="Any additional information about your visit"
            value={formData?.notes}
            onChange={(e) => handleInputChange('notes', e?.target?.value)}
            error={errors?.notes}
            className="mb-4"
          />
        </div>
      </div>
    </div>
  );
};

export default AppointmentInfoSection;