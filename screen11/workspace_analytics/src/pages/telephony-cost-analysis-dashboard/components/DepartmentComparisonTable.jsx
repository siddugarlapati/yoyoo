import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const DepartmentComparisonTable = () => {
  const [sortField, setSortField] = useState('totalCost');
  const [sortDirection, setSortDirection] = useState('desc');

  const departmentData = [
    {
      id: 1,
      department: 'Sales',
      employees: 45,
      totalCalls: 8450,
      totalCost: 12850,
      costPerEmployee: 286,
      avgCallDuration: 4.2,
      efficiency: 92,
      trend: [120, 135, 128, 142, 138, 155, 148, 162],
      budget: 13000,
      variance: -150
    },
    {
      id: 2,
      department: 'Marketing',
      employees: 28,
      totalCalls: 3200,
      totalCost: 4850,
      costPerEmployee: 173,
      avgCallDuration: 3.8,
      efficiency: 88,
      trend: [80, 75, 82, 78, 85, 88, 92, 89],
      budget: 5000,
      variance: -150
    },
    {
      id: 3,
      department: 'Customer Support',
      employees: 62,
      totalCalls: 15600,
      totalCost: 18200,
      costPerEmployee: 294,
      avgCallDuration: 6.5,
      efficiency: 95,
      trend: [180, 195, 188, 205, 198, 215, 208, 220],
      budget: 18500,
      variance: -300
    },
    {
      id: 4,
      department: 'Engineering',
      employees: 38,
      totalCalls: 2100,
      totalCost: 3400,
      costPerEmployee: 89,
      avgCallDuration: 2.1,
      efficiency: 78,
      trend: [45, 42, 48, 44, 46, 49, 52, 48],
      budget: 3500,
      variance: -100
    },
    {
      id: 5,
      department: 'Finance',
      employees: 18,
      totalCalls: 1850,
      totalCost: 2950,
      costPerEmployee: 164,
      avgCallDuration: 3.2,
      efficiency: 85,
      trend: [35, 38, 36, 42, 39, 44, 41, 45],
      budget: 3000,
      variance: -50
    },
    {
      id: 6,
      department: 'HR',
      employees: 12,
      totalCalls: 980,
      totalCost: 1650,
      costPerEmployee: 138,
      avgCallDuration: 2.8,
      efficiency: 82,
      trend: [20, 22, 19, 25, 23, 28, 26, 30],
      budget: 1800,
      variance: -150
    }
  ];

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedData = [...departmentData]?.sort((a, b) => {
    const aValue = a?.[sortField];
    const bValue = b?.[sortField];
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(amount);
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) {
      return <Icon name="ArrowUpDown" size={14} className="text-muted-foreground" />;
    }
    return (
      <Icon 
        name={sortDirection === 'asc' ? 'ArrowUp' : 'ArrowDown'} 
        size={14} 
        className="text-primary" 
      />
    );
  };

  const MiniChart = ({ data }) => (
    <div className="w-16 h-8">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data?.map((value, index) => ({ value, index }))}>
          <Line
            type="monotone"
            dataKey="value"
            stroke="var(--color-primary)"
            strokeWidth={1.5}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Department Comparison</h3>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="TrendingUp" size={16} />
            <span>Cost trends over 8 weeks</span>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/30">
            <tr>
              <th className="text-left p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('department')}
                  className="flex items-center space-x-2 hover:text-primary transition-micro"
                >
                  <span>Department</span>
                  <SortIcon field="department" />
                </button>
              </th>
              <th className="text-right p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('employees')}
                  className="flex items-center space-x-2 hover:text-primary transition-micro ml-auto"
                >
                  <span>Employees</span>
                  <SortIcon field="employees" />
                </button>
              </th>
              <th className="text-right p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('totalCalls')}
                  className="flex items-center space-x-2 hover:text-primary transition-micro ml-auto"
                >
                  <span>Total Calls</span>
                  <SortIcon field="totalCalls" />
                </button>
              </th>
              <th className="text-right p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('totalCost')}
                  className="flex items-center space-x-2 hover:text-primary transition-micro ml-auto"
                >
                  <span>Total Cost</span>
                  <SortIcon field="totalCost" />
                </button>
              </th>
              <th className="text-right p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('costPerEmployee')}
                  className="flex items-center space-x-2 hover:text-primary transition-micro ml-auto"
                >
                  <span>Cost/Employee</span>
                  <SortIcon field="costPerEmployee" />
                </button>
              </th>
              <th className="text-right p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('avgCallDuration')}
                  className="flex items-center space-x-2 hover:text-primary transition-micro ml-auto"
                >
                  <span>Avg Duration</span>
                  <SortIcon field="avgCallDuration" />
                </button>
              </th>
              <th className="text-right p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('efficiency')}
                  className="flex items-center space-x-2 hover:text-primary transition-micro ml-auto"
                >
                  <span>Efficiency</span>
                  <SortIcon field="efficiency" />
                </button>
              </th>
              <th className="text-center p-4 font-medium text-foreground">Trend</th>
              <th className="text-right p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('variance')}
                  className="flex items-center space-x-2 hover:text-primary transition-micro ml-auto"
                >
                  <span>Budget Variance</span>
                  <SortIcon field="variance" />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData?.map((dept, index) => (
              <tr 
                key={dept?.id} 
                className={`border-b border-border hover:bg-muted/20 transition-micro ${
                  index % 2 === 0 ? 'bg-background' : 'bg-muted/10'
                }`}
              >
                <td className="p-4">
                  <div className="font-medium text-foreground">{dept?.department}</div>
                </td>
                <td className="p-4 text-right text-foreground">{dept?.employees}</td>
                <td className="p-4 text-right text-foreground">{dept?.totalCalls?.toLocaleString()}</td>
                <td className="p-4 text-right font-medium text-foreground">
                  {formatCurrency(dept?.totalCost)}
                </td>
                <td className="p-4 text-right text-foreground">
                  {formatCurrency(dept?.costPerEmployee)}
                </td>
                <td className="p-4 text-right text-foreground">{dept?.avgCallDuration} min</td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <span className="text-foreground">{dept?.efficiency}%</span>
                    <div className={`w-2 h-2 rounded-full ${
                      dept?.efficiency >= 90 ? 'bg-success' : 
                      dept?.efficiency >= 80 ? 'bg-warning' : 'bg-error'
                    }`}></div>
                  </div>
                </td>
                <td className="p-4 text-center">
                  <MiniChart data={dept?.trend} />
                </td>
                <td className="p-4 text-right">
                  <div className={`font-medium ${
                    dept?.variance > 0 ? 'text-error' : 'text-success'
                  }`}>
                    {formatCurrency(Math.abs(dept?.variance))} {dept?.variance > 0 ? 'over' : 'under'}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DepartmentComparisonTable;