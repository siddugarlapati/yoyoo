import React, { useState } from 'react';
import NavigationHeader from '../../components/ui/NavigationHeader';
import TabNavigation from '../../components/ui/TabNavigation';
import CostMetricsCard from './components/CostMetricsCard';
import CostAnalysisChart from './components/CostAnalysisChart';
import UsageAnalyticsChart from './components/UsageAnalyticsChart';
import DepartmentComparisonTable from './components/DepartmentComparisonTable';
import AdvancedAnalytics from './components/AdvancedAnalytics';
import FilterControls from './components/FilterControls';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const TelephonyCostAnalysisDashboard = () => {
  const [filters, setFilters] = useState({
    billingPeriod: 'current-month',
    department: 'all',
    callType: 'all',
    currency: 'USD'
  });

  const [refreshing, setRefreshing] = useState(false);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const costMetrics = [
    {
      title: 'Total Telephony Costs',
      value: 14300,
      change: '+8.2%',
      changeType: 'negative',
      icon: 'Phone',
      currency: filters?.currency
    },
    {
      title: 'Cost Per Employee',
      value: 71,
      change: '+3.1%',
      changeType: 'negative',
      icon: 'User',
      currency: filters?.currency
    },
    {
      title: 'Budget Variance',
      value: -850,
      change: '-5.6%',
      changeType: 'positive',
      icon: 'TrendingDown',
      currency: filters?.currency
    },
    {
      title: 'Projected Monthly Spend',
      value: 18450,
      change: '+12.4%',
      changeType: 'negative',
      icon: 'Calendar',
      currency: filters?.currency
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <TabNavigation />
      <main className="pt-32 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Telephony & Cost Analysis Dashboard
              </h1>
              <p className="text-muted-foreground">
                Comprehensive communication analytics and financial insights for telecommunications expense management
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={handleRefresh}
                loading={refreshing}
                iconName="RefreshCw"
                iconPosition="left"
                disabled={refreshing}
              >
                {refreshing ? 'Refreshing...' : 'Refresh Data'}
              </Button>
              
              <Button
                variant="default"
                iconName="FileText"
                iconPosition="left"
              >
                Generate Report
              </Button>
            </div>
          </div>

          {/* Filter Controls */}
          <FilterControls onFiltersChange={handleFiltersChange} />

          {/* Cost Metrics Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {costMetrics?.map((metric, index) => (
              <CostMetricsCard
                key={index}
                title={metric?.title}
                value={metric?.value}
                change={metric?.change}
                changeType={metric?.changeType}
                icon={metric?.icon}
                currency={metric?.currency}
              />
            ))}
          </div>

          {/* Main Analytics Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <CostAnalysisChart />
            <UsageAnalyticsChart />
          </div>

          {/* Department Comparison Table */}
          <div className="mb-8">
            <DepartmentComparisonTable />
          </div>

          {/* Advanced Analytics */}
          <div className="mb-8">
            <AdvancedAnalytics />
          </div>

          {/* Alert Banner */}
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 mb-8">
            <div className="flex items-start space-x-3">
              <Icon name="AlertTriangle" size={20} className="text-warning flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-medium text-foreground mb-1">Budget Alert</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Marketing department has exceeded their monthly telephony budget by $400. 
                  International calling costs are 340% higher than usual.
                </p>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button variant="ghost" size="sm">
                    Dismiss
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Stats */}
          <div className="bg-card rounded-lg border border-border p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground mb-1">45,230</div>
                <div className="text-sm text-muted-foreground">Total Calls This Month</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground mb-1">1,247h</div>
                <div className="text-sm text-muted-foreground">Total Call Duration</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground mb-1">203</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground mb-1">92%</div>
                <div className="text-sm text-muted-foreground">System Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TelephonyCostAnalysisDashboard;