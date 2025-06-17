import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminSettingsPage.css';

function AdminSettingsPage() {
  const navigate = useNavigate();

  const [contactEmail, setContactEmail] = useState('');
  const [theme, setTheme] = useState('light');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setContactEmail(localStorage.getItem('contactEmail') || '');
    const savedTheme = localStorage.getItem('themeMode');
    setTheme(savedTheme === 'dark' ? 'dark' : 'light');
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', theme === 'dark');
    localStorage.setItem('themeMode', theme);
  }, [theme]);

  const deleteAllMessages = async () => {
    if (!window.confirm('Are you sure you want to delete all messages?')) return;
    setLoading(true);
    const token = localStorage.getItem('token');
    await fetch('https://server-l1gu.onrender.com/api/admin/messages', {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    alert('All messages have been deleted.');
    setLoading(false);
  };

  const saveSettings = () => {
    localStorage.setItem('contactEmail', contactEmail);
    alert('Settings saved successfully.');
  };

  return (
    <div className="settings-page container py-5">
      <button className="back-btn" onClick={() => navigate('/admin')}>
        ← Back to Admin
      </button>

      <h2 className="text-center mb-4">Admin Settings</h2>

      <section className="settings-section">
        <h4>Communication Settings</h4>
        <label>
          Contact Email:
          <input
            type="email"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
          />
        </label>
      </section>

      <section className="settings-section">
        <h4>Appearance</h4>
        <label className="toggle-label">
          <input
            type="checkbox"
            checked={theme === 'dark'}
            onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
          />
          Enable Dark Mode
        </label>
      </section>

      <section className="settings-section">
        <h4>General Actions</h4>
        <button
          className="delete-btn"
          onClick={deleteAllMessages}
          disabled={loading}
        >
          Delete All Messages
        </button>
      </section>

      <button className="save-btn" onClick={saveSettings}>Save Settings</button>
    </div>
  );
}

export default AdminSettingsPage;
