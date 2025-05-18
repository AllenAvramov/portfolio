import React from 'react';
import './AdminPage.css';

function AdminPage() {
  const actions = [
    { title: " Manage Projects 📂", description: "Edit, delete or add new projects to your portfolio." },
    { title: "View Messages 📬", description: "Check messages sent via the contact form." },
    { title: "Settings 🛠", description: "Update profile info, change theme and more." }
  ];

  return (
    <div className="admin-page container py-5">
      <h2 className="text-center mb-5">Admin Dashboard</h2>
      <div className="row g-4 justify-content-center">
        {actions.map((action, i) => (
          <div key={i} className="col-md-4">
            <div className="admin-card shadow-sm p-4 h-100 text-center">
              <h4 className="mb-3">{action.title}</h4>
              <p className="text-muted">{action.description}</p>
              <button className="btn btn-outline-primary mt-3">Go</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPage;
