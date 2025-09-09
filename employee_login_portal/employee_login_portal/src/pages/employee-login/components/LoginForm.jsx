import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Mock credentials
  const VALID_CREDENTIALS = {
    email: 'employee@company.com',
    password: 'password123'
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      if (
        formData?.email === VALID_CREDENTIALS?.email &&
        formData?.password === VALID_CREDENTIALS?.password
      ) {
        // Success
        alert('Login successful! Redirecting to workspace confirmation...');
        navigate('/workspace-confirmation');
      } else {
        // Invalid credentials
        setErrors({
          general: 'Invalid email or password. Please try again.'
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleBackToSelection = () => {
    navigate('/employee-auth-selection');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Shield" size={32} color="white" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Employee Login
          </h1>
          <p className="text-gray-600">
            Access your workspace booking system
          </p>
        </div>

        {/* Error Message */}
        {errors?.general && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <Icon name="AlertCircle" size={20} color="#ef4444" className="mr-2" />
              <p className="text-red-700 text-sm">{errors?.general}</p>
            </div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="Enter your company email"
            value={formData?.email}
            onChange={handleInputChange}
            error={errors?.email}
            required
            className="mb-4"
          />

          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData?.password}
            onChange={handleInputChange}
            error={errors?.password}
            required
            className="mb-6"
          />

          {/* Login Button */}
          <Button
            type="submit"
            variant="default"
            size="lg"
            fullWidth
            loading={isLoading}
            iconName="LogIn"
            iconPosition="right"
            className="bg-emerald-500 hover:bg-emerald-600 text-white mb-4"
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>

          {/* Back Button */}
          <Button
            type="button"
            variant="outline"
            size="lg"
            fullWidth
            onClick={handleBackToSelection}
            iconName="ArrowLeft"
            iconPosition="left"
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Back to Selection
          </Button>
        </form>

        {/* Help Text */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Need help? Contact IT support at{' '}
            <span className="text-emerald-600 font-medium">support@company.com</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;