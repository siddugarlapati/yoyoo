import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const FloorPlanVisualization = () => {
  const [selectedFloor, setSelectedFloor] = useState('floor-1');
  const [viewMode, setViewMode] = useState('occupancy'); // occupancy, visitors, both

  const floors = [
    { id: 'floor-1', name: 'Floor 1', rooms: 12, visitors: 45 },
    { id: 'floor-2', name: 'Floor 2', rooms: 10, visitors: 32 },
    { id: 'floor-3', name: 'Floor 3', rooms: 8, visitors: 28 }
  ];

  const roomsData = [
    { id: 'conf-a', name: 'Conference A', x: 20, y: 15, width: 25, height: 20, status: 'occupied', occupancy: 8, capacity: 12, visitor: null },
    { id: 'conf-b', name: 'Conference B', x: 55, y: 15, width: 25, height: 20, status: 'available', occupancy: 0, capacity: 10, visitor: null },
    { id: 'meeting-1', name: 'Meeting 1', x: 20, y: 45, width: 15, height: 15, status: 'occupied', occupancy: 4, capacity: 6, visitor: null },
    { id: 'meeting-2', name: 'Meeting 2', x: 40, y: 45, width: 15, height: 15, status: 'booked', occupancy: 0, capacity: 6, visitor: null },
    { id: 'meeting-3', name: 'Meeting 3', x: 60, y: 45, width: 15, height: 15, status: 'available', occupancy: 0, capacity: 6, visitor: null },
    { id: 'huddle-1', name: 'Huddle 1', x: 20, y: 70, width: 12, height: 12, status: 'occupied', occupancy: 3, capacity: 4, visitor: null },
    { id: 'huddle-2', name: 'Huddle 2', x: 40, y: 70, width: 12, height: 12, status: 'available', occupancy: 0, capacity: 4, visitor: null },
    { id: 'board-room', name: 'Board Room', x: 60, y: 65, width: 20, height: 20, status: 'occupied', occupancy: 12, capacity: 16, visitor: null }
  ];

  const visitorsData = [
    { id: 'v1', name: 'John Smith', x: 25, y: 25, type: 'guest', duration: '2h 15m' },
    { id: 'v2', name: 'Sarah Johnson', x: 45, y: 50, type: 'employee', duration: '45m' },
    { id: 'v3', name: 'Mike Wilson', x: 65, y: 75, type: 'contractor', duration: '3h 30m' },
    { id: 'v4', name: 'Lisa Brown', x: 30, y: 75, type: 'guest', duration: '1h 20m' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'occupied': return '#dc3545';
      case 'booked': return '#ffc107';
      case 'available': return '#28a745';
      default: return '#6c757d';
    }
  };

  const getVisitorColor = (type) => {
    switch (type) {
      case 'employee': return '#1f4e79';
      case 'guest': return '#2e75b6';
      case 'contractor': return '#0066cc';
      default: return '#6c757d';
    }
  };

  const getOccupancyPercentage = (occupancy, capacity) => {
    return Math.round((occupancy / capacity) * 100);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
        <h3 className="text-lg font-semibold text-foreground">Interactive Floor Plan</h3>
        
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          {/* Floor Selection */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Floor:</span>
            <select 
              value={selectedFloor}
              onChange={(e) => setSelectedFloor(e?.target?.value)}
              className="px-3 py-1 text-sm border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {floors?.map(floor => (
                <option key={floor?.id} value={floor?.id}>{floor?.name}</option>
              ))}
            </select>
          </div>

          {/* View Mode Selection */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">View:</span>
            <div className="flex bg-muted rounded-md p-1">
              {[
                { id: 'occupancy', label: 'Rooms', icon: 'Building' },
                { id: 'visitors', label: 'Visitors', icon: 'Users' },
                { id: 'both', label: 'Both', icon: 'Eye' }
              ]?.map(mode => (
                <button
                  key={mode?.id}
                  onClick={() => setViewMode(mode?.id)}
                  className={`flex items-center space-x-1 px-3 py-1 text-xs rounded transition-smooth ${
                    viewMode === mode?.id 
                      ? 'bg-primary text-white' :'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name={mode?.icon} size={12} />
                  <span>{mode?.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Floor Plan SVG */}
      <div className="relative bg-muted/20 rounded-lg p-4 mb-6">
        <svg viewBox="0 0 100 100" className="w-full h-96 border border-border rounded">
          {/* Grid Background */}
          <defs>
            <pattern id="grid" width="5" height="5" patternUnits="userSpaceOnUse">
              <path d="M 5 0 L 0 0 0 5" fill="none" stroke="var(--color-border)" strokeWidth="0.2"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
          
          {/* Rooms */}
          {(viewMode === 'occupancy' || viewMode === 'both') && roomsData?.map(room => (
            <g key={room?.id}>
              <rect
                x={room?.x}
                y={room?.y}
                width={room?.width}
                height={room?.height}
                fill={getStatusColor(room?.status)}
                fillOpacity="0.3"
                stroke={getStatusColor(room?.status)}
                strokeWidth="0.5"
                rx="1"
                className="cursor-pointer hover:fillOpacity-0.5 transition-smooth"
              />
              <text
                x={room?.x + room?.width/2}
                y={room?.y + room?.height/2 - 1}
                textAnchor="middle"
                className="text-xs fill-current text-foreground font-medium"
                fontSize="2"
              >
                {room?.name}
              </text>
              <text
                x={room?.x + room?.width/2}
                y={room?.y + room?.height/2 + 2}
                textAnchor="middle"
                className="text-xs fill-current text-muted-foreground"
                fontSize="1.5"
              >
                {room?.occupancy}/{room?.capacity}
              </text>
            </g>
          ))}

          {/* Visitors */}
          {(viewMode === 'visitors' || viewMode === 'both') && visitorsData?.map(visitor => (
            <g key={visitor?.id}>
              <circle
                cx={visitor?.x}
                cy={visitor?.y}
                r="2"
                fill={getVisitorColor(visitor?.type)}
                className="cursor-pointer hover:r-2.5 transition-smooth"
              />
              <circle
                cx={visitor?.x}
                cy={visitor?.y}
                r="3"
                fill="none"
                stroke={getVisitorColor(visitor?.type)}
                strokeWidth="0.3"
                strokeOpacity="0.5"
              />
            </g>
          ))}
        </svg>
      </div>
      {/* Legend and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Room Status Legend */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Room Status</h4>
          <div className="space-y-2">
            {[
              { status: 'occupied', label: 'Occupied', count: 4 },
              { status: 'booked', label: 'Booked (Upcoming)', count: 1 },
              { status: 'available', label: 'Available', count: 3 }
            ]?.map(item => (
              <div key={item?.status} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-sm"
                    style={{ backgroundColor: getStatusColor(item?.status) }}
                  ></div>
                  <span className="text-sm text-muted-foreground">{item?.label}</span>
                </div>
                <span className="text-sm font-medium text-foreground">{item?.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Visitor Types Legend */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Visitor Types</h4>
          <div className="space-y-2">
            {[
              { type: 'employee', label: 'Employees', count: 1 },
              { type: 'guest', label: 'Guests', count: 2 },
              { type: 'contractor', label: 'Contractors', count: 1 }
            ]?.map(item => (
              <div key={item?.type} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: getVisitorColor(item?.type) }}
                  ></div>
                  <span className="text-sm text-muted-foreground">{item?.label}</span>
                </div>
                <span className="text-sm font-medium text-foreground">{item?.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloorPlanVisualization;