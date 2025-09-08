import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecognitionStatus = ({ status, onRetry, onProceed }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'success':
        return {
          icon: 'CheckCircle',
          iconColor: 'var(--color-success)',
          title: 'Face Recognition Successful',
          message: 'Your identity has been verified successfully.',
          bgColor: 'bg-success bg-opacity-10',
          borderColor: 'border-success border-opacity-20'
        };
      case 'failed':
        return {
          icon: 'XCircle',
          iconColor: 'var(--color-error)',
          title: 'Face Recognition Failed',
          message: 'Unable to verify your identity. Please try again or use manual identification.',
          bgColor: 'bg-error bg-opacity-10',
          borderColor: 'border-error border-opacity-20'
        };
      case 'processing':
        return {
          icon: 'Loader',
          iconColor: 'var(--color-warning)',
          title: 'Processing Recognition',
          message: 'Please hold still while we verify your identity...',
          bgColor: 'bg-warning bg-opacity-10',
          borderColor: 'border-warning border-opacity-20'
        };
      default:
        return null;
    }
  };

  const config = getStatusConfig();
  if (!config) return null;

  return (
    <AnimatePresence>
      <motion.div
        className={`${config?.bgColor} ${config?.borderColor} border rounded-lg p-6 space-y-4`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center space-x-4">
          <motion.div
            animate={status === 'processing' ? { rotate: 360 } : {}}
            transition={status === 'processing' ? { duration: 2, repeat: Infinity, ease: "linear" } : {}}
          >
            <Icon 
              name={config?.icon} 
              size={32} 
              color={config?.iconColor} 
              strokeWidth={2} 
            />
          </motion.div>
          
          <div className="flex-1">
            <h3 className="font-semibold text-text-primary text-lg">
              {config?.title}
            </h3>
            <p className="text-text-secondary text-sm mt-1">
              {config?.message}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        {status === 'success' && (
          <div className="flex justify-end">
            <Button
              variant="default"
              onClick={onProceed}
              iconName="ArrowRight"
              iconPosition="right"
              iconSize={16}
            >
              Proceed to Confirmation
            </Button>
          </div>
        )}

        {status === 'failed' && (
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              onClick={onRetry}
              iconName="RotateCcw"
              iconPosition="left"
              iconSize={16}
              className="flex-1"
            >
              Try Again
            </Button>
            <Button
              variant="secondary"
              onClick={() => {/* Scroll to manual section */}}
              iconName="Edit"
              iconPosition="left"
              iconSize={16}
              className="flex-1"
            >
              Use Manual Entry
            </Button>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default RecognitionStatus;