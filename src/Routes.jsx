import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import VisitorIdentification from './pages/visitor-identification';
import WelcomeScreen from './pages/welcome-screen';
import FaceConfirmation from './pages/face-confirmation';
import NewVisitorRegistration from './pages/new-visitor-registration';
import DetailsConfirmation from './pages/details-confirmation';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<DetailsConfirmation />} />
        <Route path="/visitor-identification" element={<VisitorIdentification />} />
        <Route path="/welcome-screen" element={<WelcomeScreen />} />
        <Route path="/face-confirmation" element={<FaceConfirmation />} />
        <Route path="/new-visitor-registration" element={<NewVisitorRegistration />} />
        <Route path="/details-confirmation" element={<DetailsConfirmation />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
