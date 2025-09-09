import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';

// Context
import { AuthProvider } from './contexts/AuthContext';

// Layout Components
import AdminLayout from './components/layout/AdminLayout';
import AuthLayout from './components/layout/AuthLayout';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

// Dashboard Pages
import DashboardHome from './pages/dashboard/DashboardHome';
import ProductsPage from './pages/dashboard/ProductsPage';
import AddProductPage from './pages/dashboard/AddProductPage';
import EditProductPage from './pages/dashboard/EditProductPage';
import AdvertisementsPage from './pages/dashboard/AdvertisementsPage';
import AddAdPage from './pages/dashboard/AddAdPage';
import EditAdPage from './pages/dashboard/EditAdPage';
import AnalyticsPage from './pages/dashboard/AnalyticsPage';
import SettingsPage from './pages/dashboard/SettingsPage';
import ImageAnalysisPage from './pages/dashboard/ImageAnalysisPage';

// Protected Route Component
import ProtectedRoute from './components/auth/ProtectedRoute';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <AuthProvider>
          <Router>
            <div className="min-h-screen bg-admin-50">
              {/* Toast Notifications */}
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: '#ffffff',
                    color: '#1e293b',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                  },
                  success: {
                    iconTheme: {
                      primary: '#10b981',
                      secondary: '#ffffff',
                    },
                  },
                  error: {
                    iconTheme: {
                      primary: '#ef4444',
                      secondary: '#ffffff',
                    },
                  },
                }}
              />
              
              <Routes>
                {/* Auth Routes */}
                <Route path="/auth/*" element={
                  <AuthLayout>
                    <Routes>
                      <Route path="login" element={<LoginPage />} />
                      <Route path="register" element={<RegisterPage />} />
                      <Route path="*" element={<Navigate to="/auth/login" replace />} />
                    </Routes>
                  </AuthLayout>
                } />
                
                {/* Dashboard Routes */}
                <Route path="/dashboard/*" element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <Routes>
                        <Route path="" element={<DashboardHome />} />
                        <Route path="products" element={<ProductsPage />} />
                        <Route path="products/add" element={<AddProductPage />} />
                        <Route path="products/edit/:id" element={<EditProductPage />} />
                        <Route path="ads" element={<AdvertisementsPage />} />
                        <Route path="ads/add" element={<AddAdPage />} />
                        <Route path="ads/edit/:id" element={<EditAdPage />} />
                        <Route path="analytics" element={<AnalyticsPage />} />
                        <Route path="image-analysis" element={<ImageAnalysisPage />} />
                        <Route path="settings" element={<SettingsPage />} />
                      </Routes>
                    </AdminLayout>
                  </ProtectedRoute>
                } />
                
                {/* Default redirect */}
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </div>
          </Router>
        </AuthProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
