import React from 'react';
import { motion } from 'framer-motion';
import WelcomeHeader from './components/WelcomeHeader';
import CheckInOptions from './components/CheckInOptions';
import WelcomeFooter from './components/WelcomeFooter';

const WelcomeScreen = () => {
  const pageVariants = {
    initial: {
      opacity: 0,
      scale: 0.95
    },
    in: {
      opacity: 1,
      scale: 1
    },
    out: {
      opacity: 0,
      scale: 1.05
    }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
  };

  return (
    <motion.div
      className="min-h-screen bg-background"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      {/* Main Content Container */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          
          {/* Header Section */}
          <WelcomeHeader />
          
          {/* Check-In Options Section */}
          <CheckInOptions />
          
          {/* Footer Section */}
          <WelcomeFooter />
          
        </div>
      </div>
      {/* Background Pattern */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
      </div>
    </motion.div>
  );
};

export default WelcomeScreen;