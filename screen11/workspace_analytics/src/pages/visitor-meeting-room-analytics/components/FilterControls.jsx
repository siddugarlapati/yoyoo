import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const FilterControls = ({ onFiltersChange }) => {
  const [visitorType, setVisitorType] = useState('all');
  const [roomCategory, setRoomCategory] = useState('all');
  const [department, setDepartment] = useState('all');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const visitorTypeOptions = [
    { value: 'all', label: 'All Visitors' },
    { value: 'employees', label: 'Employees' },
    { value: 'guests', label: 'Guests' },
    { value: 'contractors', label: 'Contractors' },
    { value: 'vendors', label: 'Vendors' }
  ];

  const roomCategoryOptions = [
    { value: 'all', label: 'All Rooms' },
    { value: 'conference', label: 'Conference Rooms' },
    { value: 'meeting', label: 'Meeting Rooms' },
    { value: 'huddle', label: 'Huddle Spaces' },
    { value: 'board', label: 'Board Rooms' },
    { value: 'training', label: 'Training Rooms' }
  ];

  const departmentOptions = [
    { value: 'all', label: 'All Departments' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'sales', label: 'Sales' },
    { value: 'hr', label: 'Human Resources' },
    { value: 'finance', label: 'Finance' },
    { value: 'operations', label: 'Operations' }
  ];

  const handleFilterChange = (filterType, value) => {
    const newFilters = {
      visitorType: filterType === 'visitorType' ? value : visitorType,
      roomCategory: filterType === 'roomCategory' ? value : roomCategory,
      department: filterType === 'department' ? value : department
    };

    switch (filterType) {
      case 'visitorType':
        setVisitorType(value);
        break;
      case 'roomCategory':
        setRoomCategory(value);
        break;
      case 'department':
        setDepartment(value);
        break;
    }

    onFiltersChange?.(newFilters);
  };

  const resetFilters = () => {
    setVisitorType('all');
    setRoomCategory('all');
    setDepartment('all');
    setShowAdvancedFilters(false);
    
    onFiltersChange?.({
      visitorType: 'all',
      roomCategory: 'all',
      department: 'all'
    });
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (visitorType !== 'all') count++;
    if (roomCategory !== 'all') count++;
    if (department !== 'all') count++;
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Primary Filters */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="min-w-48">
            <Select
              label="Visitor Type"
              options={visitorTypeOptions}
              value={visitorType}
              onChange={(value) => handleFilterChange('visitorType', value)}
              className="text-sm"
            />
          </div>
          
          <div className="min-w-48">
            <Select
              label="Room Category"
              options={roomCategoryOptions}
              value={roomCategory}
              onChange={(value) => handleFilterChange('roomCategory', value)}
              className="text-sm"
            />
          </div>
        </div>

        {/* Filter Actions */}
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="SlidersHorizontal"
            iconPosition="left"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          >
            Advanced
            {activeFilterCount > 0 && (
              <span className="ml-1 px-1.5 py-0.5 bg-primary text-white text-xs rounded-full">
                {activeFilterCount}
              </span>
            )}
          </Button>
          
          {activeFilterCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              iconPosition="left"
              onClick={resetFilters}
            >
              Clear
            </Button>
          )}
        </div>
      </div>
      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Select
                label="Department"
                options={departmentOptions}
                value={department}
                onChange={(value) => handleFilterChange('department', value)}
                className="text-sm"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Visit Duration
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  placeholder="Min (hours)"
                  className="flex-1 px-3 py-2 text-sm border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <span className="text-muted-foreground">to</span>
                <input
                  type="number"
                  placeholder="Max (hours)"
                  className="flex-1 px-3 py-2 text-sm border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Room Capacity
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  placeholder="Min capacity"
                  className="flex-1 px-3 py-2 text-sm border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <span className="text-muted-foreground">+</span>
              </div>
            </div>
          </div>

          {/* Quick Filter Tags */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Quick Filters
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'high-traffic', label: 'High Traffic Areas', icon: 'TrendingUp' },
                { id: 'underutilized', label: 'Underutilized Rooms', icon: 'TrendingDown' },
                { id: 'peak-hours', label: 'Peak Hours Only', icon: 'Clock' },
                { id: 'no-shows', label: 'Include No-Shows', icon: 'AlertTriangle' },
                { id: 'recurring', label: 'Recurring Meetings', icon: 'Repeat' }
              ]?.map((filter) => (
                <button
                  key={filter?.id}
                  className="flex items-center space-x-1 px-3 py-1 text-xs border border-border rounded-full hover:bg-muted/50 transition-smooth"
                >
                  <Icon name={filter?.icon} size={12} />
                  <span>{filter?.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* Active Filters Summary */}
      {activeFilterCount > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-2 text-sm">
            <Icon name="Filter" size={16} className="text-muted-foreground" />
            <span className="text-muted-foreground">Active filters:</span>
            <div className="flex flex-wrap gap-1">
              {visitorType !== 'all' && (
                <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                  {visitorTypeOptions?.find(opt => opt?.value === visitorType)?.label}
                </span>
              )}
              {roomCategory !== 'all' && (
                <span className="px-2 py-1 bg-secondary/10 text-secondary rounded text-xs">
                  {roomCategoryOptions?.find(opt => opt?.value === roomCategory)?.label}
                </span>
              )}
              {department !== 'all' && (
                <span className="px-2 py-1 bg-accent/10 text-accent rounded text-xs">
                  {departmentOptions?.find(opt => opt?.value === department)?.label}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterControls;