import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import BookingConfirmation from './pages/booking-confirmation';
import HotDeskSelection from './pages/hot-desk-selection';
import WelcomeCheckIn from './pages/welcome-check-in';
import CheckInComplete from './pages/check-in-complete';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<BookingConfirmation />} />
        <Route path="/booking-confirmation" element={<BookingConfirmation />} />
        <Route path="/hot-desk-selection" element={<HotDeskSelection />} />
        <Route path="/welcome-check-in" element={<WelcomeCheckIn />} />
        <Route path="/check-in-complete" element={<CheckInComplete />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
