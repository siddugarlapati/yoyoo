import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import Icon from '../../../components/AppIcon';

const MeetingRoomSection = ({ dateRange, roomCategory }) => {
  const bookingPatternsData = [
    { day: 'Mon', bookings: 45, utilization: 78 },
    { day: 'Tue', bookings: 52, utilization: 85 },
    { day: 'Wed', bookings: 48, utilization: 82 },
    { day: 'Thu', bookings: 56, utilization: 89 },
    { day: 'Fri', bookings: 42, utilization: 75 },
    { day: 'Sat', bookings: 18, utilization: 45 },
    { day: 'Sun', bookings: 12, utilization: 32 }
  ];

  const timeSlotData = [
    { time: '8 AM', bookings: 12, popularity: 45 },
    { time: '9 AM', bookings: 28, popularity: 78 },
    { time: '10 AM', bookings: 34, popularity: 89 },
    { time: '11 AM', bookings: 31, popularity: 85 },
    { time: '12 PM', bookings: 18, popularity: 56 },
    { time: '1 PM', bookings: 22, popularity: 67 },
    { time: '2 PM', bookings: 36, popularity: 92 },
    { time: '3 PM', bookings: 29, popularity: 82 },
    { time: '4 PM', bookings: 25, popularity: 73 },
    { time: '5 PM', bookings: 15, popularity: 48 }
  ];

  const roomEfficiencyData = [
    { room: 'Conference A', capacity: 12, avgOccupancy: 8, efficiency: 67, bookings: 24 },
    { room: 'Meeting B', capacity: 6, avgOccupancy: 5, efficiency: 83, bookings: 18 },
    { room: 'Board Room', capacity: 16, avgOccupancy: 12, efficiency: 75, bookings: 15 },
    { room: 'Huddle 1', capacity: 4, avgOccupancy: 3, efficiency: 75, bookings: 32 },
    { room: 'Huddle 2', capacity: 4, avgOccupancy: 4, efficiency: 100, bookings: 28 },
    { room: 'Training', capacity: 20, avgOccupancy: 14, efficiency: 70, bookings: 12 }
  ];

  const utilizationTrends = [
    { hour: '8:00', utilization: 25 },
    { hour: '9:00', utilization: 65 },
    { hour: '10:00', utilization: 85 },
    { hour: '11:00', utilization: 78 },
    { hour: '12:00', utilization: 45 },
    { hour: '13:00', utilization: 56 },
    { hour: '14:00', utilization: 89 },
    { hour: '15:00', utilization: 72 },
    { hour: '16:00', utilization: 58 },
    { hour: '17:00', utilization: 34 }
  ];

  return (
    <div className="space-y-6">
      {/* Booking Patterns */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Weekly Booking Patterns</h3>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span className="text-muted-foreground">Bookings</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-secondary rounded-full"></div>
              <span className="text-muted-foreground">Utilization %</span>
            </div>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={bookingPatternsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="day" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--color-card)', 
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="bookings" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Popular Time Slots & Utilization Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Popular Time Slots */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Popular Time Slots</h3>
          <div className="space-y-3">
            {timeSlotData?.slice(0, 6)?.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg">
                    <Icon name="Calendar" size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{item?.time}</p>
                    <p className="text-xs text-muted-foreground">{item?.bookings} bookings</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-smooth"
                      style={{ width: `${item?.popularity}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-medium text-muted-foreground w-8">
                    {item?.popularity}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Utilization Trends */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Hourly Utilization</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={utilizationTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="hour" stroke="var(--color-muted-foreground)" />
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
                  dataKey="utilization" 
                  stroke="var(--color-primary)" 
                  strokeWidth={3}
                  dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Room Efficiency Metrics */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Room Efficiency Metrics</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Room</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Capacity</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Avg Occupancy</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Efficiency</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Bookings</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {roomEfficiencyData?.map((room, index) => (
                <tr key={index} className="border-b border-border/50 hover:bg-muted/30 transition-smooth">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg">
                        <Icon name="Users" size={14} className="text-primary" />
                      </div>
                      <span className="text-sm font-medium text-foreground">{room?.room}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">{room?.capacity}</td>
                  <td className="py-3 px-4 text-sm text-foreground">{room?.avgOccupancy}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-12 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-smooth ${
                            room?.efficiency >= 80 ? 'bg-success' : 
                            room?.efficiency >= 60 ? 'bg-warning' : 'bg-error'
                          }`}
                          style={{ width: `${room?.efficiency}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium text-foreground">{room?.efficiency}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-foreground">{room?.bookings}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      room?.efficiency >= 80 ? 'bg-success/10 text-success' : 
                      room?.efficiency >= 60 ? 'bg-warning/10 text-warning' : 'bg-error/10 text-error'
                    }`}>
                      {room?.efficiency >= 80 ? 'Optimal' : room?.efficiency >= 60 ? 'Good' : 'Underused'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MeetingRoomSection;