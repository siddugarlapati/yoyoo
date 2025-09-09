import React from 'react';
import Icon from '../../../components/AppIcon';

const KPIStrip = ({ dateRange }) => {
  const kpiData = [
    {
      id: 'visitor-count',
      title: 'Total Visitors',
      value: '1,247',
      change: '+12.5%',
      changeType: 'positive',
      icon: 'Users',
      description: 'vs last period',
      trend: [45, 52, 48, 61, 55, 67, 73]
    },
    {
      id: 'avg-duration',
      title: 'Avg Visit Duration',
      value: '2.4h',
      change: '-8.2%',
      changeType: 'negative',
      icon: 'Clock',
      description: 'vs last period',
      trend: [3.2, 2.8, 2.9, 2.6, 2.4, 2.3, 2.4]
    },
    {
      id: 'room-occupancy',
      title: 'Room Occupancy',
      value: '78.5%',
      change: '+5.7%',
      changeType: 'positive',
      icon: 'Building',
      description: 'utilization rate',
      trend: [72, 74, 76, 75, 77, 78, 78.5]
    },
    {
      id: 'no-show-rate',
      title: 'No-Show Rate',
      value: '12.3%',
      change: '-3.1%',
      changeType: 'positive',
      icon: 'AlertTriangle',
      description: 'missed bookings',
      trend: [15.4, 14.2, 13.8, 13.1, 12.8, 12.5, 12.3]
    }
  ];

  const renderMiniChart = (trend, changeType) => {
    const maxValue = Math.max(...trend);
    const minValue = Math.min(...trend);
    const range = maxValue - minValue;
    
    return (
      <div className="flex items-end space-x-1 h-8">
        {trend?.map((value, index) => {
          const height = range === 0 ? 50 : ((value - minValue) / range) * 100;
          return (
            <div
              key={index}
              className={`w-1 rounded-full transition-smooth ${
                changeType === 'positive' ? 'bg-success/60' : 'bg-error/60'
              }`}
              style={{ height: `${Math.max(height, 10)}%` }}
            ></div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {kpiData?.map((kpi) => (
        <div key={kpi?.id} className="bg-card rounded-lg border border-border p-6 hover:shadow-lg transition-smooth">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                <Icon name={kpi?.icon} size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{kpi?.title}</p>
                <p className="text-2xl font-bold text-foreground">{kpi?.value}</p>
              </div>
            </div>
            <div className="w-16">
              {renderMiniChart(kpi?.trend, kpi?.changeType)}
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon 
                name={kpi?.changeType === 'positive' ? 'TrendingUp' : 'TrendingDown'} 
                size={14} 
                className={kpi?.changeType === 'positive' ? 'text-success' : 'text-error'} 
              />
              <span className={`text-sm font-medium ${
                kpi?.changeType === 'positive' ? 'text-success' : 'text-error'
              }`}>
                {kpi?.change}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">{kpi?.description}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KPIStrip;