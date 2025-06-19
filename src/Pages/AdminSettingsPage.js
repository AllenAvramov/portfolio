import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminSettingsPage() {
  const navigate = useNavigate();

  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('themeMode') === 'dark';
  });

  const [maintenanceMode, setMaintenanceMode] = useState(() => {
    return localStorage.getItem('maintenanceMode') === 'true';
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('themeMode', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    localStorage.setItem('maintenanceMode', maintenanceMode);
  }, [maintenanceMode]);

  const deleteAllMessages = async () => {
    if (!window.confirm('Are you sure you want to delete all messages?')) return;
    setLoading(true);
    const token = localStorage.getItem('token');

    try {
      await axios.delete('https://server-l1gu.onrender.com/api/admin/messages', {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert('All messages have been deleted.');
    } catch (err) {
      console.error('Error deleting messages:', err);
      alert('Failed to delete messages.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <button className="btn btn-outline-secondary mb-4" onClick={() => navigate('/admin')}>
        ← Back to Admin
      </button>

      <h2 className="text-center mb-5">Admin Settings</h2>

      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm mb-4">
            <div className="card-body text-center">
              <h5 className="card-title mb-3">Dark Mode</h5>
              <div className="form-check form-switch d-flex justify-content-center">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={isDark}
                  onChange={() => setIsDark(!isDark)}
                  id="darkModeSwitch"
                />
                <label className="form-check-label ms-2" htmlFor="darkModeSwitch">
                  Enable Dark Mode
                </label>
              </div>
            </div>
          </div>

          <div className="card shadow-sm mb-4">
            <div className="card-body text-center">
              <h5 className="card-title mb-3">Maintenance Mode</h5>
              <div className="form-check form-switch d-flex justify-content-center">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={maintenanceMode}
                  onChange={(e) => setMaintenanceMode(e.target.checked)}
                  id="maintenanceSwitch"
                />
                <label className="form-check-label ms-2" htmlFor="maintenanceSwitch">
                  Enable Maintenance Mode
                </label>
              </div>
            </div>
          </div>

          <div className="card shadow-sm mb-4">
            <div className="card-body text-center">
              <h5 className="card-title mb-3">Admin Actions</h5>
              <button
                className="btn btn-danger"
                onClick={deleteAllMessages}
                disabled={loading}
              >
                {loading ? 'Deleting...' : 'Delete All Messages'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSettingsPage;
