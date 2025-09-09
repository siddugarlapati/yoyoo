import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import WorkspaceAnalyticsDashboard from './pages/workspace-analytics-dashboard';
import TelephonyCostAnalysisDashboard from './pages/telephony-cost-analysis-dashboard';
import VisitorMeetingRoomAnalytics from './pages/visitor-meeting-room-analytics';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<TelephonyCostAnalysisDashboard />} />
        <Route path="/workspace-analytics-dashboard" element={<WorkspaceAnalyticsDashboard />} />
        <Route path="/telephony-cost-analysis-dashboard" element={<TelephonyCostAnalysisDashboard />} />
        <Route path="/visitor-meeting-room-analytics" element={<VisitorMeetingRoomAnalytics />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
