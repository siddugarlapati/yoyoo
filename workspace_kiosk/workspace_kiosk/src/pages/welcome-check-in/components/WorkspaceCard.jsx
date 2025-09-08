import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const WorkspaceCard = ({ workspace }) => {
  const amenityIcons = {
    'Dual Monitor': 'Monitor',
    'Standing Desk': 'ArrowUp',
    'Whiteboard': 'PenTool',
    'Phone Booth': 'Phone',
    'Natural Light': 'Sun',
    'Power Outlet': 'Zap'
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-card rounded-2xl border border-border shadow-elevated p-8 mb-8"
    >
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            Your Pre-booked Workspace
          </h2>
          <p className="text-muted-foreground">
            Reserved for today's work session
          </p>
        </div>
        <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-xl">
          <Icon name="MapPin" size={24} color="var(--color-accent)" />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
              <Icon name="Monitor" size={20} color="var(--color-primary)" />
            </div>
            <div>
              <p className="font-semibold text-foreground text-lg">
                Desk {workspace?.deskNumber}
              </p>
              <p className="text-sm text-muted-foreground">
                Workstation ID
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-secondary/10 rounded-lg">
              <Icon name="Building2" size={20} color="var(--color-secondary)" />
            </div>
            <div>
              <p className="font-semibold text-foreground text-lg">
                {workspace?.zone}
              </p>
              <p className="text-sm text-muted-foreground">
                Zone Location
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-foreground mb-3">Available Amenities</h3>
          <div className="grid grid-cols-2 gap-2">
            {workspace?.amenities?.map((amenity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex items-center space-x-2 p-2 bg-muted/50 rounded-lg"
              >
                <Icon 
                  name={amenityIcons?.[amenity] || 'Check'} 
                  size={16} 
                  color="var(--color-accent)" 
                />
                <span className="text-sm text-foreground">{amenity}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-6 p-4 bg-accent/5 rounded-xl border border-accent/20">
        <div className="flex items-center space-x-2">
          <Icon name="Clock" size={16} color="var(--color-accent)" />
          <span className="text-sm font-medium text-accent">
            Booking valid until 6:00 PM today
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default WorkspaceCard;