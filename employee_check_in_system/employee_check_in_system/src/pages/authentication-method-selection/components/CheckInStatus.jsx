import React from 'react';
import Icon from '../../../components/AppIcon';

const CheckInStatus = ({ employee, lastCheckIn, todayStats }) => {
  const getGreeting = () => {
    const hour = new Date()?.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
            <Icon name="User" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">
              {getGreeting()}, {employee?.firstName}!
            </h3>
            <p className="text-sm text-text-secondary">
              {employee?.department} • {employee?.role}
            </p>
          </div>
        </div>
        
        <div className="text-right">
          <p className="text-xs text-text-secondary">Employee ID</p>
          <p className="text-sm font-mono font-semibold text-text-primary">
            {employee?.id}
          </p>
        </div>
      </div>
      {/* Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Last Check-in */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={14} className="text-primary" />
            <span className="text-xs font-medium text-text-secondary">Last Check-in</span>
          </div>
          {lastCheckIn ? (
            <div>
              <p className="text-sm font-semibold text-text-primary">
                {new Date(lastCheckIn.timestamp)?.toLocaleDateString()}
              </p>
              <p className="text-xs text-text-secondary">
                {new Date(lastCheckIn.timestamp)?.toLocaleTimeString()} • {lastCheckIn?.method}
              </p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No recent check-ins</p>
          )}
        </div>

        {/* Today's Stats */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Icon name="BarChart3" size={14} className="text-success" />
            <span className="text-xs font-medium text-text-secondary">Today's Activity</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-text-primary">
              {todayStats?.checkIns} check-ins
            </p>
            <p className="text-xs text-text-secondary">
              {todayStats?.hoursWorked}h worked • {todayStats?.status}
            </p>
          </div>
        </div>

        {/* Current Status */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Icon name="Activity" size={14} className="text-warning" />
            <span className="text-xs font-medium text-text-secondary">Current Status</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${
              employee?.status === 'active' ? 'bg-success animate-pulse' : 
              employee?.status === 'away' ? 'bg-warning' : 'bg-muted-foreground'
            }`} />
            <p className="text-sm font-semibold text-text-primary capitalize">
              {employee?.status}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckInStatus;