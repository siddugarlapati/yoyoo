import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import Button from '../../../components/ui/Button';

const UsageAnalyticsChart = () => {
  const [chartType, setChartType] = useState('calls');

  const callVolumeData = [
    { month: 'Jan', calls: 12450, duration: 18600, cost: 2850 },
    { month: 'Feb', calls: 13200, duration: 19800, cost: 3100 },
    { month: 'Mar', calls: 11800, duration: 17400, cost: 2650 },
    { month: 'Apr', calls: 14500, duration: 21200, cost: 3400 },
    { month: 'May', calls: 13800, duration: 20100, cost: 3200 },
    { month: 'Jun', calls: 15200, duration: 22800, cost: 3650 },
    { month: 'Jul', calls: 14100, duration: 20900, cost: 3300 },
    { month: 'Aug', calls: 16800, duration: 24500, cost: 4100 }
  ];

  const peakHoursData = [
    { hour: '8 AM', calls: 450, avgDuration: 3.2 },
    { hour: '9 AM', calls: 820, avgDuration: 4.1 },
    { hour: '10 AM', calls: 1200, avgDuration: 5.8 },
    { hour: '11 AM', calls: 1450, avgDuration: 6.2 },
    { hour: '12 PM', calls: 980, avgDuration: 3.9 },
    { hour: '1 PM', calls: 650, avgDuration: 2.8 },
    { hour: '2 PM', calls: 1350, avgDuration: 5.5 },
    { hour: '3 PM', calls: 1600, avgDuration: 6.8 },
    { hour: '4 PM', calls: 1380, avgDuration: 5.9 },
    { hour: '5 PM', calls: 920, avgDuration: 4.2 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm">
              <span className="text-muted-foreground">{entry?.name}: </span>
              <span className="font-medium" style={{ color: entry?.color }}>
                {entry?.name === 'Cost' ? `$${entry?.value?.toLocaleString()}` : 
                 entry?.name === 'Duration' ? `${(entry?.value / 60)?.toFixed(1)}h` :
                 entry?.name === 'Avg Duration' ? `${entry?.value} min` :
                 entry?.value?.toLocaleString()}
              </span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Usage Analytics</h3>
        <div className="flex items-center space-x-2">
          <Button
            variant={chartType === 'calls' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setChartType('calls')}
          >
            Call Trends
          </Button>
          <Button
            variant={chartType === 'peak' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setChartType('peak')}
          >
            Peak Hours
          </Button>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'calls' ? (
            <AreaChart data={callVolumeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <defs>
                <linearGradient id="callsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="costGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-secondary)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--color-secondary)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="calls"
                stroke="var(--color-primary)"
                fillOpacity={1}
                fill="url(#callsGradient)"
                strokeWidth={2}
                name="Calls"
              />
              <Line
                type="monotone"
                dataKey="cost"
                stroke="var(--color-secondary)"
                strokeWidth={2}
                dot={{ fill: 'var(--color-secondary)', strokeWidth: 2, r: 4 }}
                name="Cost"
              />
            </AreaChart>
          ) : (
            <LineChart data={peakHoursData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="hour" stroke="var(--color-muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="calls"
                stroke="var(--color-primary)"
                strokeWidth={3}
                dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 5 }}
                name="Calls"
              />
              <Line
                type="monotone"
                dataKey="avgDuration"
                stroke="var(--color-secondary)"
                strokeWidth={2}
                dot={{ fill: 'var(--color-secondary)', strokeWidth: 2, r: 4 }}
                name="Avg Duration"
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UsageAnalyticsChart;