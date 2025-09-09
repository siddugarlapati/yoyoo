import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AdvancedAnalytics = () => {
  const [activeTab, setActiveTab] = useState('optimization');

  const optimizationRecommendations = [
    {
      id: 1,
      title: 'Switch to VoIP for International Calls',
      description: 'Reduce international calling costs by 45% by migrating to VoIP solutions',
      impact: 'High',
      savings: 1850,
      effort: 'Medium',
      timeline: '2-3 months',
      icon: 'Globe',
      priority: 1
    },
    {
      id: 2,
      title: 'Implement Call Duration Limits',
      description: 'Set automatic call duration limits for non-essential departments',
      impact: 'Medium',
      savings: 680,
      effort: 'Low',
      timeline: '2 weeks',
      icon: 'Clock',
      priority: 2
    },
    {
      id: 3,
      title: 'Negotiate Better Carrier Rates',
      description: 'Renegotiate contracts with current carriers based on usage patterns',
      impact: 'High',
      savings: 2200,
      effort: 'Low',
      timeline: '1 month',
      icon: 'DollarSign',
      priority: 1
    },
    {
      id: 4,
      title: 'Deploy Unified Communications',
      description: 'Consolidate voice, video, and messaging into single platform',
      impact: 'High',
      savings: 3400,
      effort: 'High',
      timeline: '6 months',
      icon: 'MessageSquare',
      priority: 2
    }
  ];

  const unusualPatterns = [
    {
      id: 1,
      pattern: 'Spike in International Calls',
      department: 'Marketing',
      detected: '2025-09-06',
      severity: 'High',
      description: '340% increase in international calls compared to previous month',
      action: 'Investigation Required',
      icon: 'AlertTriangle'
    },
    {
      id: 2,
      pattern: 'Extended Call Durations',
      department: 'Customer Support',
      detected: '2025-09-05',
      severity: 'Medium',
      description: 'Average call duration increased by 28% in the last week',
      action: 'Monitor Trends',
      icon: 'TrendingUp'
    },
    {
      id: 3,
      pattern: 'Off-Hours Usage Surge',
      department: 'Sales',
      detected: '2025-09-04',
      severity: 'Low',
      description: 'Unusual calling activity detected between 10 PM - 6 AM',
      action: 'Policy Review',
      icon: 'Moon'
    }
  ];

  const predictiveForecasts = [
    {
      period: 'Next Month',
      predictedCost: 18450,
      confidence: 92,
      factors: ['Seasonal trends', 'Department growth', 'Usage patterns'],
      variance: '+12%'
    },
    {
      period: 'Next Quarter',
      predictedCost: 52800,
      confidence: 87,
      factors: ['Market expansion', 'New hires', 'Technology upgrades'],
      variance: '+18%'
    },
    {
      period: 'Next Year',
      predictedCost: 198600,
      confidence: 78,
      factors: ['Business growth', 'Inflation', 'Technology evolution'],
      variance: '+25%'
    }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(amount);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'High': return 'text-error bg-error/10 border-error/20';
      case 'Medium': return 'text-warning bg-warning/10 border-warning/20';
      case 'Low': return 'text-success bg-success/10 border-success/20';
      default: return 'text-muted-foreground bg-muted/10 border-border';
    }
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'High': return 'text-success bg-success/10';
      case 'Medium': return 'text-warning bg-warning/10';
      case 'Low': return 'text-muted-foreground bg-muted/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Advanced Analytics</h3>
        
        <div className="flex items-center space-x-2">
          <Button
            variant={activeTab === 'optimization' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('optimization')}
            iconName="Target"
            iconPosition="left"
          >
            Optimization
          </Button>
          <Button
            variant={activeTab === 'patterns' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('patterns')}
            iconName="Search"
            iconPosition="left"
          >
            Patterns
          </Button>
          <Button
            variant={activeTab === 'forecasts' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('forecasts')}
            iconName="TrendingUp"
            iconPosition="left"
          >
            Forecasts
          </Button>
        </div>
      </div>
      <div className="p-6">
        {activeTab === 'optimization' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">
                Potential annual savings: <span className="font-semibold text-success">{formatCurrency(8130)}</span>
              </p>
            </div>
            
            {optimizationRecommendations?.map((rec) => (
              <div key={rec?.id} className="border border-border rounded-lg p-4 hover:bg-muted/20 transition-micro">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name={rec?.icon} size={20} className="text-primary" />
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-foreground">{rec?.title}</h4>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(rec?.impact)}`}>
                          {rec?.impact} Impact
                        </span>
                        <span className="text-sm font-semibold text-success">
                          {formatCurrency(rec?.savings)}/year
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">{rec?.description}</p>
                    
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>Effort: {rec?.effort}</span>
                      <span>Timeline: {rec?.timeline}</span>
                      <span className={`px-2 py-1 rounded-full ${rec?.priority === 1 ? 'bg-error/10 text-error' : 'bg-warning/10 text-warning'}`}>
                        Priority {rec?.priority}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'patterns' && (
          <div className="space-y-4">
            {unusualPatterns?.map((pattern) => (
              <div key={pattern?.id} className="border border-border rounded-lg p-4">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name={pattern?.icon} size={20} className="text-warning" />
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-foreground">{pattern?.pattern}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(pattern?.severity)}`}>
                        {pattern?.severity}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>Department: {pattern?.department}</span>
                      <span>Detected: {pattern?.detected}</span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">{pattern?.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Recommended Action: {pattern?.action}</span>
                      <Button variant="outline" size="sm">
                        Investigate
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'forecasts' && (
          <div className="space-y-4">
            {predictiveForecasts?.map((forecast, index) => (
              <div key={index} className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-foreground">{forecast?.period}</h4>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-foreground">
                      {formatCurrency(forecast?.predictedCost)}
                    </div>
                    <div className="text-sm text-error">{forecast?.variance} vs current</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="text-muted-foreground">Confidence:</span>
                    <div className="flex items-center space-x-1">
                      <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full transition-smooth"
                          style={{ width: `${forecast?.confidence}%` }}
                        ></div>
                      </div>
                      <span className="text-foreground font-medium">{forecast?.confidence}%</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-3">
                  <p className="text-xs text-muted-foreground mb-2">Key factors:</p>
                  <div className="flex flex-wrap gap-2">
                    {forecast?.factors?.map((factor, idx) => (
                      <span key={idx} className="px-2 py-1 bg-muted/50 rounded-full text-xs text-muted-foreground">
                        {factor}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvancedAnalytics;