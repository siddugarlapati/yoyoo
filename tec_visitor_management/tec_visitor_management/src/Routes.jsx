import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import VisitorInformationDisplay from './pages/visitor-information-display';
import HostNotificationPopup from './pages/host-notification-popup';
import WelcomePage from './pages/welcome-page';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<HostNotificationPopup />} />
        <Route path="/visitor-information-display" element={<VisitorInformationDisplay />} />
        <Route path="/host-notification-popup" element={<HostNotificationPopup />} />
        <Route path="/welcome-page" element={<WelcomePage />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
