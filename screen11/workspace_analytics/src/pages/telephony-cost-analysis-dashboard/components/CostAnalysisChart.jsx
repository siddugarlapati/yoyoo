import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CostAnalysisChart = () => {
  const costData = [
    { category: 'Local Calls', amount: 2450, budget: 2800, variance: -350 },
    { category: 'Long Distance', amount: 4200, budget: 3800, variance: 400 },
    { category: 'International', amount: 1850, budget: 2000, variance: -150 },
    { category: 'Mobile', amount: 3600, budget: 3200, variance: 400 },
    { category: 'Conference', amount: 1200, budget: 1500, variance: -300 },
    { category: 'Equipment', amount: 800, budget: 1000, variance: -200 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-foreground mb-2">{label}</p>
          <div className="space-y-1">
            <p className="text-sm">
              <span className="text-muted-foreground">Actual: </span>
              <span className="font-medium text-foreground">
                ${data?.amount?.toLocaleString()}
              </span>
            </p>
            <p className="text-sm">
              <span className="text-muted-foreground">Budget: </span>
              <span className="font-medium text-foreground">
                ${data?.budget?.toLocaleString()}
              </span>
            </p>
            <p className="text-sm">
              <span className="text-muted-foreground">Variance: </span>
              <span className={`font-medium ${data?.variance > 0 ? 'text-error' : 'text-success'}`}>
                ${Math.abs(data?.variance)?.toLocaleString()} {data?.variance > 0 ? 'over' : 'under'}
              </span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Cost Analysis by Category</h3>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-muted-foreground">Actual</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-secondary rounded-full"></div>
            <span className="text-muted-foreground">Budget</span>
          </div>
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={costData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="category" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              tickFormatter={(value) => `$${(value / 1000)?.toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="budget" fill="var(--color-secondary)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="amount" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CostAnalysisChart;