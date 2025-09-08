import React from 'react';
import { motion } from 'framer-motion';
import DeskCard from './DeskCard';

const FloorPlanGrid = ({ desks, onDeskSelect, selectedDesk }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">
          Interactive Floor Plan
        </h2>
        <div className="text-sm text-muted-foreground">
          Click on available desks to select
        </div>
      </div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        {desks?.map((desk) => (
          <motion.div key={desk?.id} variants={itemVariants}>
            <DeskCard
              desk={desk}
              onSelect={onDeskSelect}
              isSelected={selectedDesk?.id === desk?.id}
            />
          </motion.div>
        ))}
      </motion.div>
      {desks?.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-2">
            <svg
              className="w-16 h-16 mx-auto mb-4 opacity-50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.5-1.01-6-2.709M16 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">
            No desks match your filters
          </h3>
          <p className="text-muted-foreground">
            Try adjusting your zone or amenity filters to see more options
          </p>
        </div>
      )}
    </div>
  );
};

export default FloorPlanGrid;