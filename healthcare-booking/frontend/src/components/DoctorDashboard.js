import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import client from '../api/client';

export default function DoctorDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [doctorProfile, setDoctorProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('schedule');
  const navigate = useNavigate();

  const getUsername = () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return 'Practitioner';
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.sub;
    } catch {
      return 'Practitioner';
    }
  };

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role === 'admin') {
      navigate('/admin-dashboard');
    }
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    try {
      const [apptRes, profileRes] = await Promise.allSettled([
        client.get('/appointments/'),
        client.get('/doctors/me')
      ]);

      if (apptRes.status === 'fulfilled') setAppointments(apptRes.value.data);
      if (profileRes.status === 'fulfilled') setDoctorProfile(profileRes.value.data);
      else if (profileRes.reason?.response?.status === 404) {
        console.warn('Doctor profile not found - initializing fallback');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleAvailability = async () => {
    if (!doctorProfile) return;
    const newStatus = !doctorProfile.is_available;
    try {
      const res = await client.patch('/doctors/me', { is_available: newStatus });
      setDoctorProfile(res.data);
    } catch (err) {
      alert('Failed to update availability status');
    }
  };

  const markCompleted = async (appointmentId) => {
    try {
      await client.patch(`/appointments/${appointmentId}`, { status: 'completed' });
      fetchData();
    } catch (err) {
      alert('Failed to update appointment status');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const uniquePatients = Array.from(new Set(appointments.map(a => a.patient_name))).map(name => {
    const sortedAppts = appointments
      .filter(a => a.patient_name === name)
      .sort((a, b) => new Date(b.slot) - new Date(a.slot));

    const lastSession = sortedAppts[0];
    return {
      name,
      lastSession: lastSession.slot,
      status: lastSession.status,
      id: lastSession.id
    };
  });

  return (
    <div className="dashboard-layout">
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
          </div>
          <h3 style={{ margin: 0, fontWeight: 600 }}>MediCare Hospital</h3>
        </div>

        <div className="nav-links">
          <div className={`nav-link ${activeTab === 'schedule' ? 'active' : ''}`} onClick={() => setActiveTab('schedule')}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            Schedule
          </div>
          <div className={`nav-link ${activeTab === 'patients' ? 'active' : ''}`} onClick={() => setActiveTab('patients')}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            Patients
          </div>
        </div>
        <button className="nav-link" style={{ background: 'transparent', border: 'none', color: '#fca5a5', marginTop: 'auto' }} onClick={handleLogout}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
          Sign Out
        </button>
      </div>

      <div className="content-area">
        <div className="dashboard-nav-top">
          <div className="dashboard-header" style={{ marginBottom: 0 }}>
            <h1 style={{ textTransform: 'capitalize' }}>Welcome back, {doctorProfile ? doctorProfile.name : getUsername()}</h1>
            <p>Administering to your patients today</p>
          </div>

          <div className="toggle-wrapper">
            <span className="toggle-label">{doctorProfile?.is_available ? 'Online & Available' : 'Currently Unavailable'}</span>
            <label className="switch">
              <input type="checkbox" checked={doctorProfile?.is_available || false} onChange={toggleAvailability} />
              <span className="slider"></span>
            </label>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-card-title">Today's Sessions</div>
            <div className="stat-card-value">{appointments.filter(a => new Date(a.slot).toDateString() === new Date().toDateString()).length}</div>
            <span className="badge badge-orange">Scheduled</span>
          </div>
          <div className="stat-card">
            <div className="stat-card-title">My Total Patients</div>
            <div className="stat-card-value">{uniquePatients.length}</div>
            <span className="badge badge-blue">Unique</span>
          </div>
          <div className="stat-card">
            <div className="stat-card-title">Completed Sessions</div>
            <div className="stat-card-value">{appointments.filter(a => a.status === 'completed').length}</div>
            <span className="badge badge-green">All time</span>
          </div>
        </div>

        {activeTab === 'schedule' && (
          <div className="card-section">
            <h2 className="section-title">Schedule Overview</h2>
            {loading ? (
              <div className="spinner"></div>
            ) : appointments.length === 0 ? (
              <p style={{ color: 'var(--text-light)' }}>No sessions scheduled.</p>
            ) : (
              <table className="modern-table">
                <thead>
                  <tr>
                    <th>Time Slot</th>
                    <th>Patient Name</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments
                    .sort((a, b) => new Date(a.slot) - new Date(b.slot))
                    .map(appt => {
                      const apptDate = new Date(appt.slot);
                      const isPast = apptDate < new Date();
                      return (
                        <tr key={appt.id}>
                          <td><strong>{apptDate.toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</strong></td>
                          <td style={{ textTransform: 'capitalize' }}>{appt.patient_name}</td>
                          <td>
                            <span className={`badge ${(appt.status || 'scheduled') === 'completed' ? 'badge-green' : (isPast ? 'badge-blue' : 'badge-orange')}`}>
                              {(appt.status || 'scheduled').charAt(0).toUpperCase() + (appt.status || 'scheduled').slice(1)}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            )}
          </div>
        )}

        {activeTab === 'patients' && (
          <div className="card-section">
            <h2 className="section-title">My Patient Directory</h2>
            {uniquePatients.length === 0 ? (
              <p style={{ color: 'var(--text-light)' }}>No patients have booked with you yet.</p>
            ) : (
              <table className="modern-table">
                <thead>
                  <tr>
                    <th>Patient Name</th>
                    <th>Most Recent Session</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {uniquePatients.map(p => (
                    <tr key={p.name}>
                      <td style={{ textTransform: 'capitalize' }}><strong>{p.name}</strong></td>
                      <td>{new Date(p.lastSession).toLocaleDateString()}</td>
                      <td>
                        <span className={`badge ${(p.status || 'scheduled') === 'completed' ? 'badge-green' : 'badge-orange'}`}>
                          {(p.status || 'scheduled').charAt(0).toUpperCase() + (p.status || 'scheduled').slice(1)}
                        </span>
                      </td>
                      <td>
                        {p.status !== 'completed' ? (
                          <button
                            className="btn"
                            style={{ padding: '0.4rem 0.8rem', width: 'auto', fontSize: '0.8rem' }}
                            onClick={() => markCompleted(p.id)}
                          >
                            Mark Completed
                          </button>
                        ) : (
                          <span style={{ fontSize: '0.8rem', color: 'var(--accent-green)', fontWeight: 600 }}>✓ Done</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
