import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import DoctorList from './DoctorList';
import BookingForm from './BookingForm';
import AppointmentList from './AppointmentList';

export default function PatientDashboard() {
  const [genderFilter, setGenderFilter] = useState('All');
  const navigate = useNavigate();
  const location = useLocation();

  const getUsername = () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return 'Patient';
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.sub;
    } catch {
      return 'Patient';
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === `/patient-dashboard${path}` || (path === '' && location.pathname === '/patient-dashboard');
  };

  return (
    <div className="dashboard-layout">
      <div className="sidebar">
        <div className="sidebar-header">
           <div className="sidebar-logo">
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
           </div>
           <h3 style={{ margin: 0, fontWeight: 600 }}>MediCare</h3>
        </div>



        <div className="nav-links">
          <Link to="" className={`nav-link ${isActive('') ? 'active' : ''}`}>
             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
             Explore Providers
          </Link>
          <Link to="appointments" className={`nav-link ${isActive('/appointments') ? 'active' : ''}`}>
             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
             My Appointments
          </Link>
          <Link to="book" className={`nav-link ${isActive('/book') ? 'active' : ''}`}>
             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
             Schedule Session
          </Link>
        </div>

        <div style={{ padding: '0 1rem' }}>
          <p style={{ 
            fontSize: '0.75rem', 
            color: 'rgba(255,255,255,0.7)', 
            marginBottom: '0.8rem', 
            fontWeight: 700, 
            textTransform: 'uppercase', 
            letterSpacing: '1.2px',
            paddingLeft: '12px'
          }}>
            Filter by Gender
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {['All', 'Male', 'Female'].map(option => (
              <div 
                key={option} 
                onClick={() => setGenderFilter(option)}
                className={`nav-link ${genderFilter === option ? 'active' : ''}`}
                style={{ 
                  fontSize: '0.9rem', 
                  padding: '8px 12px',
                  opacity: 1,
                  color: genderFilter === option ? '#fff' : 'rgba(255,255,255,0.85)'
                }}
              >
                <div style={{ 
                  width: '8px', 
                  height: '8px', 
                  borderRadius: '50%', 
                  backgroundColor: genderFilter === option ? 'var(--accent-blue)' : 'rgba(255,255,255,0.2)',
                  marginRight: '12px'
                }}></div>
                {option}
              </div>
            ))}
          </div>
        </div>

        <button className="nav-link logout-btn-sidebar" style={{ 
           marginTop: '1rem', 
           borderTop: '1px solid rgba(255,255,255,0.1)', 
           borderRadius: 0, 
           padding: '1.5rem 1rem', 
           color: '#f87171',
           background: 'transparent'
        }} onClick={handleLogout}>
           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
           Sign Out
        </button>
      </div>


      <div className="content-area">
        <div className="dashboard-header">
          <h1 style={{textTransform: 'capitalize'}}>Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 18 ? 'Afternoon' : 'Evening'}, {getUsername()}</h1>
          <p>Your master portal for healthcare coordination | {new Date().toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}</p>
        </div>
        
        <Routes>
          <Route path="" element={<DoctorList genderFilter={genderFilter} setGenderFilter={setGenderFilter} />} />
          <Route path="book" element={<BookingForm />} />
          <Route path="appointments" element={<AppointmentList />} />
        </Routes>
      </div>
    </div>
  );
}
