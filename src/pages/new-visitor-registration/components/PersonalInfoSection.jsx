import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PersonalInfoSection = ({ formData, errors, onChange }) => {
  const titleOptions = [
    { value: 'mr', label: 'Mr.' },
    { value: 'ms', label: 'Ms.' },
    { value: 'mrs', label: 'Mrs.' },
    { value: 'dr', label: 'Dr.' },
    { value: 'prof', label: 'Prof.' }
  ];

  const handleInputChange = (field, value) => {
    onChange(field, value);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
          <span className="text-primary-foreground text-sm font-semibold">1</span>
        </div>
        <h3 className="text-lg font-semibold text-text-primary">Personal Information</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-1">
          <Select
            label="Title"
            placeholder="Select title"
            options={titleOptions}
            value={formData?.title}
            onChange={(value) => handleInputChange('title', value)}
            error={errors?.title}
            className="mb-4"
          />
        </div>

        <div className="md:col-span-1">
          <Input
            label="First Name"
            type="text"
            placeholder="Enter your first name"
            value={formData?.firstName}
            onChange={(e) => handleInputChange('firstName', e?.target?.value)}
            error={errors?.firstName}
            required
            className="mb-4"
          />
        </div>

        <div className="md:col-span-1">
          <Input
            label="Last Name"
            type="text"
            placeholder="Enter your last name"
            value={formData?.lastName}
            onChange={(e) => handleInputChange('lastName', e?.target?.value)}
            error={errors?.lastName}
            required
            className="mb-4"
          />
        </div>

        <div className="md:col-span-1">
          <Input
            label="Company/Organization"
            type="text"
            placeholder="Enter your company name"
            value={formData?.company}
            onChange={(e) => handleInputChange('company', e?.target?.value)}
            error={errors?.company}
            required
            className="mb-4"
          />
        </div>

        <div className="md:col-span-1">
          <Input
            label="Email Address"
            type="email"
            placeholder="Enter your email address"
            value={formData?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            error={errors?.email}
            required
            className="mb-4"
          />
        </div>

        <div className="md:col-span-1">
          <Input
            label="Phone Number"
            type="tel"
            placeholder="Enter your phone number"
            value={formData?.phone}
            onChange={(e) => handleInputChange('phone', e?.target?.value)}
            error={errors?.phone}
            required
            className="mb-4"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoSection;