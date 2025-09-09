import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InsightsPanel = () => {
  const [activeTab, setActiveTab] = useState('insights');

  const insights = [
    {
      id: 1,
      type: 'anomaly',
      title: 'Unusual Low Occupancy',
      description: 'Floor 3 showing 40% below normal occupancy for the past 3 days',
      severity: 'warning',
      timestamp: '2 hours ago',
      action: 'Investigate'
    },
    {
      id: 2,
      type: 'recommendation',
      title: 'Space Optimization',
      description: 'Consider converting 2 desks in Marketing zone to collaborative space',
      severity: 'info',
      timestamp: '4 hours ago',
      action: 'Review'
    },
    {
      id: 3,
      type: 'prediction',
      title: 'Peak Usage Forecast',
      description: 'Expected 95% occupancy on Thursday based on meeting bookings',
      severity: 'success',
      timestamp: '6 hours ago',
      action: 'Prepare'
    }
  ];

  const recommendations = [
    {
      id: 1,
      title: 'Desk Reallocation',
      description: 'Move 3 desks from Engineering to Sales area to balance utilization',
      impact: 'High',
      effort: 'Medium',
      savings: '$2,400/month'
    },
    {
      id: 2,
      title: 'Meeting Room Optimization',
      description: 'Convert small meeting room to phone booths for better space efficiency',
      impact: 'Medium',
      effort: 'Low',
      savings: '$800/month'
    },
    {
      id: 3,
      title: 'Flexible Seating',
      description: 'Implement hot-desking for remote workers to reduce space requirements',
      impact: 'High',
      effort: 'High',
      savings: '$5,200/month'
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'warning': return 'text-warning';
      case 'success': return 'text-success';
      case 'error': return 'text-error';
      default: return 'text-primary';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'warning': return 'AlertTriangle';
      case 'success': return 'CheckCircle';
      case 'error': return 'XCircle';
      default: return 'Info';
    }
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'High': return 'text-success';
      case 'Medium': return 'text-warning';
      case 'Low': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Lightbulb" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Smart Insights</h3>
        </div>
        <div className="flex items-center bg-muted rounded-lg p-1">
          <Button
            variant={activeTab === 'insights' ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab('insights')}
          >
            Insights
          </Button>
          <Button
            variant={activeTab === 'recommendations' ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab('recommendations')}
          >
            Recommendations
          </Button>
        </div>
      </div>
      <div className="space-y-4">
        {activeTab === 'insights' ? (
          <>
            {insights?.map((insight) => (
              <div key={insight?.id} className="border border-border rounded-lg p-4 hover:bg-muted/20 transition-smooth">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Icon 
                      name={getSeverityIcon(insight?.severity)} 
                      size={16} 
                      className={getSeverityColor(insight?.severity)} 
                    />
                    <span className="text-sm font-medium text-foreground">{insight?.title}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{insight?.timestamp}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{insight?.description}</p>
                <div className="flex items-center justify-between">
                  <span className={`text-xs px-2 py-1 rounded-full bg-${insight?.severity}/10 ${getSeverityColor(insight?.severity)}`}>
                    {insight?.type?.charAt(0)?.toUpperCase() + insight?.type?.slice(1)}
                  </span>
                  <Button variant="outline" size="sm">
                    {insight?.action}
                  </Button>
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            {recommendations?.map((rec) => (
              <div key={rec?.id} className="border border-border rounded-lg p-4 hover:bg-muted/20 transition-smooth">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-sm font-medium text-foreground">{rec?.title}</h4>
                  <span className="text-xs font-medium text-success">{rec?.savings}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{rec?.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-xs">
                    <div className="flex items-center space-x-1">
                      <span className="text-muted-foreground">Impact:</span>
                      <span className={getImpactColor(rec?.impact)}>{rec?.impact}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="text-muted-foreground">Effort:</span>
                      <span className={getImpactColor(rec?.effort)}>{rec?.effort}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" iconName="ArrowRight" iconPosition="right">
                    Implement
                  </Button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      {/* Action Buttons */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            AI-powered insights updated every 30 minutes
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="Download">
              Export
            </Button>
            <Button variant="default" size="sm" iconName="Zap">
              Generate Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightsPanel;