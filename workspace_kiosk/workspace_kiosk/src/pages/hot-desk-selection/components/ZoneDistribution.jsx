import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ZoneDistribution = ({ desks }) => {
  const getZoneStats = () => {
    const zones = {};
    desks?.forEach(desk => {
      if (!zones?.[desk?.zone]) {
        zones[desk.zone] = { total: 0, available: 0, occupied: 0, unavailable: 0 };
      }
      zones[desk.zone].total++;
      zones[desk.zone][desk.status]++;
    });
    return zones;
  };

  const zoneStats = getZoneStats();
  const zoneIcons = {
    'Quiet Zone': 'Volume1',
    'Collaboration Zone': 'Users',
    'Meeting Zone': 'MessageSquare',
    'Casual Zone': 'Coffee'
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Zone Distribution
      </h3>
      <div className="space-y-4">
        {Object.entries(zoneStats)?.map(([zone, stats], index) => (
          <motion.div
            key={zone}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-muted rounded-lg p-4"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon 
                  name={zoneIcons?.[zone] || 'MapPin'} 
                  size={16} 
                  color="var(--color-primary)" 
                />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-foreground">{zone}</h4>
                <p className="text-sm text-muted-foreground">
                  {stats?.total} desks total
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Availability</span>
                <span>{Math.round((stats?.available / stats?.total) * 100)}%</span>
              </div>
              <div className="w-full bg-border rounded-full h-2 overflow-hidden">
                <div className="h-full flex">
                  <div 
                    className="bg-success transition-all duration-300"
                    style={{ width: `${(stats?.available / stats?.total) * 100}%` }}
                  />
                  <div 
                    className="bg-destructive transition-all duration-300"
                    style={{ width: `${(stats?.occupied / stats?.total) * 100}%` }}
                  />
                  <div 
                    className="bg-muted-foreground transition-all duration-300"
                    style={{ width: `${(stats?.unavailable / stats?.total) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex justify-between mt-3 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-muted-foreground">{stats?.available} available</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-destructive rounded-full"></div>
                <span className="text-muted-foreground">{stats?.occupied} occupied</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                <span className="text-muted-foreground">{stats?.unavailable} unavailable</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ZoneDistribution;