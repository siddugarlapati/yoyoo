import React, { useState } from 'react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';


const FilterControls = ({ onFiltersChange }) => {
  const [filters, setFilters] = useState({
    billingPeriod: 'current-month',
    department: 'all',
    callType: 'all',
    currency: 'USD'
  });

  const billingPeriodOptions = [
    { value: 'current-month', label: 'Current Month' },
    { value: 'last-month', label: 'Last Month' },
    { value: 'current-quarter', label: 'Current Quarter' },
    { value: 'last-quarter', label: 'Last Quarter' },
    { value: 'current-year', label: 'Current Year' },
    { value: 'last-year', label: 'Last Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const departmentOptions = [
    { value: 'all', label: 'All Departments' },
    { value: 'sales', label: 'Sales' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'customer-support', label: 'Customer Support' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'finance', label: 'Finance' },
    { value: 'hr', label: 'Human Resources' }
  ];

  const callTypeOptions = [
    { value: 'all', label: 'All Call Types' },
    { value: 'local', label: 'Local Calls' },
    { value: 'long-distance', label: 'Long Distance' },
    { value: 'international', label: 'International' },
    { value: 'mobile', label: 'Mobile' },
    { value: 'conference', label: 'Conference Calls' },
    { value: 'voicemail', label: 'Voicemail' }
  ];

  const currencyOptions = [
    { value: 'USD', label: 'USD ($)' },
    { value: 'EUR', label: 'EUR (€)' },
    { value: 'GBP', label: 'GBP (£)' },
    { value: 'CAD', label: 'CAD (C$)' }
  ];

  const handleFilterChange = (field, value) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const resetFilters = () => {
    const defaultFilters = {
      billingPeriod: 'current-month',
      department: 'all',
      callType: 'all',
      currency: 'USD'
    };
    setFilters(defaultFilters);
    onFiltersChange?.(defaultFilters);
  };

  const exportData = () => {
    // Mock export functionality
    console.log('Exporting data with filters:', filters);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Filters & Controls</h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={resetFilters}
            iconName="RotateCcw"
            iconPosition="left"
          >
            Reset
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={exportData}
            iconName="Download"
            iconPosition="left"
          >
            Export
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Select
          label="Billing Period"
          options={billingPeriodOptions}
          value={filters?.billingPeriod}
          onChange={(value) => handleFilterChange('billingPeriod', value)}
          className="w-full"
        />

        <Select
          label="Department"
          options={departmentOptions}
          value={filters?.department}
          onChange={(value) => handleFilterChange('department', value)}
          className="w-full"
        />

        <Select
          label="Call Type"
          options={callTypeOptions}
          value={filters?.callType}
          onChange={(value) => handleFilterChange('callType', value)}
          className="w-full"
        />

        <Select
          label="Currency"
          options={currencyOptions}
          value={filters?.currency}
          onChange={(value) => handleFilterChange('currency', value)}
          className="w-full"
        />
      </div>
      {/* Quick Stats */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Data Updated</div>
            <div className="text-sm font-medium text-foreground">15 min ago</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Records</div>
            <div className="text-sm font-medium text-foreground">45,230</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Date Range</div>
            <div className="text-sm font-medium text-foreground">Sep 1-8, 2025</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Processing</div>
            <div className="flex items-center justify-center space-x-1">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <div className="text-sm font-medium text-success">Live</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;