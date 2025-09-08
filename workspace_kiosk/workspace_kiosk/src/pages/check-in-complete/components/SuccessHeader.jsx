import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const SuccessHeader = ({ employeeName }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-center mb-8"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5, type: "spring", stiffness: 200 }}
        className="inline-flex items-center justify-center w-20 h-20 bg-success rounded-full mb-6 shadow-elevated"
      >
        <Icon name="CheckCircle" size={40} color="white" />
      </motion.div>
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-3xl md:text-4xl font-semibold text-foreground mb-3"
      >
        Welcome, {employeeName}!
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="text-lg text-muted-foreground"
      >
        Your workspace has been successfully assigned
      </motion.p>
    </motion.div>
  );
};

export default SuccessHeader;