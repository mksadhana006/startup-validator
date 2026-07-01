import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Context Providers
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { ReportProvider } from './context/ReportContext';

// Route Guard
import ProtectedRoute from './routes/ProtectedRoute';

// Layouts
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Public Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';

// Protected Pages
import Dashboard from './pages/Dashboard';
import StartupForm from './pages/StartupForm';
import ValidationReport from './pages/ValidationReport';
import ReportHistory from './pages/ReportHistory';
import Profile from './pages/Profile';

// Fallback Page
import NotFound from './pages/NotFound';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          <ReportProvider>
            <BrowserRouter>
              <Routes>
                {/* Public Route Group */}
                <Route path="/" element={<MainLayout />}>
                  <Route index element={<LandingPage />} />
                  <Route path="login" element={<Login />} />
                  <Route path="register" element={<Register />} />
                </Route>

                {/* Protected Dashboard Route Group */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <DashboardLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Dashboard />} />
                  <Route path="submit" element={<StartupForm />} />
                  <Route path="report/:id" element={<ValidationReport />} />
                  <Route path="history" element={<ReportHistory />} />
                  <Route path="profile" element={<Profile />} />
                </Route>

                {/* Fallback Error 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </ReportProvider>
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
