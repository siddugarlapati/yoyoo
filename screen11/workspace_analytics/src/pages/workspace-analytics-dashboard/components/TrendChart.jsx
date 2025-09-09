import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TrendChart = () => {
  const [chartType, setChartType] = useState('line');
  const [timeRange, setTimeRange] = useState('7d');

  // Mock trend data
  const trendData = [
    { date: '2025-01-01', occupancy: 65, capacity: 100, utilization: 65 },
    { date: '2025-01-02', occupancy: 72, capacity: 100, utilization: 72 },
    { date: '2025-01-03', occupancy: 68, capacity: 100, utilization: 68 },
    { date: '2025-01-04', occupancy: 85, capacity: 100, utilization: 85 },
    { date: '2025-01-05', occupancy: 78, capacity: 100, utilization: 78 },
    { date: '2025-01-06', occupancy: 45, capacity: 100, utilization: 45 },
    { date: '2025-01-07', occupancy: 42, capacity: 100, utilization: 42 },
    { date: '2025-01-08', occupancy: 88, capacity: 100, utilization: 88 }
  ];

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground mb-2">
            {formatDate(label)}
          </p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry?.color }}
              ></div>
              <span className="text-muted-foreground">{entry?.name}:</span>
              <span className="font-medium text-foreground">{entry?.value}%</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="TrendingUp" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Utilization Trends</h3>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center bg-muted rounded-lg p-1">
            <Button
              variant={chartType === 'line' ? "default" : "ghost"}
              size="sm"
              iconName="TrendingUp"
              onClick={() => setChartType('line')}
            >
              Line
            </Button>
            <Button
              variant={chartType === 'bar' ? "default" : "ghost"}
              size="sm"
              iconName="BarChart3"
              onClick={() => setChartType('bar')}
            >
              Bar
            </Button>
          </div>
          <div className="flex items-center bg-muted rounded-lg p-1">
            <Button
              variant={timeRange === '7d' ? "default" : "ghost"}
              size="sm"
              onClick={() => setTimeRange('7d')}
            >
              7D
            </Button>
            <Button
              variant={timeRange === '30d' ? "default" : "ghost"}
              size="sm"
              onClick={() => setTimeRange('30d')}
            >
              30D
            </Button>
            <Button
              variant={timeRange === '90d' ? "default" : "ghost"}
              size="sm"
              onClick={() => setTimeRange('90d')}
            >
              90D
            </Button>
          </div>
        </div>
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'line' ? (
            <LineChart data={trendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="date" 
                tickFormatter={formatDate}
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                domain={[0, 100]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="utilization" 
                stroke="var(--color-primary)" 
                strokeWidth={3}
                dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'var(--color-primary)', strokeWidth: 2 }}
                name="Utilization"
              />
            </LineChart>
          ) : (
            <BarChart data={trendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="date" 
                tickFormatter={formatDate}
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                domain={[0, 100]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="utilization" 
                fill="var(--color-primary)"
                radius={[4, 4, 0, 0]}
                name="Utilization"
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Chart Insights */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 bg-success/10 rounded-lg">
            <Icon name="TrendingUp" size={16} className="text-success" />
          </div>
          <div>
            <div className="text-sm font-medium text-foreground">Peak Day</div>
            <div className="text-xs text-muted-foreground">Monday (88% avg)</div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 bg-warning/10 rounded-lg">
            <Icon name="TrendingDown" size={16} className="text-warning" />
          </div>
          <div>
            <div className="text-sm font-medium text-foreground">Low Day</div>
            <div className="text-xs text-muted-foreground">Sunday (42% avg)</div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg">
            <Icon name="BarChart3" size={16} className="text-primary" />
          </div>
          <div>
            <div className="text-sm font-medium text-foreground">Average</div>
            <div className="text-xs text-muted-foreground">67% utilization</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendChart;