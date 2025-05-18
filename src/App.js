import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import PortfolioPage from './Pages/PortfolioPage';
import AdminPage from './Pages/AdminPage';
import AboutPage from './Pages/AboutPage';
import ContactPage from './Pages/ContactPage';
import SkillsPage from './Pages/SkillsPage';
import NavBar from './Components/NavBar';

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
      </Routes>
    </Router>
  );
}

export default App;
