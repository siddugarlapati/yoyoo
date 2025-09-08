import React from 'react';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const FilterToolbar = ({ 
  selectedZone, 
  onZoneChange, 
  selectedAmenities, 
  onAmenitiesChange,
  availableCount,
  totalCount 
}) => {
  const zoneOptions = [
    { value: 'all', label: 'All Zones' },
    { value: 'quiet', label: 'Quiet Zone' },
    { value: 'collaboration', label: 'Collaboration Zone' },
    { value: 'meeting', label: 'Meeting Zone' },
    { value: 'casual', label: 'Casual Zone' }
  ];

  const amenityOptions = [
    { value: 'all', label: 'All Amenities' },
    { value: 'dual-monitor', label: 'Dual Monitor' },
    { value: 'standing-desk', label: 'Standing Desk' },
    { value: 'whiteboard', label: 'Whiteboard Access' },
    { value: 'phone-booth', label: 'Phone Booth Nearby' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6 shadow-soft">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="flex-1 min-w-0">
            <Select
              label="Filter by Zone"
              options={zoneOptions}
              value={selectedZone}
              onChange={onZoneChange}
              placeholder="Select zone..."
              className="w-full"
            />
          </div>
          <div className="flex-1 min-w-0">
            <Select
              label="Filter by Amenities"
              options={amenityOptions}
              value={selectedAmenities}
              onChange={onAmenitiesChange}
              placeholder="Select amenities..."
              className="w-full"
            />
          </div>
        </div>

        {/* Availability Stats */}
        <div className="flex items-center gap-4 lg:ml-6">
          <div className="flex items-center gap-2 px-3 py-2 bg-success/10 rounded-lg">
            <Icon name="CheckCircle" size={16} color="var(--color-success)" />
            <span className="text-sm font-medium text-success">
              {availableCount} Available
            </span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg">
            <Icon name="Building2" size={16} color="var(--color-muted-foreground)" />
            <span className="text-sm font-medium text-muted-foreground">
              {totalCount} Total
            </span>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-border">
        <span className="text-sm font-medium text-foreground">Status Legend:</span>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-success rounded-full"></div>
          <span className="text-xs text-muted-foreground">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-destructive rounded-full"></div>
          <span className="text-xs text-muted-foreground">Occupied</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-muted-foreground rounded-full"></div>
          <span className="text-xs text-muted-foreground">Unavailable</span>
        </div>
      </div>
    </div>
  );
};

export default FilterToolbar;