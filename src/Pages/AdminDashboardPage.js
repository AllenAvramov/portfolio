import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboardPage.css';

function AdminDashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-page container py-5">
      <button
        className="btn btn-outline-secondary mb-4"
        onClick={() => navigate('/admin')}
      >
        ← Back to Admin
      </button>

      <h2>Admin Dashboard</h2>

      <div className="dashboard-cards">
        <div className="card metric-card">
          <h4>Total Visits</h4>
          <p className="value">--</p>
        </div>
      </div>

      <div className="dashboard-graphs">
        <div className="graph-card">
          <h4>Projects Added - Last Month</h4>
          {/* Pie chart goes here */}
        </div>
        <div className="graph-card">
          <h4>Clicks Per Project</h4>
          {/* Bar chart goes here */}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardPage;
