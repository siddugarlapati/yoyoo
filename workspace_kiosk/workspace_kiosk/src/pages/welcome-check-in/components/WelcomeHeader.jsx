import React from 'react';
import { motion } from 'framer-motion';

const WelcomeHeader = ({ employeeName }) => {
  const currentTime = new Date()?.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  const currentDate = new Date()?.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-8"
    >
      <div className="mb-4">
        <h1 className="text-4xl md:text-5xl font-semibold text-foreground mb-2">
          Welcome back, {employeeName}!
        </h1>
        <p className="text-lg text-muted-foreground">
          {currentDate} • {currentTime}
        </p>
      </div>
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="inline-flex items-center px-4 py-2 bg-accent/10 rounded-full border border-accent/20"
      >
        <div className="w-2 h-2 bg-accent rounded-full mr-2 animate-pulse"></div>
        <span className="text-sm font-medium text-accent">Ready to check in</span>
      </motion.div>
    </motion.div>
  );
};

export default WelcomeHeader;