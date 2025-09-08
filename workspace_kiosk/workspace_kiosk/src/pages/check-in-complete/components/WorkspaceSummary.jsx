import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const WorkspaceSummary = ({ workspaceDetails }) => {
  const summaryItems = [
    {
      icon: 'Monitor',
      label: 'Desk Number',
      value: workspaceDetails?.deskNumber,
      color: 'text-primary'
    },
    {
      icon: 'MapPin',
      label: 'Zone Location',
      value: workspaceDetails?.zone,
      color: 'text-accent'
    },
    {
      icon: 'Settings',
      label: 'Amenities',
      value: workspaceDetails?.amenities?.join(', '),
      color: 'text-secondary'
    },
    {
      icon: 'Clock',
      label: 'Check-in Time',
      value: workspaceDetails?.checkInTime,
      color: 'text-muted-foreground'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6 }}
      className="bg-card rounded-xl border border-border shadow-soft p-6 mb-8"
    >
      <div className="flex items-center mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg mr-3">
          <Icon name="Briefcase" size={20} color="var(--color-primary)" />
        </div>
        <h2 className="text-xl font-semibold text-foreground">Workspace Summary</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {summaryItems?.map((item, index) => (
          <motion.div
            key={item?.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 + (index * 0.1), duration: 0.4 }}
            className="flex items-start space-x-3 p-4 bg-muted/30 rounded-lg"
          >
            <div className={`flex items-center justify-center w-8 h-8 rounded-lg bg-background ${item?.color}`}>
              <Icon name={item?.icon} size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-muted-foreground mb-1">
                {item?.label}
              </p>
              <p className="text-base font-semibold text-foreground truncate">
                {item?.value}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default WorkspaceSummary;