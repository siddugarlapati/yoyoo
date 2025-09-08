import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const EmergencyContactCard = ({ emergencyData, onContactUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [contactInfo, setContactInfo] = useState(emergencyData);
  const [errors, setErrors] = useState({});

  const validateContact = () => {
    const newErrors = {};
    
    if (!contactInfo?.name?.trim()) {
      newErrors.name = 'Emergency contact name is required';
    }
    
    if (!contactInfo?.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/?.test(contactInfo?.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!contactInfo?.relationship?.trim()) {
      newErrors.relationship = 'Relationship is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSave = () => {
    if (validateContact()) {
      onContactUpdate(contactInfo);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setContactInfo(emergencyData);
    setErrors({});
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setContactInfo(prev => ({
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

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Phone" size={20} color="var(--color-primary)" />
          <h3 className="text-lg font-semibold text-text-primary">
            Emergency Contact
          </h3>
        </div>
        
        {!isEditing && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
            iconName="Edit2"
            iconPosition="left"
            iconSize={14}
          >
            Edit
          </Button>
        )}
      </div>
      {isEditing ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Contact Name"
              type="text"
              placeholder="Enter full name"
              value={contactInfo?.name}
              onChange={(e) => handleInputChange('name', e?.target?.value)}
              error={errors?.name}
              required
            />
            
            <Input
              label="Relationship"
              type="text"
              placeholder="e.g., Spouse, Parent, Friend"
              value={contactInfo?.relationship}
              onChange={(e) => handleInputChange('relationship', e?.target?.value)}
              error={errors?.relationship}
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Phone Number"
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={contactInfo?.phone}
              onChange={(e) => handleInputChange('phone', e?.target?.value)}
              error={errors?.phone}
              required
            />
            
            <Input
              label="Email (Optional)"
              type="email"
              placeholder="contact@example.com"
              value={contactInfo?.email}
              onChange={(e) => handleInputChange('email', e?.target?.value)}
              error={errors?.email}
            />
          </div>
          
          <div className="flex items-center justify-end space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleSave}
              iconName="Check"
              iconPosition="left"
              iconSize={16}
            >
              Save Changes
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-text-secondary">Contact Name</label>
              <p className="text-text-primary font-medium">{contactInfo?.name}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-text-secondary">Relationship</label>
              <p className="text-text-primary font-medium">{contactInfo?.relationship}</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-text-secondary">Phone Number</label>
              <p className="text-text-primary font-medium">{contactInfo?.phone}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-text-secondary">Email</label>
              <p className="text-text-primary font-medium">
                {contactInfo?.email || 'Not provided'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmergencyContactCard;