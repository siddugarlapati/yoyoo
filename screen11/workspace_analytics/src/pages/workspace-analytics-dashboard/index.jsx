import React, { useState, useEffect } from 'react';
import NavigationHeader from '../../components/ui/NavigationHeader';
import TabNavigation from '../../components/ui/TabNavigation';
import FilterPanel from './components/FilterPanel';
import KPICard from './components/KPICard';
import OccupancyHeatmap from './components/OccupancyHeatmap';
import TrendChart from './components/TrendChart';
import InsightsPanel from './components/InsightsPanel';
import DataTable from './components/DataTable';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const WorkspaceAnalyticsDashboard = () => {
  const [filtersExpanded, setFiltersExpanded] = useState(false);
  const [activeView, setActiveView] = useState('overview');
  const [filters, setFilters] = useState({
    dateRange: 'month',
    department: 'all',
    floor: 'all',
    comparisonMode: 'none'
  });

  // Mock KPI data
  const kpiData = [
    {
      title: 'Utilization Efficiency',
      value: '73.2',
      unit: '%',
      change: 5.2,
      changeType: 'positive',
      icon: 'TrendingUp',
      description: 'Overall workspace utilization rate'
    },
    {
      title: 'Peak Occupancy Hours',
      value: '10-2',
      unit: 'PM',
      change: -2.1,
      changeType: 'negative',
      icon: 'Clock',
      description: 'Highest usage time window'
    },
    {
      title: 'Underutilized Spaces',
      value: '12',
      unit: 'desks',
      change: 8.3,
      changeType: 'negative',
      icon: 'AlertTriangle',
      description: 'Spaces with &lt;40% utilization'
    },
    {
      title: 'Cost Per Person',
      value: '$284',
      unit: '/month',
      change: -3.7,
      changeType: 'positive',
      icon: 'DollarSign',
      description: 'Average monthly cost per employee'
    }
  ];

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    // In a real app, this would trigger data refetch
    console.log('Filters updated:', newFilters);
  };

  const handleKPIClick = (kpi) => {
    console.log('KPI clicked:', kpi?.title);
    // In a real app, this would navigate to detailed view
  };

  const handleExportData = () => {
    console.log('Exporting workspace analytics data...');
    // In a real app, this would trigger data export
  };

  const handleGenerateReport = () => {
    console.log('Generating workspace analytics report...');
    // In a real app, this would generate PDF report
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <TabNavigation />
      <main className="pt-32 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Workspace Analytics Dashboard
              </h1>
              <p className="text-muted-foreground">
                Comprehensive insights into space utilization, occupancy patterns, and optimization opportunities
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                iconName="Download"
                iconPosition="left"
                onClick={handleExportData}
              >
                Export Data
              </Button>
              <Button
                variant="default"
                iconName="FileText"
                iconPosition="left"
                onClick={handleGenerateReport}
              >
                Generate Report
              </Button>
            </div>
          </div>

          {/* Filters Panel */}
          <FilterPanel
            onFiltersChange={handleFiltersChange}
            isExpanded={filtersExpanded}
            onToggleExpanded={() => setFiltersExpanded(!filtersExpanded)}
          />

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {kpiData?.map((kpi, index) => (
              <KPICard
                key={index}
                {...kpi}
                onClick={() => handleKPIClick(kpi)}
              />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Main Visualization Area (8 cols equivalent) */}
            <div className="lg:col-span-2 space-y-8">
              {/* View Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center bg-muted rounded-lg p-1">
                  <Button
                    variant={activeView === 'overview' ? "default" : "ghost"}
                    size="sm"
                    iconName="BarChart3"
                    onClick={() => setActiveView('overview')}
                  >
                    Overview
                  </Button>
                  <Button
                    variant={activeView === 'heatmap' ? "default" : "ghost"}
                    size="sm"
                    iconName="Map"
                    onClick={() => setActiveView('heatmap')}
                  >
                    Heatmap
                  </Button>
                  <Button
                    variant={activeView === 'trends' ? "default" : "ghost"}
                    size="sm"
                    iconName="TrendingUp"
                    onClick={() => setActiveView('trends')}
                  >
                    Trends
                  </Button>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="RefreshCw" size={16} />
                  <span>Last updated: {new Date()?.toLocaleTimeString()}</span>
                </div>
              </div>

              {/* Dynamic Content Based on Active View */}
              {activeView === 'overview' && (
                <div className="space-y-8">
                  <OccupancyHeatmap />
                  <TrendChart />
                </div>
              )}
              
              {activeView === 'heatmap' && <OccupancyHeatmap />}
              
              {activeView === 'trends' && <TrendChart />}
            </div>

            {/* Side Panel (4 cols equivalent) */}
            <div className="lg:col-span-1">
              <InsightsPanel />
            </div>
          </div>

          {/* Data Table */}
          <DataTable />

          {/* Additional Analytics Summary */}
          <div className="mt-8 bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Quick Analytics Summary</h3>
              <Icon name="BarChart3" size={20} className="text-primary" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground mb-1">156</div>
                <div className="text-sm text-muted-foreground">Total Workspaces</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success mb-1">114</div>
                <div className="text-sm text-muted-foreground">Currently Occupied</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-warning mb-1">42</div>
                <div className="text-sm text-muted-foreground">Available Now</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">$44,280</div>
                <div className="text-sm text-muted-foreground">Monthly Space Cost</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WorkspaceAnalyticsDashboard;