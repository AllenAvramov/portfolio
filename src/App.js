import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import PortfolioPage from './Pages/PortfolioPage';
import AdminPage from './Pages/AdminPage';
import AboutPage from './Pages/AboutPage';
import ContactPage from './Pages/ContactPage';
import SkillsPage from './Pages/SkillsPage';
import NavBar from './Components/NavBar/NavBar';
import AdminLogin from './Components/AdminLogin';
import ProtectedRoute from './Components/Guards/ProtectedRoute';
import ManageProjectsPage from './Pages/ManageProjectsPage';
import ViewMessagesPage from './Pages/ViewMessagesPage';
import AdminSettingsPage from './Pages/AdminSettingsPage';
import EditProjectPage from './Pages/EditProjectPage';
import AdminDashboardPage from './Pages/AdminDashboardPage';


function AppRoutes() {
  const location = useLocation();
  const isMaintenance = localStorage.getItem('maintenanceMode') === 'true';

  const allowedDuringMaintenance = [
    '/admin',
    '/admin/login',
    '/admin/settings',
    '/admin/projects',
    '/admin/messages',
  ];

  const isAllowed = allowedDuringMaintenance.some((path) =>
    location.pathname.startsWith(path)
  );

  if (isMaintenance && !isAllowed) {
    return (
      <>
        <NavBar />
        <div style={{ padding: '50px', textAlign: 'center', fontSize: '1.5rem' }}>
        The site is currently under maintenance. We will be back online shortly!
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<PortfolioPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/projects" element={<ProtectedRoute><ManageProjectsPage /></ProtectedRoute>} />
        <Route path="/admin/messages" element={<ProtectedRoute><ViewMessagesPage /></ProtectedRoute>} />
        <Route path="/admin/settings" element={<ProtectedRoute><AdminSettingsPage /></ProtectedRoute>} />
        <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboardPage /></ProtectedRoute>} />
        <Route path="/admin/projects/edit/:id" element={<ProtectedRoute><EditProjectPage /></ProtectedRoute>} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
