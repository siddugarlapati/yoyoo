import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const StatusIndicator = ({ status = 'confirmed' }) => {
  const statusConfig = {
    confirmed: {
      icon: 'CheckCircle',
      color: 'var(--color-success)',
      bgColor: 'bg-success/10',
      borderColor: 'border-success/20',
      text: 'Booking Confirmed',
      description: 'Your workspace is ready'
    },
    pending: {
      icon: 'Clock',
      color: 'var(--color-warning)',
      bgColor: 'bg-warning/10',
      borderColor: 'border-warning/20',
      text: 'Pending Confirmation',
      description: 'Please confirm your booking'
    },
    expired: {
      icon: 'AlertTriangle',
      color: 'var(--color-error)',
      bgColor: 'bg-error/10',
      borderColor: 'border-error/20',
      text: 'Booking Expired',
      description: 'Please make a new booking'
    }
  };

  const config = statusConfig?.[status];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.6 }}
      className={`inline-flex items-center space-x-3 px-4 py-3 rounded-xl border ${config?.bgColor} ${config?.borderColor}`}
    >
      <motion.div
        animate={{ rotate: status === 'confirmed' ? [0, 360] : 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <Icon name={config?.icon} size={20} color={config?.color} />
      </motion.div>
      <div>
        <p className="font-semibold text-foreground text-sm">
          {config?.text}
        </p>
        <p className="text-xs text-muted-foreground">
          {config?.description}
        </p>
      </div>
    </motion.div>
  );
};

export default StatusIndicator;