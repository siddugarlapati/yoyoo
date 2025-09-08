import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SupportInfo = ({ supportDetails }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.6, duration: 0.6 }}
      className="bg-card rounded-xl border border-border shadow-soft p-6 mb-8"
    >
      <div className="flex items-center mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-warning/10 rounded-lg mr-3">
          <Icon name="HelpCircle" size={20} color="var(--color-warning)" />
        </div>
        <h2 className="text-xl font-semibold text-foreground">Need Help?</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Icon name="Phone" size={16} color="var(--color-primary)" className="mt-1" />
            <div>
              <p className="text-sm font-medium text-foreground mb-1">Facilities Support</p>
              <p className="text-sm text-muted-foreground">{supportDetails?.phone}</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <Icon name="Mail" size={16} color="var(--color-primary)" className="mt-1" />
            <div>
              <p className="text-sm font-medium text-foreground mb-1">Email Support</p>
              <p className="text-sm text-muted-foreground">{supportDetails?.email}</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <Icon name="MapPin" size={16} color="var(--color-primary)" className="mt-1" />
            <div>
              <p className="text-sm font-medium text-foreground mb-1">Reception Desk</p>
              <p className="text-sm text-muted-foreground">{supportDetails?.location}</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground mb-3">Quick Actions</h3>
          
          <Button
            variant="outline"
            size="sm"
            fullWidth
            iconName="MessageSquare"
            iconPosition="left"
            iconSize={16}
            onClick={() => console.log('Chat support clicked')}
            className="justify-start"
          >
            Start Live Chat
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            fullWidth
            iconName="FileText"
            iconPosition="left"
            iconSize={16}
            onClick={() => console.log('Report issue clicked')}
            className="justify-start"
          >
            Report an Issue
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            fullWidth
            iconName="Book"
            iconPosition="left"
            iconSize={16}
            onClick={() => console.log('View guide clicked')}
            className="justify-start"
          >
            Workspace Guide
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default SupportInfo;