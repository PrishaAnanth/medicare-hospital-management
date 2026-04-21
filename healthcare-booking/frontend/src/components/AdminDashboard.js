import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import client from '../api/client';

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('doctors');
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    if (loading && feedbacks.length > 0) return;

    setLoading(true);
    try {
      const [apptRes, docRes, feedRes] = await Promise.all([
        client.get('/appointments/'),
        client.get('/doctors/'),
        client.get('/feedbacks/').catch(() => ({ data: [] }))
      ]);
      setAppointments(apptRes.data);
      setDoctors(docRes.data);
      setFeedbacks(feedRes.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleDoctorAvailability = async (docId, currentStatus) => {
    try {
      await client.patch(`/doctors/${docId}`, { is_available: !currentStatus });
      fetchData();
    } catch (err) {
      alert('Failed to update doctor status');
    }
  };

  const updateStatus = async (appointmentId, newStatus) => {
    try {
      await client.patch(`/appointments/${appointmentId}`, { status: newStatus });
      fetchData();
    } catch (err) {
      alert('Failed to update session status');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const getDoctorName = (id) => {
    return doctors.find(d => Number(d.id) === Number(id))?.name || 'Unknown Doctor';
  };

  return (
    <div className="dashboard-layout">
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo" style={{ color: 'var(--accent-orange)' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>
          </div>
          <h3 style={{ margin: 0, fontWeight: 700 }}>Hospital Admin</h3>
        </div>



        <div className="nav-links">
          <div className={`nav-link ${activeTab === 'doctors' ? 'active' : ''}`} onClick={() => setActiveTab('doctors')}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            Manage Doctors
          </div>
          <div className={`nav-link ${activeTab === 'schedule' ? 'active' : ''}`} onClick={() => setActiveTab('schedule')}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            Master Schedule
          </div>
          <div className={`nav-link ${activeTab === 'feedbacks' ? 'active' : ''}`} onClick={() => setActiveTab('feedbacks')}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            Doctor Feedbacks
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
        <div className="dashboard-nav-top">
          <div className="dashboard-header" style={{ marginBottom: 0 }}>
            <h1>Hospital Control Center</h1>
            <p>Welcome back, Hospital Admin | Master oversight of all practitioners</p>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-card-title">Hospital Fleet</div>
            <div className="stat-card-value">{doctors.length}</div>
            <span className="badge badge-green">Practitioners</span>
          </div>

          <div className="stat-card">
            <div className="stat-card-title">Upcoming Load</div>
            <div className="stat-card-value">
              {appointments.filter(a => a.status === 'scheduled').length}
            </div>
            <span className="badge badge-orange">Next Patients</span>
          </div>

          <div className="stat-card">
            <div className="stat-card-title">Completed Work</div>
            <div className="stat-card-value">
              {appointments.filter(a => a.status === 'completed').length}
            </div>
            <span className="badge badge-blue">Bills Settled</span>
          </div>
        </div>

        {activeTab === 'doctors' && (
          <div className="card-section">
            <h2 className="section-title">Practitioner Management</h2>
            {loading ? <div className="spinner"></div> : (
              <table className="modern-table">
                <thead>
                  <tr>
                    <th>Doctor Name</th>
                    <th>Specialization</th>
                    <th>Avg Rating</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {doctors.map(doc => {
                    const docFeedbacks = feedbacks.filter(f => Number(f.doctor_id) === Number(doc.id));
                    const avgRating = docFeedbacks.length > 0
                      ? (docFeedbacks.reduce((a, b) => a + Number(b.rating), 0) / docFeedbacks.length).toFixed(1)
                      : 'N/A';

                    return (
                      <tr key={doc.id}>
                        <td><strong>{doc.name}</strong></td>
                        <td>{doc.specialization}</td>
                        <td>
                          <span style={{ color: '#fbbf24', fontWeight: 600 }}>
                            {avgRating !== 'N/A' ? `★ ${avgRating}` : 'No ratings'}
                          </span>
                        </td>
                        <td>
                          <span className={`badge ${doc.is_available ? 'badge-green' : ''}`} style={!doc.is_available ? { backgroundColor: '#f1f5f9', color: '#64748b' } : {}}>
                            {doc.is_available ? 'Online' : 'Offline'}
                          </span>
                        </td>
                        <td>
                          <label className="switch">
                            <input type="checkbox" checked={doc.is_available} onChange={() => toggleDoctorAvailability(doc.id, doc.is_available)} />
                            <span className="slider"></span>
                          </label>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>

              </table>
            )}
          </div>
        )}

        {activeTab === 'schedule' && (
          <div className="card-section">
            <h2 className="section-title">Master Appointment Schedule</h2>
            {loading ? <div className="spinner"></div> : appointments.length === 0 ? (
              <p style={{ color: 'var(--text-light)' }}>No sessions across the hospital today.</p>
            ) : (
              <table className="modern-table">
                <thead>
                  <tr>
                    <th>Practitioner</th>
                    <th>Patient</th>
                    <th>Time Slot</th>
                    <th>Status</th>
                    <th>Admin Action</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments
                    .sort((a, b) => {
                      const statusPriority = { 'scheduled': 0, 'treatment_over': 1, 'completed': 2 };
                      if (statusPriority[a.status] !== statusPriority[b.status]) {
                        return statusPriority[a.status] - statusPriority[b.status];
                      }
                      return a.status === 'completed'
                        ? new Date(b.slot) - new Date(a.slot)
                        : new Date(a.slot) - new Date(b.slot);
                    })
                    .map(appt => (
                      <tr key={appt.id}>
                        <td><strong>{getDoctorName(appt.doctor_id)}</strong></td>
                        <td style={{ textTransform: 'capitalize' }}>{appt.patient_name}</td>
                        <td>{new Date(appt.slot).toLocaleString()}</td>
                        <td>
                          <span className={`badge ${appt.status === 'completed' ? 'badge-green' :
                              appt.status === 'treatment_over' ? 'badge-blue' : 'badge-orange'
                            }`}>
                            {appt.status === 'treatment_over' ? 'Treatment Over' :
                              appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                          </span>
                        </td>
                        <td>
                          {appt.status === 'scheduled' ? (
                            <button className="btn" style={{ padding: '0.4rem 0.8rem', width: 'auto', fontSize: '0.8rem' }} onClick={() => updateStatus(appt.id, 'treatment_over')}>
                              Confirm Treatment
                            </button>
                          ) : appt.status === 'treatment_over' ? (
                            <button className="btn" style={{ padding: '0.4rem 0.8rem', width: 'auto', fontSize: '0.8rem', backgroundColor: '#3b82f6' }} onClick={() => updateStatus(appt.id, 'completed')}>
                              Settle Bill
                            </button>
                          ) : (
                            <span style={{ color: 'var(--accent-green)', fontWeight: 600 }}>Billed & Paid ✓</span>
                          )}
                        </td>

                      </tr>
                    ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {activeTab === 'feedbacks' && (
          <div className="card-section">
            <h2 className="section-title">Practitioner Feedback Monitoring</h2>
            {loading ? <div className="spinner"></div> : feedbacks.length === 0 ? (
              <p style={{ color: 'var(--text-light)' }}>No patient reviews yet.</p>
            ) : (
              <table className="modern-table">
                <thead>
                  <tr>
                    <th>Doctor</th>
                    <th>Patient</th>
                    <th>Rating</th>
                    <th>Comment</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {feedbacks
                    .sort((a, b) => {
                      const dateA = a.created_at ? new Date(a.created_at) : new Date(0);
                      const dateB = b.created_at ? new Date(b.created_at) : new Date(0);
                      return dateB - dateA;
                    })
                    .map(feed => (

                      <tr key={feed.id}>
                        <td><strong>{getDoctorName(feed.doctor_id)}</strong></td>
                        <td style={{ textTransform: 'capitalize' }}>{feed.patient_name}</td>
                        <td>
                          <span style={{ color: '#fbbf24', fontWeight: 'bold' }}>
                            {'★'.repeat(feed.rating)}{'☆'.repeat(5 - feed.rating)}
                          </span>
                        </td>
                        <td style={{ fontStyle: 'italic' }}>"{feed.comment}"</td>
                        <td>{new Date(feed.created_at).toLocaleDateString()}</td>
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
