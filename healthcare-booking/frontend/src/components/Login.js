import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import client from '../api/client';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role === 'admin') navigate('/admin-dashboard');
    else if (role === 'patient') navigate('/patient-dashboard');
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await client.post('/auth/login', { username, password });
      localStorage.setItem('token', res.data.access_token);
      localStorage.setItem('role', res.data.role);
      if (res.data.role === 'admin') navigate('/admin-dashboard');
      else navigate('/patient-dashboard');
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed');
      setTimeout(() => setError(''), 4000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <div className="auth-logo-box">
           <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
        </div>
        <h1>MediCare</h1>
      </div>
      <div className="auth-right">
        <div className="auth-card">
          <h2>Welcome back</h2>
          <p className="subtitle">Sign in to continue your wellness journey</p>
          {error && <div className="alert error">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Enter your username"
                value={username} 
                onChange={e => setUsername(e.target.value)} 
                required 
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input 
                type="password" 
                className="form-control" 
                placeholder="Enter your password"
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                required 
              />
            </div>
            <button type="submit" className="btn" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in \u2192'}
            </button>
          </form>
          <Link to="/register" className="auth-link">
            Don't have an account? <span>Get started</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
