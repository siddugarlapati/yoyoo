import React, { useState, useEffect } from 'react';
import NavigationHeader from '../../components/ui/NavigationHeader';
import TabNavigation from '../../components/ui/TabNavigation';
import DateRangeSelector from './components/DateRangeSelector';
import FilterControls from './components/FilterControls';
import KPIStrip from './components/KPIStrip';
import VisitorAnalyticsSection from './components/VisitorAnalyticsSection';
import MeetingRoomSection from './components/MeetingRoomSection';
import FloorPlanVisualization from './components/FloorPlanVisualization';
import DetailedDataTables from './components/DetailedDataTables';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const VisitorMeetingRoomAnalytics = () => {
  const [dateRange, setDateRange] = useState(null);
  const [filters, setFilters] = useState({
    visitorType: 'all',
    roomCategory: 'all',
    department: 'all'
  });
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    // Initialize with today's date range
    const today = new Date();
    const todayRange = {
      start: today,
      end: today,
      label: 'Today'
    };
    setDateRange(todayRange);

    // Set up auto-refresh every 10 minutes
    const interval = setInterval(() => {
      handleRefresh();
    }, 600000); // 10 minutes

    return () => clearInterval(interval);
  }, []);

  const handleDateRangeChange = (newDateRange) => {
    setDateRange(newDateRange);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLastUpdated(new Date());
    setRefreshing(false);
  };

  const handleExportReport = () => {
    // Simulate PDF report generation
    const reportData = {
      dateRange,
      filters,
      timestamp: new Date()?.toISOString()
    };
    
    console.log('Generating PDF report with data:', reportData);
    
    // In a real application, this would trigger PDF generation
    alert('PDF report generation started. You will receive an email when ready.');
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <TabNavigation />
      <main className="pt-32 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Visitor & Meeting Room Analytics
              </h1>
              <p className="text-muted-foreground">
                Comprehensive insights into facility usage patterns and guest management
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <Button
                variant="outline"
                iconName={refreshing ? 'Loader2' : 'RefreshCw'}
                iconPosition="left"
                onClick={handleRefresh}
                disabled={refreshing}
                className={refreshing ? 'animate-spin' : ''}
              >
                {refreshing ? 'Refreshing...' : 'Refresh Data'}
              </Button>
              
              <Button
                variant="default"
                iconName="FileText"
                iconPosition="left"
                onClick={handleExportReport}
              >
                Export Report
              </Button>
            </div>
          </div>

          {/* Last Updated Info */}
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
            <Icon name="Clock" size={16} />
            <span>Last updated: {lastUpdated?.toLocaleTimeString()}</span>
            <span className="w-2 h-2 bg-success rounded-full animate-pulse-subtle"></span>
            <span className="text-success">Live</span>
          </div>

          {/* Date Range and Filters */}
          <div className="space-y-6 mb-8">
            <DateRangeSelector onDateRangeChange={handleDateRangeChange} />
            <FilterControls onFiltersChange={handleFiltersChange} />
          </div>

          {/* KPI Strip */}
          <KPIStrip dateRange={dateRange} />

          {/* Main Analytics Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
            {/* Visitor Analytics Section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg">
                  <Icon name="Users" size={18} className="text-primary" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">Visitor Analytics</h2>
              </div>
              <VisitorAnalyticsSection 
                dateRange={dateRange} 
                visitorType={filters?.visitorType} 
              />
            </div>

            {/* Meeting Room Section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center justify-center w-8 h-8 bg-secondary/10 rounded-lg">
                  <Icon name="Building" size={18} className="text-secondary" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">Meeting Room Analytics</h2>
              </div>
              <MeetingRoomSection 
                dateRange={dateRange} 
                roomCategory={filters?.roomCategory} 
              />
            </div>
          </div>

          {/* Floor Plan Visualization */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-6">
              <div className="flex items-center justify-center w-8 h-8 bg-accent/10 rounded-lg">
                <Icon name="Map" size={18} className="text-accent" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">Interactive Floor Plan</h2>
            </div>
            <FloorPlanVisualization />
          </div>

          {/* Detailed Data Tables */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="flex items-center justify-center w-8 h-8 bg-warning/10 rounded-lg">
                <Icon name="Table" size={18} className="text-warning" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">Detailed Analytics</h2>
            </div>
            <DetailedDataTables />
          </div>

          {/* Footer Info */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Icon name="Database" size={16} />
                  <span>Data refreshes every 10 minutes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Shield" size={16} />
                  <span>GDPR Compliant</span>
                </div>
              </div>
              
              <div className="text-sm text-muted-foreground">
                © {new Date()?.getFullYear()} WorkSpace Analytics. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VisitorMeetingRoomAnalytics;