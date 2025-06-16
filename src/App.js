import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
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

function App() {
  return (
    <Router>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<PortfolioPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>}/>
        <Route path="/admin/projects"   element={<ProtectedRoute><ManageProjectsPage /></ProtectedRoute>} />
        <Route path="/admin/messages" element={<ProtectedRoute><ViewMessagesPage /></ProtectedRoute>} />
        <Route path="/admin/settings" element={<ProtectedRoute><AdminSettingsPage /></ProtectedRoute>} />
        
      </Routes>
    </Router>
  );
}

export default App;
