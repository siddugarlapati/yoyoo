import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


const CameraSection = ({ isRecognizing, onRecognitionComplete, isExpanded }) => {
  const [countdown, setCountdown] = useState(3);
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    if (isRecognizing && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (isRecognizing && countdown === 0) {
      // Simulate 50% success rate
      const isSuccess = Math.random() > 0.5;
      setTimeout(() => {
        onRecognitionComplete(isSuccess);
        setCountdown(3);
      }, 500);
    }
  }, [isRecognizing, countdown, onRecognitionComplete]);

  return (
    <motion.div
      className={`relative bg-gray-900 rounded-lg overflow-hidden ${
        isExpanded ? 'h-96' : 'h-48'
      }`}
      animate={{ height: isExpanded ? 384 : 192 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {/* Camera Feed Placeholder */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="absolute inset-0 bg-black bg-opacity-20" />
        
        {/* Simulated Camera Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-8 grid-rows-6 h-full">
            {Array.from({ length: 48 })?.map((_, i) => (
              <div key={i} className="border border-gray-600" />
            ))}
          </div>
        </div>

        {/* Face Positioning Overlay */}
        <AnimatePresence>
          {showOverlay && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="relative">
                {/* Face Outline */}
                <motion.div
                  className="w-48 h-64 border-2 border-white rounded-full opacity-80"
                  animate={{
                    borderColor: isRecognizing 
                      ? countdown > 0 
                        ? '#F59E0B' :'#10B981' :'#FFFFFF'
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Corner Guides */}
                  <div className="absolute -top-2 -left-2 w-6 h-6 border-l-2 border-t-2 border-white rounded-tl-lg" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 border-r-2 border-t-2 border-white rounded-tr-lg" />
                  <div className="absolute -bottom-2 -left-2 w-6 h-6 border-l-2 border-b-2 border-white rounded-bl-lg" />
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 border-r-2 border-b-2 border-white rounded-br-lg" />
                </motion.div>

                {/* Recognition Status */}
                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center">
                  {isRecognizing ? (
                    <div className="space-y-2">
                      <motion.div
                        className="text-4xl font-bold text-warning"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        {countdown}
                      </motion.div>
                      <p className="text-white text-sm">Scanning face...</p>
                    </div>
                  ) : (
                    <p className="text-white text-sm">Position your face in the frame</p>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Camera Status Indicator */}
        <div className="absolute top-4 left-4 flex items-center space-x-2">
          <div className="w-3 h-3 bg-success rounded-full animate-pulse" />
          <span className="text-white text-sm font-medium">Camera Active</span>
        </div>

        {/* Recognition Progress */}
        {isRecognizing && (
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-black bg-opacity-50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white text-sm">Face Recognition</span>
                <span className="text-warning text-sm font-medium">
                  {countdown > 0 ? 'Processing...' : 'Complete'}
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <motion.div
                  className="bg-warning h-2 rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ 
                    width: isRecognizing 
                      ? `${((3 - countdown) / 3) * 100}%` 
                      : '100%' 
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CameraSection;