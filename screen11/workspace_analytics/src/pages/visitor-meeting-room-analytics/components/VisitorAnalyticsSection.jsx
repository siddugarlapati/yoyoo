import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const VisitorAnalyticsSection = ({ dateRange, visitorType }) => {
  const entryExitData = [
    { time: '08:00', entries: 45, exits: 12 },
    { time: '09:00', entries: 78, exits: 23 },
    { time: '10:00', entries: 92, exits: 34 },
    { time: '11:00', entries: 67, exits: 45 },
    { time: '12:00', entries: 34, exits: 89 },
    { time: '13:00', entries: 56, exits: 67 },
    { time: '14:00', entries: 89, exits: 45 },
    { time: '15:00', entries: 76, exits: 56 },
    { time: '16:00', entries: 54, exits: 78 },
    { time: '17:00', entries: 23, exits: 134 },
    { time: '18:00', entries: 12, exits: 89 }
  ];

  const visitorDemographics = [
    { name: 'Employees', value: 65, color: '#1f4e79' },
    { name: 'Guests', value: 25, color: '#2e75b6' },
    { name: 'Contractors', value: 10, color: '#0066cc' }
  ];

  const peakHoursData = [
    { hour: '9 AM', visitors: 156, percentage: 85 },
    { hour: '10 AM', visitors: 142, percentage: 78 },
    { hour: '2 PM', visitors: 134, percentage: 73 },
    { hour: '11 AM', visitors: 128, percentage: 70 },
    { hour: '3 PM', visitors: 119, percentage: 65 }
  ];

  const durationAnalysis = [
    { duration: '< 1hr', count: 45, percentage: 23 },
    { duration: '1-2hrs', count: 67, percentage: 34 },
    { duration: '2-4hrs', count: 52, percentage: 26 },
    { duration: '4-8hrs', count: 28, percentage: 14 },
    { duration: '> 8hrs', count: 6, percentage: 3 }
  ];

  return (
    <div className="space-y-6">
      {/* Entry/Exit Trends */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Entry/Exit Trends</h3>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span className="text-muted-foreground">Entries</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-secondary rounded-full"></div>
              <span className="text-muted-foreground">Exits</span>
            </div>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={entryExitData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="time" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--color-card)', 
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="entries" 
                stroke="var(--color-primary)" 
                strokeWidth={2}
                dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="exits" 
                stroke="var(--color-secondary)" 
                strokeWidth={2}
                dot={{ fill: 'var(--color-secondary)', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Visitor Demographics & Peak Hours */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Demographics */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Visitor Demographics</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={visitorDemographics}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {visitorDemographics?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--color-card)', 
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-4">
            {visitorDemographics?.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item?.color }}></div>
                  <span className="text-sm text-muted-foreground">{item?.name}</span>
                </div>
                <span className="text-sm font-medium text-foreground">{item?.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Peak Hours */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Peak Hours Analysis</h3>
          <div className="space-y-3">
            {peakHoursData?.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg">
                    <Icon name="Clock" size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{item?.hour}</p>
                    <p className="text-xs text-muted-foreground">{item?.visitors} visitors</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-smooth"
                      style={{ width: `${item?.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-medium text-muted-foreground w-8">
                    {item?.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Duration Analysis */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Visit Duration Analysis</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={durationAnalysis}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="duration" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--color-card)', 
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="count" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-5 gap-4 mt-4">
          {durationAnalysis?.map((item, index) => (
            <div key={index} className="text-center">
              <p className="text-xs text-muted-foreground">{item?.duration}</p>
              <p className="text-sm font-medium text-foreground">{item?.count}</p>
              <p className="text-xs text-primary">{item?.percentage}%</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VisitorAnalyticsSection;