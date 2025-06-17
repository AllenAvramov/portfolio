import React, { useState } from 'react';
import './AdminLogin.css';

function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    const res = await axios.post('https://server-l1gu.onrender.com/api/login', {
      username,
      password
    });

    localStorage.setItem('token', res.data.token);
    onLogin?.();
  } catch (err) {
    if (err.response) {
      alert(err.response.data.message || 'Login failed');
    } else {
      console.error('Login error:', err);
      alert('Server error');
    }
  }
};

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <div className="admin-login-avatar">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="white">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 1115 0v.75H4.5v-.75z" />
          </svg>
        </div>
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit} className="admin-login-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
