import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const DataTable = () => {
  const [sortField, setSortField] = useState('utilization');
  const [sortDirection, setSortDirection] = useState('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const tableData = [
    {
      id: 'desk-001',
      location: 'Floor 1 - Zone A',
      department: 'Engineering',
      employee: 'John Smith',
      utilization: 92,
      avgHours: 8.2,
      lastUsed: '2025-01-08 09:15',
      status: 'occupied'
    },
    {
      id: 'desk-002',
      location: 'Floor 1 - Zone A',
      department: 'Engineering',
      employee: 'Sarah Johnson',
      utilization: 88,
      avgHours: 7.8,
      lastUsed: '2025-01-08 08:45',
      status: 'occupied'
    },
    {
      id: 'desk-003',
      location: 'Floor 1 - Zone B',
      department: 'Marketing',
      employee: null,
      utilization: 0,
      avgHours: 0,
      lastUsed: '2025-01-05 16:30',
      status: 'available'
    },
    {
      id: 'desk-004',
      location: 'Floor 2 - Zone A',
      department: 'Sales',
      employee: 'Mike Wilson',
      utilization: 76,
      avgHours: 6.8,
      lastUsed: '2025-01-08 10:20',
      status: 'occupied'
    },
    {
      id: 'desk-005',
      location: 'Floor 2 - Zone B',
      department: 'HR',
      employee: 'Lisa Chen',
      utilization: 95,
      avgHours: 8.5,
      lastUsed: '2025-01-08 08:30',
      status: 'occupied'
    },
    {
      id: 'meeting-001',
      location: 'Floor 1 - Conference A',
      department: 'Shared',
      employee: null,
      utilization: 65,
      avgHours: 4.2,
      lastUsed: '2025-01-08 14:00',
      status: 'available',
      type: 'meeting'
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

  const filteredData = tableData?.filter(item =>
    item?.location?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    item?.department?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    (item?.employee && item?.employee?.toLowerCase()?.includes(searchTerm?.toLowerCase()))
  );

  const sortedData = [...filteredData]?.sort((a, b) => {
    const aValue = a?.[sortField];
    const bValue = b?.[sortField];
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const paginatedData = sortedData?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(sortedData?.length / itemsPerPage);

  const getStatusColor = (status) => {
    switch (status) {
      case 'occupied': return 'text-success bg-success/10';
      case 'available': return 'text-muted-foreground bg-muted';
      case 'maintenance': return 'text-warning bg-warning/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getUtilizationColor = (utilization) => {
    if (utilization >= 80) return 'text-success';
    if (utilization >= 60) return 'text-warning';
    if (utilization >= 40) return 'text-orange-500';
    return 'text-error';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Table" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Space Allocation Details</h3>
        </div>
        <div className="flex items-center space-x-2">
          <Input
            type="search"
            placeholder="Search locations, departments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            className="w-64"
          />
          <Button variant="outline" size="sm" iconName="Download">
            Export CSV
          </Button>
        </div>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4">
                <button
                  onClick={() => handleSort('location')}
                  className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <span>Location</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left py-3 px-4">
                <button
                  onClick={() => handleSort('department')}
                  className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <span>Department</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left py-3 px-4">
                <span className="text-sm font-medium text-muted-foreground">Employee</span>
              </th>
              <th className="text-left py-3 px-4">
                <button
                  onClick={() => handleSort('utilization')}
                  className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <span>Utilization</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left py-3 px-4">
                <button
                  onClick={() => handleSort('avgHours')}
                  className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <span>Avg Hours</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left py-3 px-4">
                <span className="text-sm font-medium text-muted-foreground">Last Used</span>
              </th>
              <th className="text-left py-3 px-4">
                <span className="text-sm font-medium text-muted-foreground">Status</span>
              </th>
              <th className="text-left py-3 px-4">
                <span className="text-sm font-medium text-muted-foreground">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData?.map((item) => (
              <tr key={item?.id} className="border-b border-border hover:bg-muted/20 transition-smooth">
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-2">
                    <Icon 
                      name={item?.type === 'meeting' ? 'Users' : 'User'} 
                      size={16} 
                      className="text-muted-foreground" 
                    />
                    <span className="text-sm font-medium text-foreground">{item?.location}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm text-foreground">{item?.department}</span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm text-foreground">
                    {item?.employee || 'Unassigned'}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className={`text-sm font-medium ${getUtilizationColor(item?.utilization)}`}>
                    {item?.utilization}%
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm text-foreground">{item?.avgHours}h</span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm text-muted-foreground">{item?.lastUsed}</span>
                </td>
                <td className="py-3 px-4">
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(item?.status)}`}>
                    {item?.status?.charAt(0)?.toUpperCase() + item?.status?.slice(1)}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="sm" iconName="Edit" />
                    <Button variant="ghost" size="sm" iconName="MoreHorizontal" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
        <div className="text-sm text-muted-foreground">
          Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, sortedData?.length)} of {sortedData?.length} results
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="ChevronLeft"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </Button>
          <div className="flex items-center space-x-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1)?.map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            iconName="ChevronRight"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;