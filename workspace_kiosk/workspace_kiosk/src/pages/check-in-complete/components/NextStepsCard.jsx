import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const NextStepsCard = ({ nextSteps }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.6 }}
      className="bg-card rounded-xl border border-border shadow-soft p-6 mb-8"
    >
      <div className="flex items-center mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg mr-3">
          <Icon name="Navigation" size={20} color="var(--color-accent)" />
        </div>
        <h2 className="text-xl font-semibold text-foreground">Next Steps</h2>
      </div>
      <div className="space-y-4">
        {nextSteps?.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4 + (index * 0.1), duration: 0.4 }}
            className="flex items-start space-x-4 p-4 bg-muted/20 rounded-lg hover:bg-muted/30 transition-smooth"
          >
            <div className="flex items-center justify-center w-8 h-8 bg-accent text-white rounded-full text-sm font-semibold flex-shrink-0">
              {index + 1}
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name={step?.icon} size={16} color="var(--color-accent)" />
                <h3 className="font-medium text-foreground">{step?.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step?.description}
              </p>
              {step?.additionalInfo && (
                <div className="mt-2 p-2 bg-background rounded border-l-2 border-accent">
                  <p className="text-xs text-muted-foreground">
                    {step?.additionalInfo}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default NextStepsCard;