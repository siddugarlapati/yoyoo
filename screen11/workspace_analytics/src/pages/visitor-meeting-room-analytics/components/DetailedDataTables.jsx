import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const DetailedDataTables = () => {
  const [activeTab, setActiveTab] = useState('visitors');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');

  const visitorLogs = [
    {
      id: 'V001',
      name: 'John Smith',
      type: 'Guest',
      company: 'Tech Solutions Inc.',
      host: 'Sarah Johnson',
      entryTime: '09:15 AM',
      exitTime: '11:30 AM',
      duration: '2h 15m',
      purpose: 'Business Meeting',
      status: 'Completed'
    },
    {
      id: 'V002',
      name: 'Mike Wilson',
      type: 'Contractor',
      company: 'BuildCorp Ltd.',
      host: 'David Brown',
      entryTime: '08:00 AM',
      exitTime: '05:00 PM',
      duration: '9h 00m',
      purpose: 'Maintenance Work',
      status: 'Completed'
    },
    {
      id: 'V003',
      name: 'Lisa Chen',
      type: 'Guest',
      company: 'Marketing Pro',
      host: 'Emma Davis',
      entryTime: '02:30 PM',
      exitTime: 'In Progress',
      duration: '1h 45m',
      purpose: 'Consultation',
      status: 'Active'
    },
    {
      id: 'V004',
      name: 'Robert Taylor',
      type: 'Employee',
      company: 'Internal',
      host: 'N/A',
      entryTime: '07:45 AM',
      exitTime: 'In Progress',
      duration: '5h 30m',
      purpose: 'Work',
      status: 'Active'
    }
  ];

  const bookingHistory = [
    {
      id: 'B001',
      room: 'Conference A',
      organizer: 'Sarah Johnson',
      attendees: 8,
      capacity: 12,
      startTime: '09:00 AM',
      endTime: '11:00 AM',
      duration: '2h 00m',
      purpose: 'Quarterly Review',
      status: 'Completed',
      utilization: '67%'
    },
    {
      id: 'B002',
      room: 'Meeting Room B',
      organizer: 'David Brown',
      attendees: 5,
      capacity: 6,
      startTime: '02:00 PM',
      endTime: '03:30 PM',
      duration: '1h 30m',
      purpose: 'Project Planning',
      status: 'Completed',
      utilization: '83%'
    },
    {
      id: 'B003',
      room: 'Board Room',
      organizer: 'Emma Davis',
      attendees: 0,
      capacity: 16,
      startTime: '10:00 AM',
      endTime: '12:00 PM',
      duration: '2h 00m',
      purpose: 'Executive Meeting',
      status: 'No Show',
      utilization: '0%'
    },
    {
      id: 'B004',
      room: 'Huddle 1',
      organizer: 'Mike Wilson',
      attendees: 3,
      capacity: 4,
      startTime: '03:00 PM',
      endTime: '04:00 PM',
      duration: '1h 00m',
      purpose: 'Team Sync',
      status: 'In Progress',
      utilization: '75%'
    }
  ];

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed': return 'bg-success/10 text-success';
      case 'active': case 'in progress': return 'bg-primary/10 text-primary';
      case 'no show': return 'bg-error/10 text-error';
      default: return 'bg-muted/10 text-muted-foreground';
    }
  };

  const exportData = (type) => {
    const data = type === 'visitors' ? visitorLogs : bookingHistory;
    const csvContent = "data:text/csv;charset=utf-8," + 
      Object.keys(data?.[0])?.join(",") + "\n" +
      data?.map(row => Object.values(row)?.join(","))?.join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link?.setAttribute("href", encodedUri);
    link?.setAttribute("download", `${type}_data_${new Date()?.toISOString()?.split('T')?.[0]}.csv`);
    document.body?.appendChild(link);
    link?.click();
    document.body?.removeChild(link);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
        <h3 className="text-lg font-semibold text-foreground">Detailed Analytics</h3>
        
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          {/* Tab Selection */}
          <div className="flex bg-muted rounded-md p-1">
            <button
              onClick={() => setActiveTab('visitors')}
              className={`flex items-center space-x-2 px-4 py-2 text-sm rounded transition-smooth ${
                activeTab === 'visitors' ?'bg-primary text-white' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name="Users" size={16} />
              <span>Visitor Logs</span>
            </button>
            <button
              onClick={() => setActiveTab('bookings')}
              className={`flex items-center space-x-2 px-4 py-2 text-sm rounded transition-smooth ${
                activeTab === 'bookings' ?'bg-primary text-white' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name="Calendar" size={16} />
              <span>Booking History</span>
            </button>
          </div>

          {/* Export Button */}
          <Button
            variant="outline"
            iconName="Download"
            iconPosition="left"
            onClick={() => exportData(activeTab)}
          >
            Export CSV
          </Button>
        </div>
      </div>
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mb-6">
        <div className="flex-1">
          <Input
            type="search"
            placeholder={`Search ${activeTab}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            className="w-full"
          />
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" iconName="Filter">
            Filter
          </Button>
          <Button variant="outline" iconName="RefreshCw">
            Refresh
          </Button>
        </div>
      </div>
      {/* Visitor Logs Table */}
      {activeTab === 'visitors' && (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-smooth"
                    onClick={() => handleSort('id')}>
                  <div className="flex items-center space-x-1">
                    <span>ID</span>
                    <Icon name="ArrowUpDown" size={12} />
                  </div>
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-smooth"
                    onClick={() => handleSort('name')}>
                  <div className="flex items-center space-x-1">
                    <span>Visitor</span>
                    <Icon name="ArrowUpDown" size={12} />
                  </div>
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Type</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Company</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Host</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Entry</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Duration</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {visitorLogs?.map((visitor, index) => (
                <tr key={index} className="border-b border-border/50 hover:bg-muted/30 transition-smooth">
                  <td className="py-3 px-4 text-sm font-medium text-foreground">{visitor?.id}</td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="text-sm font-medium text-foreground">{visitor?.name}</p>
                      <p className="text-xs text-muted-foreground">{visitor?.purpose}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      visitor?.type === 'Employee' ? 'bg-primary/10 text-primary' :
                      visitor?.type === 'Guest'? 'bg-secondary/10 text-secondary' : 'bg-accent/10 text-accent'
                    }`}>
                      {visitor?.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">{visitor?.company}</td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">{visitor?.host}</td>
                  <td className="py-3 px-4 text-sm text-foreground">{visitor?.entryTime}</td>
                  <td className="py-3 px-4 text-sm text-foreground">{visitor?.duration}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(visitor?.status)}`}>
                      {visitor?.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* Booking History Table */}
      {activeTab === 'bookings' && (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-smooth"
                    onClick={() => handleSort('id')}>
                  <div className="flex items-center space-x-1">
                    <span>ID</span>
                    <Icon name="ArrowUpDown" size={12} />
                  </div>
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Room</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Organizer</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Occupancy</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Time</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Duration</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Utilization</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookingHistory?.map((booking, index) => (
                <tr key={index} className="border-b border-border/50 hover:bg-muted/30 transition-smooth">
                  <td className="py-3 px-4 text-sm font-medium text-foreground">{booking?.id}</td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="text-sm font-medium text-foreground">{booking?.room}</p>
                      <p className="text-xs text-muted-foreground">{booking?.purpose}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">{booking?.organizer}</td>
                  <td className="py-3 px-4 text-sm text-foreground">
                    {booking?.attendees}/{booking?.capacity}
                  </td>
                  <td className="py-3 px-4 text-sm text-foreground">
                    {booking?.startTime} - {booking?.endTime}
                  </td>
                  <td className="py-3 px-4 text-sm text-foreground">{booking?.duration}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-12 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-smooth ${
                            parseInt(booking?.utilization) >= 80 ? 'bg-success' : 
                            parseInt(booking?.utilization) >= 50 ? 'bg-warning' : 'bg-error'
                          }`}
                          style={{ width: booking?.utilization }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium text-foreground">{booking?.utilization}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking?.status)}`}>
                      {booking?.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* Pagination */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
        <div className="text-sm text-muted-foreground">
          Showing 1-4 of 4 entries
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            <Icon name="ChevronLeft" size={16} />
          </Button>
          <Button variant="outline" size="sm">
            1
          </Button>
          <Button variant="outline" size="sm" disabled>
            <Icon name="ChevronRight" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DetailedDataTables;