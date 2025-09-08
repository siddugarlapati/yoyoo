import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import PersonalInfoSection from './components/PersonalInfoSection';
import AppointmentInfoSection from './components/AppointmentInfoSection';
import EmergencyContactSection from './components/EmergencyContactSection';
import VehicleDetailsSection from './components/VehicleDetailsSection';
import SecurityClearanceSection from './components/SecurityClearanceSection';
import ProgressIndicator from './components/ProgressIndicator';
import FormActions from './components/FormActions';
import Icon from '../../components/AppIcon';

const NewVisitorRegistration = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSections, setCompletedSections] = useState([]);

  const [formData, setFormData] = useState({
    // Personal Information
    title: '',
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    phone: '',
    
    // Appointment Information
    visitPurpose: '',
    duration: '',
    visitDate: '',
    visitTime: '',
    hostContact: '',
    customHost: '',
    notes: '',
    
    // Emergency Contact
    emergencyName: '',
    emergencyRelationship: '',
    emergencyPhone: '',
    emergencyEmail: '',
    
    // Vehicle Details
    hasVehicle: false,
    vehicleType: '',
    licensePlate: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleColor: '',
    
    // Security Clearance
    idType: '',
    idNumber: '',
    agreeSecurityPolicy: false,
    consentScreening: false,
    understandPhotoPolicy: false,
    consentDataProcessing: false
  });

  const [errors, setErrors] = useState({});

  // Set default date to today
  useEffect(() => {
    const today = new Date()?.toISOString()?.split('T')?.[0];
    setFormData(prev => ({ ...prev, visitDate: today }));
  }, []);

  // Update current step based on form completion
  useEffect(() => {
    const sections = [
      { key: 'personal', fields: ['firstName', 'lastName', 'company', 'email', 'phone'] },
      { key: 'appointment', fields: ['visitPurpose', 'duration', 'visitDate', 'visitTime', 'hostContact'] },
      { key: 'emergency', fields: [] }, // Optional section
      { key: 'vehicle', fields: [] }, // Optional section
      { key: 'security', fields: ['idType', 'idNumber', 'agreeSecurityPolicy', 'consentScreening', 'understandPhotoPolicy', 'consentDataProcessing'] }
    ];

    const completed = [];
    let nextStep = 1;

    sections?.forEach((section, index) => {
      const isCompleted = section?.fields?.every(field => {
        if (field === 'hostContact' && formData?.hostContact === 'other') {
          return formData?.customHost?.trim() !== '';
        }
        return formData?.[field] && formData?.[field] !== '';
      });

      if (section?.key === 'emergency' || section?.key === 'vehicle') {
        // Optional sections are considered completed if any field is filled or explicitly skipped
        const hasAnyData = Object.keys(formData)?.some(key => 
          key?.startsWith(section?.key === 'emergency' ? 'emergency' : 'vehicle') && 
          formData?.[key] && formData?.[key] !== ''
        );
        if (hasAnyData || section?.key === 'emergency' || (section?.key === 'vehicle' && !formData?.hasVehicle)) {
          completed?.push(section?.key);
        }
      } else if (isCompleted) {
        completed?.push(section?.key);
        nextStep = Math.max(nextStep, index + 2);
      }
    });

    setCompletedSections(completed);
    setCurrentStep(Math.min(nextStep, 5));
  }, [formData]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Personal Information Validation
    if (!formData?.firstName?.trim()) newErrors.firstName = 'First name is required';
    if (!formData?.lastName?.trim()) newErrors.lastName = 'Last name is required';
    if (!formData?.company?.trim()) newErrors.company = 'Company is required';
    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData?.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/?.test(formData?.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Appointment Information Validation
    if (!formData?.visitPurpose) newErrors.visitPurpose = 'Purpose of visit is required';
    if (!formData?.duration) newErrors.duration = 'Expected duration is required';
    if (!formData?.visitDate) newErrors.visitDate = 'Visit date is required';
    if (!formData?.visitTime) newErrors.visitTime = 'Visit time is required';
    if (!formData?.hostContact) newErrors.hostContact = 'Host contact is required';
    if (formData?.hostContact === 'other' && !formData?.customHost?.trim()) {
      newErrors.customHost = 'Please specify host details';
    }

    // Vehicle Details Validation (if vehicle is selected)
    if (formData?.hasVehicle) {
      if (!formData?.vehicleType) newErrors.vehicleType = 'Vehicle type is required';
      if (!formData?.licensePlate?.trim()) newErrors.licensePlate = 'License plate is required';
    }

    // Security Clearance Validation
    if (!formData?.idType) newErrors.idType = 'ID type is required';
    if (!formData?.idNumber?.trim()) newErrors.idNumber = 'ID number is required';
    if (!formData?.agreeSecurityPolicy) newErrors.agreeSecurityPolicy = 'You must agree to security policies';
    if (!formData?.consentScreening) newErrors.consentScreening = 'Consent to screening is required';
    if (!formData?.understandPhotoPolicy) newErrors.understandPhotoPolicy = 'You must acknowledge photo policy';
    if (!formData?.consentDataProcessing) newErrors.consentDataProcessing = 'Data processing consent is required';

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      // Scroll to first error
      const firstErrorElement = document.querySelector('.error');
      if (firstErrorElement) {
        firstErrorElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful registration
      const registrationData = {
        registrationId: `REG-${Date.now()}`,
        visitorId: `VIS-${Math.random()?.toString(36)?.substr(2, 9)?.toUpperCase()}`,
        appointmentCode: `APT-${Math.random()?.toString(36)?.substr(2, 6)?.toUpperCase()}`,
        registrationTime: new Date()?.toISOString(),
        status: 'pending_approval',
        ...formData
      };

      // Store registration data in localStorage for demo
      localStorage.setItem('pendingRegistration', JSON.stringify(registrationData));
      
      // Navigate to confirmation screen
      navigate('/details-confirmation', { 
        state: { 
          registrationData,
          isNewRegistration: true 
        } 
      });

    } catch (error) {
      console.error('Registration failed:', error);
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = async () => {
    setIsSavingDraft(true);

    try {
      // Simulate saving draft
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const draftData = {
        ...formData,
        draftId: `DRAFT-${Date.now()}`,
        savedAt: new Date()?.toISOString()
      };

      localStorage.setItem('registrationDraft', JSON.stringify(draftData));
      
      // Show success message (you could use a toast notification here)
      alert('Draft saved successfully! You can continue registration later.');

    } catch (error) {
      console.error('Failed to save draft:', error);
      alert('Failed to save draft. Please try again.');
    } finally {
      setIsSavingDraft(false);
    }
  };

  const handleBack = () => {
    navigate('/visitor-identification');
  };

  const isFormValid = () => {
    const requiredFields = [
      'firstName', 'lastName', 'company', 'email', 'phone',
      'visitPurpose', 'duration', 'visitDate', 'visitTime', 'hostContact',
      'idType', 'idNumber'
    ];

    const requiredBooleans = [
      'agreeSecurityPolicy', 'consentScreening', 'understandPhotoPolicy', 'consentDataProcessing'
    ];

    const fieldsValid = requiredFields?.every(field => {
      if (field === 'hostContact' && formData?.hostContact === 'other') {
        return formData?.customHost && formData?.customHost?.trim() !== '';
      }
      return formData?.[field] && formData?.[field]?.toString()?.trim() !== '';
    });

    const booleansValid = requiredBooleans?.every(field => formData?.[field] === true);

    const vehicleValid = !formData?.hasVehicle || (
      formData?.vehicleType && formData?.licensePlate && formData?.licensePlate?.trim() !== ''
    );

    return fieldsValid && booleansValid && vehicleValid;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <Icon name="UserPlus" size={24} color="white" strokeWidth={2} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-text-primary">New Visitor Registration</h1>
                <p className="text-text-secondary mt-1">Complete your registration to access TEC Workplace</p>
              </div>
            </div>
          </motion.div>

          {/* Progress Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <ProgressIndicator 
              currentStep={currentStep}
              totalSteps={5}
              completedSections={completedSections}
            />
          </motion.div>

          {/* Registration Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Personal Information Section */}
            <PersonalInfoSection
              formData={formData}
              errors={errors}
              onChange={handleInputChange}
            />

            {/* Appointment Information Section */}
            <AppointmentInfoSection
              formData={formData}
              errors={errors}
              onChange={handleInputChange}
            />

            {/* Emergency Contact Section */}
            <EmergencyContactSection
              formData={formData}
              errors={errors}
              onChange={handleInputChange}
            />

            {/* Vehicle Details Section */}
            <VehicleDetailsSection
              formData={formData}
              errors={errors}
              onChange={handleInputChange}
            />

            {/* Security Clearance Section */}
            <SecurityClearanceSection
              formData={formData}
              errors={errors}
              onChange={handleInputChange}
            />

            {/* Form Actions */}
            <FormActions
              onSubmit={handleSubmit}
              onSaveDraft={handleSaveDraft}
              onBack={handleBack}
              isSubmitting={isSubmitting}
              isSavingDraft={isSavingDraft}
              isFormValid={isFormValid()}
              showBackButton={true}
            />

            {/* Submit Error */}
            {errors?.submit && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-destructive/10 border border-destructive/20 rounded-lg p-4"
              >
                <div className="flex items-center space-x-3">
                  <Icon name="AlertCircle" size={20} color="var(--color-destructive)" />
                  <p className="text-destructive font-medium">{errors?.submit}</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default NewVisitorRegistration;