import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const ActionButtons = ({ onDemoToggle, isDemoMode }) => {
  const navigate = useNavigate();

  const handleCheckIn = () => {
    navigate('/booking-confirmation');
  };

  const handleHotDesking = () => {
    navigate('/hot-desk-selection');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="space-y-4"
    >
      <div className="flex flex-col sm:flex-row gap-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1"
        >
          <Button
            variant="default"
            size="lg"
            fullWidth
            iconName="CheckCircle"
            iconPosition="left"
            iconSize={20}
            onClick={handleCheckIn}
            className="h-14 text-lg font-semibold shadow-elevated hover:shadow-lg transition-all duration-200"
          >
            Confirm Check-In
          </Button>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1"
        >
          <Button
            variant="outline"
            size="lg"
            fullWidth
            iconName="Search"
            iconPosition="left"
            iconSize={20}
            onClick={handleHotDesking}
            className="h-14 text-lg font-semibold border-2 hover:bg-muted/50 transition-all duration-200"
          >
            Browse Hot Desks
          </Button>
        </motion.div>
      </div>
      <div className="flex justify-center pt-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="ghost"
            size="sm"
            iconName="RotateCcw"
            iconPosition="left"
            iconSize={16}
            onClick={onDemoToggle}
            className="text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            {isDemoMode ? 'Exit Demo Mode' : 'Demo Mode'}
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ActionButtons;