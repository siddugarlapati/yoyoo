import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const ActionButtons = () => {
  const navigate = useNavigate();

  const handleModifySelection = () => {
    navigate('/hot-desk-selection');
  };

  const handleNewCheckIn = () => {
    navigate('/welcome-check-in');
  };

  const handleFinish = () => {
    // In a real app, this might clear session or redirect to a thank you page
    console.log('Check-in process completed');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.8, duration: 0.6 }}
      className="flex flex-col sm:flex-row gap-4 justify-center"
    >
      <Button
        variant="outline"
        size="lg"
        iconName="Edit"
        iconPosition="left"
        iconSize={18}
        onClick={handleModifySelection}
        className="min-w-[200px]"
      >
        Modify Selection
      </Button>
      <Button
        variant="secondary"
        size="lg"
        iconName="RotateCcw"
        iconPosition="left"
        iconSize={18}
        onClick={handleNewCheckIn}
        className="min-w-[200px]"
      >
        New Check-in
      </Button>
      <Button
        variant="default"
        size="lg"
        iconName="Check"
        iconPosition="left"
        iconSize={18}
        onClick={handleFinish}
        className="min-w-[200px]"
      >
        Complete
      </Button>
    </motion.div>
  );
};

export default ActionButtons;