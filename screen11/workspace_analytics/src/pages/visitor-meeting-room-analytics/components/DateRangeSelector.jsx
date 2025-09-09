import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DateRangeSelector = ({ onDateRangeChange }) => {
  const [selectedRange, setSelectedRange] = useState('today');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [showCustomPicker, setShowCustomPicker] = useState(false);

  const presetRanges = [
    { id: 'today', label: 'Today', icon: 'Calendar' },
    { id: 'week', label: 'This Week', icon: 'Calendar' },
    { id: 'month', label: 'This Month', icon: 'Calendar' },
    { id: 'quarter', label: 'This Quarter', icon: 'Calendar' },
    { id: 'year', label: 'This Year', icon: 'Calendar' },
    { id: 'custom', label: 'Custom Range', icon: 'CalendarRange' }
  ];

  const handleRangeSelect = (rangeId) => {
    setSelectedRange(rangeId);
    setShowCustomPicker(rangeId === 'custom');
    
    if (rangeId !== 'custom') {
      const dateRange = getDateRangeForPreset(rangeId);
      onDateRangeChange?.(dateRange);
    }
  };

  const getDateRangeForPreset = (preset) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    switch (preset) {
      case 'today':
        return {
          start: today,
          end: today,
          label: 'Today'
        };
      case 'week':
        const weekStart = new Date(today);
        weekStart?.setDate(today?.getDate() - today?.getDay());
        const weekEnd = new Date(weekStart);
        weekEnd?.setDate(weekStart?.getDate() + 6);
        return {
          start: weekStart,
          end: weekEnd,
          label: 'This Week'
        };
      case 'month':
        const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        return {
          start: monthStart,
          end: monthEnd,
          label: 'This Month'
        };
      case 'quarter':
        const quarterMonth = Math.floor(today?.getMonth() / 3) * 3;
        const quarterStart = new Date(today.getFullYear(), quarterMonth, 1);
        const quarterEnd = new Date(today.getFullYear(), quarterMonth + 3, 0);
        return {
          start: quarterStart,
          end: quarterEnd,
          label: 'This Quarter'
        };
      case 'year':
        const yearStart = new Date(today.getFullYear(), 0, 1);
        const yearEnd = new Date(today.getFullYear(), 11, 31);
        return {
          start: yearStart,
          end: yearEnd,
          label: 'This Year'
        };
      default:
        return {
          start: today,
          end: today,
          label: 'Today'
        };
    }
  };

  const handleCustomDateApply = () => {
    if (customStartDate && customEndDate) {
      const dateRange = {
        start: new Date(customStartDate),
        end: new Date(customEndDate),
        label: `${customStartDate} to ${customEndDate}`
      };
      onDateRangeChange?.(dateRange);
      setShowCustomPicker(false);
    }
  };

  const formatDateForDisplay = (dateRange) => {
    if (!dateRange) return 'Select Date Range';
    
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    const startStr = dateRange?.start?.toLocaleDateString('en-US', options);
    const endStr = dateRange?.end?.toLocaleDateString('en-US', options);
    
    if (startStr === endStr) {
      return startStr;
    }
    return `${startStr} - ${endStr}`;
  };

  const currentDateRange = selectedRange !== 'custom' ? getDateRangeForPreset(selectedRange) : null;

  return (
    <div className="relative">
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
        {/* Preset Range Buttons */}
        <div className="flex flex-wrap gap-2">
          {presetRanges?.map((range) => (
            <Button
              key={range?.id}
              variant={selectedRange === range?.id ? 'default' : 'outline'}
              size="sm"
              iconName={range?.icon}
              iconPosition="left"
              onClick={() => handleRangeSelect(range?.id)}
              className="text-xs"
            >
              {range?.label}
            </Button>
          ))}
        </div>

        {/* Current Selection Display */}
        <div className="flex items-center space-x-2 px-3 py-2 bg-muted/50 rounded-md border border-border">
          <Icon name="Calendar" size={16} className="text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">
            {selectedRange === 'custom' && customStartDate && customEndDate
              ? `${customStartDate} to ${customEndDate}`
              : formatDateForDisplay(currentDateRange)
            }
          </span>
        </div>
      </div>
      {/* Custom Date Picker */}
      {showCustomPicker && (
        <div className="absolute top-full left-0 mt-2 p-4 bg-card border border-border rounded-lg shadow-lg z-50 min-w-80">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-medium text-foreground">Custom Date Range</h4>
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={() => setShowCustomPicker(false)}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={customStartDate}
                onChange={(e) => setCustomStartDate(e?.target?.value)}
                className="w-full px-3 py-2 text-sm border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">
                End Date
              </label>
              <input
                type="date"
                value={customEndDate}
                onChange={(e) => setCustomEndDate(e?.target?.value)}
                className="w-full px-3 py-2 text-sm border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCustomPicker(false)}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleCustomDateApply}
              disabled={!customStartDate || !customEndDate}
            >
              Apply
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangeSelector;