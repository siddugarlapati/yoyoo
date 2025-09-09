import React from 'react';
import Header from '../../components/ui/Header';
import LoginForm from './components/LoginForm';

const EmployeeLogin = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <Header 
        showBackButton={true} 
        backButtonPath="/employee-auth-selection" 
      />

      {/* Main Content */}
      <main className="pt-16">
        <div className="min-h-screen flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-md">
            <LoginForm />
          </div>
        </div>
      </main>

      {/* Background Pattern */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-emerald-100 rounded-full opacity-20"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-emerald-100 rounded-full opacity-20"></div>
      </div>
    </div>
  );
};

export default EmployeeLogin;