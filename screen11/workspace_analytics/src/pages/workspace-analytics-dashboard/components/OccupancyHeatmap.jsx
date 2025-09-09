import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OccupancyHeatmap = () => {
  const [selectedFloor, setSelectedFloor] = useState('floor-1');
  const [viewMode, setViewMode] = useState('occupancy');

  // Mock heatmap data for different floors
  const heatmapData = {
    'floor-1': [
      { id: 'desk-1', x: 1, y: 1, occupancy: 85, department: 'Engineering', employee: 'John Smith' },
      { id: 'desk-2', x: 2, y: 1, occupancy: 92, department: 'Engineering', employee: 'Sarah Johnson' },
      { id: 'desk-3', x: 3, y: 1, occupancy: 0, department: 'Engineering', employee: null },
      { id: 'desk-4', x: 4, y: 1, occupancy: 78, department: 'Engineering', employee: 'Mike Wilson' },
      { id: 'desk-5', x: 1, y: 2, occupancy: 95, department: 'Marketing', employee: 'Lisa Chen' },
      { id: 'desk-6', x: 2, y: 2, occupancy: 67, department: 'Marketing', employee: 'David Brown' },
      { id: 'desk-7', x: 3, y: 2, occupancy: 89, department: 'Marketing', employee: 'Emma Davis' },
      { id: 'desk-8', x: 4, y: 2, occupancy: 0, department: 'Marketing', employee: null },
      { id: 'meeting-1', x: 1, y: 3, occupancy: 45, type: 'meeting', capacity: 8 },
      { id: 'meeting-2', x: 3, y: 3, occupancy: 78, type: 'meeting', capacity: 12 }
    ]
  };

  const floors = [
    { value: 'floor-1', label: 'Floor 1' },
    { value: 'floor-2', label: 'Floor 2' },
    { value: 'floor-3', label: 'Floor 3' }
  ];

  const getOccupancyColor = (occupancy) => {
    if (occupancy === 0) return 'bg-gray-200';
    if (occupancy < 30) return 'bg-green-200';
    if (occupancy < 60) return 'bg-yellow-200';
    if (occupancy < 80) return 'bg-orange-200';
    return 'bg-red-200';
  };

  const getOccupancyIntensity = (occupancy) => {
    if (occupancy === 0) return 'opacity-30';
    if (occupancy < 30) return 'opacity-40';
    if (occupancy < 60) return 'opacity-60';
    if (occupancy < 80) return 'opacity-80';
    return 'opacity-100';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Map" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Occupancy Heatmap</h3>
        </div>
        <div className="flex items-center space-x-2">
          {floors?.map((floor) => (
            <Button
              key={floor?.value}
              variant={selectedFloor === floor?.value ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFloor(floor?.value)}
            >
              {floor?.label}
            </Button>
          ))}
        </div>
      </div>
      {/* Heatmap Grid */}
      <div className="relative bg-muted/20 rounded-lg p-8 mb-6" style={{ minHeight: '400px' }}>
        <div className="grid grid-cols-4 gap-4 h-full">
          {heatmapData?.[selectedFloor]?.map((item) => (
            <div
              key={item?.id}
              className={`
                relative rounded-lg border-2 border-border transition-all duration-200 cursor-pointer
                hover:border-primary hover:scale-105 ${getOccupancyColor(item?.occupancy)} ${getOccupancyIntensity(item?.occupancy)}
              `}
              style={{
                gridColumn: item?.x,
                gridRow: item?.y,
                minHeight: item?.type === 'meeting' ? '80px' : '60px'
              }}
              title={`${item?.type === 'meeting' ? 'Meeting Room' : 'Desk'} - ${item?.occupancy}% occupied`}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
                <Icon 
                  name={item?.type === 'meeting' ? 'Users' : 'User'} 
                  size={item?.type === 'meeting' ? 20 : 16} 
                  className="text-foreground mb-1" 
                />
                <span className="text-xs font-medium text-foreground">{item?.occupancy}%</span>
                {item?.employee && (
                  <span className="text-xs text-muted-foreground truncate w-full text-center">
                    {item?.employee?.split(' ')?.[0]}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="absolute bottom-2 right-2 bg-card border border-border rounded-lg p-3">
          <h4 className="text-xs font-medium text-foreground mb-2">Occupancy Level</h4>
          <div className="flex items-center space-x-2 text-xs">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-gray-200 rounded"></div>
              <span>Empty</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-green-200 rounded"></div>
              <span>Low</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-yellow-200 rounded"></div>
              <span>Medium</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-orange-200 rounded"></div>
              <span>High</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-red-200 rounded"></div>
              <span>Full</span>
            </div>
          </div>
        </div>
      </div>
      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">24</div>
          <div className="text-sm text-muted-foreground">Total Desks</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-success">18</div>
          <div className="text-sm text-muted-foreground">Occupied</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-warning">6</div>
          <div className="text-sm text-muted-foreground">Available</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">75%</div>
          <div className="text-sm text-muted-foreground">Utilization</div>
        </div>
      </div>
    </div>
  );
};

export default OccupancyHeatmap;