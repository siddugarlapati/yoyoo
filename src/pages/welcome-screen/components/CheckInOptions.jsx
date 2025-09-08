import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CheckInOptions = () => {
  const navigate = useNavigate();

  const handleVisitorCheckIn = () => {
    navigate('/visitor-identification');
  };

  const handleEmployeeCheckIn = () => {
    // Placeholder for employee authentication route
    console.log('Employee check-in selected');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className="max-w-4xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Visitor Check-In Option */}
        <motion.div 
          className="bg-card border border-border rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="text-center">
            <div className="flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6 mx-auto">
              <Icon name="UserCheck" size={40} color="var(--color-primary)" strokeWidth={2} />
            </div>
            
            <h3 className="text-2xl font-semibold text-text-primary mb-4">
              Visitor Check-In
            </h3>
            
            <p className="text-text-secondary mb-8 leading-relaxed">
              For guests, clients, and external visitors with or without appointments. 
              Complete face verification and registration process.
            </p>
            
            <Button
              variant="default"
              size="lg"
              fullWidth
              onClick={handleVisitorCheckIn}
              iconName="ArrowRight"
              iconPosition="right"
              iconSize={20}
              className="h-14 text-lg font-medium"
            >
              Start Visitor Check-In
            </Button>
            
            <div className="mt-4 text-sm text-text-secondary">
              <div className="flex items-center justify-center space-x-4">
                <span className="flex items-center space-x-1">
                  <Icon name="Camera" size={14} strokeWidth={2} />
                  <span>Face Recognition</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Icon name="FileText" size={14} strokeWidth={2} />
                  <span>Registration</span>
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Employee Check-In Option */}
        <motion.div 
          className="bg-card border border-border rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="text-center">
            <div className="flex items-center justify-center w-20 h-20 bg-accent/10 rounded-full mb-6 mx-auto">
              <Icon name="BadgeCheck" size={40} color="var(--color-accent)" strokeWidth={2} />
            </div>
            
            <h3 className="text-2xl font-semibold text-text-primary mb-4">
              Employee Check-In
            </h3>
            
            <p className="text-text-secondary mb-8 leading-relaxed">
              For TEC employees and authorized personnel. Quick access with 
              employee credentials and biometric verification.
            </p>
            
            <Button
              variant="outline"
              size="lg"
              fullWidth
              onClick={handleEmployeeCheckIn}
              iconName="ArrowRight"
              iconPosition="right"
              iconSize={20}
              className="h-14 text-lg font-medium"
            >
              Employee Access
            </Button>
            
            <div className="mt-4 text-sm text-text-secondary">
              <div className="flex items-center justify-center space-x-4">
                <span className="flex items-center space-x-1">
                  <Icon name="CreditCard" size={14} strokeWidth={2} />
                  <span>ID Badge</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Icon name="Fingerprint" size={14} strokeWidth={2} />
                  <span>Biometric</span>
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CheckInOptions;