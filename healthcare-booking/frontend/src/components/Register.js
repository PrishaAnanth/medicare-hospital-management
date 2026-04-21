import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import client from '../api/client';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('patient');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await client.post('/auth/register', { username, password, role });
      localStorage.setItem('token', res.data.access_token);
      localStorage.setItem('role', res.data.role);
      if (res.data.role === 'admin') navigate('/admin-dashboard');
      else navigate('/patient-dashboard');
    } catch (err) {
      if (Array.isArray(err.response?.data?.detail)) {
         setError(err.response.data.detail[0].msg);
      } else {
         setError(err.response?.data?.detail || 'Registration failed');
      }
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
          <h2>Create an Account</h2>
          <p className="subtitle">Join MediCare to begin</p>
          {error && <div className="alert error">{error}</div>}
          
          <div className="role-toggle">
             <div className={`role-option ${role === 'admin' ? 'active' : ''}`} onClick={() => setRole('admin')}>
                 <strong>Hospital Admin</strong><br/><small>Central Oversight</small>
             </div>
             <div className={`role-option ${role === 'patient' ? 'active' : ''}`} onClick={() => setRole('patient')}>
                 <strong>Patient</strong><br/><small>Book appointments</small>
             </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Choose a username"
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
                placeholder="Create a password"
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                required 
              />
            </div>
            <button type="submit" className="btn" disabled={loading}>
              {loading ? 'Creating...' : 'Register \u2192'}
            </button>
          </form>
          <Link to="/login" className="auth-link">
            Already have an account? <span>Sign in</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
