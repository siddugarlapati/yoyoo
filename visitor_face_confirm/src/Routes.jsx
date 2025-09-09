import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import VisitorIdentityConfirmation from './pages/visitor-identity-confirmation';
import VisitorDetailsConfirm from './pages/2c-visitor-details-confirm';
import VisitorIdentification from './pages/2a-visitor-identification';
import WaitingForHost from './pages/4-waiting-for-host';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<VisitorIdentityConfirmation />} />
        <Route path="/visitor-identity-confirmation" element={<VisitorIdentityConfirmation />} />
        <Route path="/visitor-identification" element={<VisitorIdentification />} />
        <Route path="/2a-visitor-identification" element={<VisitorIdentification />} />
        <Route path="/2c-visitor-details-confirm" element={<VisitorDetailsConfirm />} />
        <Route path="/waiting-for-host" element={<WaitingForHost />} />
        <Route path="/4-waiting-for-host" element={<WaitingForHost />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;