import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const ManualIdentification = ({ isVisible }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    appointmentCode: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.email) {
      newErrors.email = 'Email address is required';
    } else if (formData?.email !== 'demo@tec.com') {
      newErrors.email = 'Invalid email address. Please use demo@tec.com';
    }
    
    if (!formData?.appointmentCode) {
      newErrors.appointmentCode = 'Appointment code is required';
    } else if (formData?.appointmentCode?.length < 6) {
      newErrors.appointmentCode = 'Appointment code must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      if (formData?.email === 'demo@tec.com') {
        navigate('/face-confirmation');
      } else {
        setErrors({
          email: 'Appointment not found. Please check your details.'
        });
      }
    }, 1500);
  };

  const handleNewVisitorRegistration = () => {
    navigate('/new-visitor-registration');
  };

  if (!isVisible) return null;

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Manual Identification Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center w-12 h-12 bg-secondary rounded-full mx-auto mb-3">
          <Icon name="Search" size={24} color="white" strokeWidth={2} />
        </div>
        <h3 className="text-xl font-semibold text-text-primary">
          Manual Identification
        </h3>
        <p className="text-text-secondary text-sm">
          Enter your appointment details to proceed with check-in
        </p>
      </div>
      {/* Identification Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            value={formData?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            error={errors?.email}
            required
            className="w-full"
          />
          
          <Input
            label="Appointment Code"
            type="text"
            placeholder="Enter appointment code"
            value={formData?.appointmentCode}
            onChange={(e) => handleInputChange('appointmentCode', e?.target?.value)}
            error={errors?.appointmentCode}
            required
            className="w-full"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            type="submit"
            variant="default"
            loading={isLoading}
            iconName="CheckCircle"
            iconPosition="left"
            iconSize={18}
            className="flex-1"
          >
            {isLoading ? 'Verifying...' : 'Verify Appointment'}
          </Button>
          
          <Button
            type="button"
            variant="outline"
            onClick={handleNewVisitorRegistration}
            iconName="UserPlus"
            iconPosition="left"
            iconSize={18}
            className="flex-1"
          >
            New Visitor Registration
          </Button>
        </div>
      </form>
      {/* Help Section */}
      <div className="bg-muted rounded-lg p-4 space-y-3">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} color="var(--color-primary)" strokeWidth={2} />
          <div className="space-y-2">
            <h4 className="font-medium text-text-primary text-sm">
              Need Help?
            </h4>
            <ul className="text-text-secondary text-xs space-y-1">
              <li>• Check your email for appointment confirmation</li>
              <li>• Appointment codes are case-sensitive</li>
              <li>• Contact reception for assistance: ext. 1234</li>
            </ul>
          </div>
        </div>
      </div>
      {/* Demo Credentials Info */}
      <div className="bg-accent bg-opacity-10 border border-accent border-opacity-20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Key" size={20} color="var(--color-accent)" strokeWidth={2} />
          <div className="space-y-1">
            <h4 className="font-medium text-accent text-sm">
              Demo Credentials
            </h4>
            <p className="text-accent text-xs opacity-80">
              Use email: demo@tec.com with any appointment code
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ManualIdentification;