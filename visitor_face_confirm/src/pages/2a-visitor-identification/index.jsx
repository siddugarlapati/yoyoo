import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Icon from '../../components/AppIcon';

const VisitorIdentification = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    visitorName: '',
    phoneNumber: '',
    email: '',
    appointmentCode: ''
  });
  const [isSearching, setIsSearching] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = async () => {
    setIsSearching(true);
    
    // Simulate API call delay
    setTimeout(() => {
      console.log('Searching for visitor:', formData);
      
      // In real app, this would search the appointment database
      // For demo purposes, navigate to confirmation screen
      navigate('/2c-visitor-details-confirm', {
        state: { searchData: formData }
      });
      
      setIsSearching(false);
    }, 1500);
  };

  const isFormValid = formData?.visitorName?.trim() && 
    (formData?.phoneNumber?.trim() || formData?.email?.trim() || formData?.appointmentCode?.trim());

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 py-8">
          <div className="w-full max-w-lg mx-auto space-y-8">
            
            {/* Header Section */}
            <div className="text-center space-y-4">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="UserSearch" size={32} color="var(--color-primary)" />
                </div>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                Visitor Identification
              </h1>
              <p className="text-muted-foreground max-w-md mx-auto">
                Please provide your details to find your appointment
              </p>
            </div>

            {/* Identification Form */}
            <div className="bg-card rounded-xl border border-border elevation-card p-6 md:p-8">
              <form className="space-y-6" onSubmit={(e) => e?.preventDefault()}>
                
                {/* Visitor Name - Required */}
                <div className="space-y-2">
                  <label htmlFor="visitorName" className="block text-sm font-medium text-foreground">
                    Full Name <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="visitorName"
                    name="visitorName"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData?.visitorName}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>

                <div className="text-center text-sm text-muted-foreground">
                  <span>Please provide at least one of the following:</span>
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-foreground">
                    Phone Number
                  </label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData?.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-foreground">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={formData?.email}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>

                {/* Appointment Code */}
                <div className="space-y-2">
                  <label htmlFor="appointmentCode" className="block text-sm font-medium text-foreground">
                    Appointment Code
                  </label>
                  <Input
                    id="appointmentCode"
                    name="appointmentCode"
                    type="text"
                    placeholder="Enter appointment code (if available)"
                    value={formData?.appointmentCode}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>

                {/* Search Button */}
                <Button
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-4 text-lg"
                  onClick={handleSearch}
                  disabled={!isFormValid || isSearching}
                >
                  {isSearching ? (
                    <>
                      <Icon name="Loader2" size={20} className="mr-3 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Icon name="Search" size={20} className="mr-3" />
                      Find My Appointment
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Help Section */}
            <div className="text-center space-y-4">
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-sm text-muted-foreground">
                  <Icon name="Info" size={16} className="inline mr-1" />
                  Need help? Contact the front desk or your host for assistance.
                </p>
              </div>
              
              <div className="flex items-center justify-center space-x-6 text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span>System Online</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Shield" size={12} />
                  <span>Secure Connection</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VisitorIdentification;