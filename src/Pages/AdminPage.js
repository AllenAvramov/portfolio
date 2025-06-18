import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPage.css';
import AdminLogin from '../Components/AdminLogin';
import { isTokenExpired } from '../utils/auth'; 

function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

useEffect(() => {
  const token = localStorage.getItem('token');

  if (!token || isTokenExpired(token)) {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  } else {
    setIsAuthenticated(true);
  }
}, []);


  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  const actions = [
    {
      title: "Manage Projects 📂",
      description: "Edit, delete or add new projects to your portfolio.",
      path: "/admin/projects"
    },
    {
      title: "View Messages 📬",
      description: "Check messages sent via the contact form.",
      path: "/admin/messages"
    },
    {
      title: "Dashboard 📊",
      description: "View statistics and analytics of your portfolio.",
      path: "/admin/dashboard"
    },
    {
      title: "Settings 🛠",
      description: "Update profile info, change theme and more.",
      path: "/admin/settings"
    }
  ];

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div className="admin-page container py-5 position-relative">
      <button
        className="btn btn-outline-danger position-absolute top-0 end-0 m-4"
        onClick={handleLogout}
      >
        Logout
      </button>

      <h2 className="text-center mb-5">Admin Dashboard</h2>
      <div className="row g-4 justify-content-center">
        {actions.map((action, i) => (
          <div key={i} className="col-md-4">
            <div className="admin-card shadow-sm p-4 h-100 text-center">
              <h4 className="mb-3">{action.title}</h4>
              <p className="text-muted">{action.description}</p>
              <button
                className="btn btn-outline-primary mt-3"
                onClick={() => navigate(action.path)}
              >
                Go
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPage;
