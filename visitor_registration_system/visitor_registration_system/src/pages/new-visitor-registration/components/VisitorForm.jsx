import React, { useState, useEffect } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import EmployeeSearch from './EmployeeSearch';
import NDAModal from './NDAModal';

const VisitorForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    hostEmployee: null,
    ndaAgreed: false
  });

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [showNDAModal, setShowNDAModal] = useState(false);

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  // Phone validation regex (US format)
  const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

  const validateField = (name, value) => {
    switch (name) {
      case 'fullName':
        return value?.trim()?.length < 2 ? 'Full name must be at least 2 characters' : '';
      case 'company':
        return value?.trim()?.length < 2 ? 'Company name must be at least 2 characters' : '';
      case 'email':
        return !emailRegex?.test(value) ? 'Please enter a valid email address' : '';
      case 'phone':
        return !phoneRegex?.test(value) ? 'Please enter a valid phone number (e.g., 555-123-4567)' : '';
      case 'hostEmployee':
        return !value ? 'Please select a host employee' : '';
      default:
        return '';
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Validate field on change
    if (name !== 'ndaAgreed') {
      const error = validateField(name, newValue);
      if (error) {
        setErrors(prev => ({
          ...prev,
          [name]: error
        }));
      }
    }
  };

  const handleEmployeeSelect = (employee) => {
    setFormData(prev => ({
      ...prev,
      hostEmployee: employee
    }));

    // Clear error when employee is selected
    if (errors?.hostEmployee) {
      setErrors(prev => ({
        ...prev,
        hostEmployee: ''
      }));
    }
  };

  // Validate entire form
  useEffect(() => {
    const requiredFields = ['fullName', 'company', 'email', 'phone', 'hostEmployee'];
    const hasErrors = Object.values(errors)?.some(error => error !== '');
    const hasEmptyFields = requiredFields?.some(field => {
      if (field === 'hostEmployee') {
        return !formData?.[field];
      }
      return !formData?.[field] || formData?.[field]?.trim() === '';
    });

    setIsFormValid(!hasErrors && !hasEmptyFields);
  }, [formData, errors]);

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    // Final validation
    const newErrors = {};
    Object.keys(formData)?.forEach(key => {
      if (key !== 'ndaAgreed') {
        const error = validateField(key, formData?.[key]);
        if (error) {
          newErrors[key] = error;
        }
      }
    });

    if (Object.keys(newErrors)?.length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
  };

  const formatPhoneNumber = (value) => {
    // Remove all non-digits
    const digits = value?.replace(/\D/g, '');
    
    // Format as (XXX) XXX-XXXX
    if (digits?.length >= 6) {
      return `(${digits?.slice(0, 3)}) ${digits?.slice(3, 6)}-${digits?.slice(6, 10)}`;
    } else if (digits?.length >= 3) {
      return `(${digits?.slice(0, 3)}) ${digits?.slice(3)}`;
    } else {
      return digits;
    }
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e?.target?.value);
    handleInputChange({
      target: {
        name: 'phone',
        value: formatted
      }
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <Input
          label="Full Name"
          type="text"
          name="fullName"
          placeholder="Enter your full name"
          value={formData?.fullName}
          onChange={handleInputChange}
          error={errors?.fullName}
          required
          className="w-full"
        />

        {/* Company */}
        <Input
          label="Company"
          type="text"
          name="company"
          placeholder="Enter your company name"
          value={formData?.company}
          onChange={handleInputChange}
          error={errors?.company}
          required
          className="w-full"
        />

        {/* Email */}
        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="Enter your email address"
          value={formData?.email}
          onChange={handleInputChange}
          error={errors?.email}
          required
          className="w-full"
        />

        {/* Phone */}
        <Input
          label="Phone Number"
          type="tel"
          name="phone"
          placeholder="(555) 123-4567"
          value={formData?.phone}
          onChange={handlePhoneChange}
          error={errors?.phone}
          required
          className="w-full"
        />

        {/* Employee Search */}
        <EmployeeSearch
          onEmployeeSelect={handleEmployeeSelect}
          selectedEmployee={formData?.hostEmployee}
          error={errors?.hostEmployee}
        />

        {/* NDA Agreement */}
        <div className="flex items-start space-x-3">
          <Checkbox
            name="ndaAgreed"
            checked={formData?.ndaAgreed}
            onChange={handleInputChange}
            className="mt-1"
          />
          <div className="flex-1">
            <label className="text-sm text-text-primary">
              I agree to the{' '}
              <button
                type="button"
                onClick={() => setShowNDAModal(true)}
                className="text-primary hover:text-primary/80 underline focus:outline-none focus:ring-2 focus:ring-primary/20 rounded"
              >
                Non-Disclosure Agreement
              </button>
              {' '}(Optional)
            </label>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-6">
          <Button
            type="submit"
            variant="default"
            disabled={!isFormValid}
            iconName="UserCheck"
            iconPosition="left"
            className="flex-1 sm:flex-none"
          >
            Complete Registration
          </Button>
          
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            iconName="X"
            iconPosition="left"
            className="flex-1 sm:flex-none"
          >
            Cancel
          </Button>
        </div>
      </form>
      {/* NDA Modal */}
      <NDAModal
        isOpen={showNDAModal}
        onClose={() => setShowNDAModal(false)}
      />
    </>
  );
};

export default VisitorForm;