import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import WelcomeHeader from './components/WelcomeHeader';
import WorkspaceCard from './components/WorkspaceCard';
import ActionButtons from './components/ActionButtons';
import StatusIndicator from './components/StatusIndicator';

const WelcomeCheckIn = () => {
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);

  // Mock employee data
  const mockEmployees = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      department: "Engineering",
      workspace: {
        deskNumber: "A-42",
        zone: "Quiet Zone",
        floor: "2nd Floor",
        amenities: ["Dual Monitor", "Standing Desk", "Natural Light", "Power Outlet"]
      }
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.chen@company.com",
      department: "Design",
      workspace: {
        deskNumber: "B-18",
        zone: "Collaboration Zone",
        floor: "3rd Floor",
        amenities: ["Dual Monitor", "Whiteboard", "Phone Booth", "Power Outlet"]
      }
    }
  ];

  useEffect(() => {
    // Simulate employee authentication - in demo mode, cycle between employees
    const employeeIndex = isDemoMode ? Math.floor(Date.now() / 10000) % mockEmployees?.length : 0;
    setCurrentEmployee(mockEmployees?.[employeeIndex]);
  }, [isDemoMode]);

  const handleDemoToggle = () => {
    setIsDemoMode(!isDemoMode);
  };

  if (!currentEmployee) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-8 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <WelcomeHeader employeeName={currentEmployee?.name} />
            
            <div className="flex justify-center mb-8">
              <StatusIndicator status="confirmed" />
            </div>
            
            <WorkspaceCard workspace={currentEmployee?.workspace} />
            
            <ActionButtons 
              onDemoToggle={handleDemoToggle}
              isDemoMode={isDemoMode}
            />
          </motion.div>

          {/* Employee Info Card - Demo Mode */}
          {isDemoMode && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-8 p-4 bg-muted/30 rounded-xl border border-border"
            >
              <h3 className="font-semibold text-foreground mb-2">Demo Mode - Employee Info</h3>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Name:</span>
                  <span className="ml-2 text-foreground">{currentEmployee?.name}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Department:</span>
                  <span className="ml-2 text-foreground">{currentEmployee?.department}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Email:</span>
                  <span className="ml-2 text-foreground">{currentEmployee?.email}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Floor:</span>
                  <span className="ml-2 text-foreground">{currentEmployee?.workspace?.floor}</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default WelcomeCheckIn;