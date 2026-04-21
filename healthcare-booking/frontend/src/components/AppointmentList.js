import React, { useState, useEffect } from 'react';
import client from '../api/client';

export default function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ratings, setRatings] = useState({});
  const [showReceipt, setShowReceipt] = useState(null);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [apptRes, docRes] = await Promise.all([
        client.get('/appointments/'),
        client.get('/doctors/')
      ]);
      setAppointments(apptRes.data);
      setDoctors(docRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this session?')) return;
    try {
      await client.delete(`/appointments/${id}`);
      setAppointments(appointments.filter(a => a.id !== id));
    } catch (err) {
      alert(err.response?.data?.detail || 'Failed to cancel appointment');
    }
  };

  const getDoctorName = (id) => {
    return doctors.find(d => d.id === id)?.name || 'Unknown Practitioner';
  };

  if (loading) return <div className="spinner"></div>;

  const handleFeedback = async (docId, apptId) => {
        const { rating, comment } = ratings[apptId] || {};
        if (!rating) return alert('Please select a rating');
        try {
          await client.post('/feedbacks/', { doctor_id: docId, rating: parseInt(rating), comment: comment || '' });
          alert('Thank you for your feedback! It helps us monitor care quality.');
          setRatings(prev => ({ ...prev, [apptId]: { ...prev[apptId], submitted: true } }));
        } catch (err) {
          alert('Failed to submit feedback');
        }
      };

      return (
        <div className="card-section">
          <h2 className="section-title">My Appointments</h2>
          {appointments.length === 0 ? (
            <p style={{ color: 'var(--text-light)' }}>You have no upcoming appointments mapped to your journey.</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table className="modern-table">
                <thead>
                  <tr>
                    <th>Practitioner</th>
                    <th>Date & Time</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map(appt => {
                     const apptDate = new Date(appt.slot);
                     const isPast = apptDate < new Date() || appt.status === 'completed';
                     const hasSubmitted = ratings[appt.id]?.submitted;

                     return (
                       <tr key={appt.id}>
                         <td><strong>{getDoctorName(appt.doctor_id)}</strong></td>
                         <td>{apptDate.toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</td>
                         <td>
                            <span className={`badge ${isPast ? 'badge-green' : 'badge-orange'}`}>
                               {isPast ? 'Completed' : 'Upcoming'}
                            </span>
                         </td>
                         <td>
                           {!isPast ? (
                             <div style={{ display: 'flex', gap: '0.5rem' }}>
                               <button className="btn" style={{ padding: '0.4rem 0.8rem', backgroundColor: '#ef4444', fontSize: '0.8rem', width: 'auto' }} onClick={() => handleCancel(appt.id)}>
                                 Cancel
                               </button>
                               <button className="btn" style={{ padding: '0.4rem 0.8rem', backgroundColor: '#3b82f6', fontSize: '0.8rem', width: 'auto' }} onClick={() => setShowReceipt(appt)}>
                                 View Slip
                               </button>
                             </div>
                           ) : !hasSubmitted ? (
                             <div className="feedback-form" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                <select 
                                  style={{ padding: '0.2rem', borderRadius: '4px' }}
                                  onChange={(e) => setRatings(prev => ({ ...prev, [appt.id]: { ...prev[appt.id], rating: e.target.value } }))}
                                >
                                  <option value="">Rate</option>
                                  <option value="5">5 ★</option>
                                  <option value="4">4 ★</option>
                                  <option value="3">3 ★</option>
                                  <option value="2">2 ★</option>
                                  <option value="1">1 ★</option>
                                </select>
                                <input 
                                  placeholder="Comment..." 
                                  style={{ padding: '0.2rem', borderRadius: '4px', border: '1px solid #ddd', fontSize: '0.8rem' }}
                                  onChange={(e) => setRatings(prev => ({ ...prev, [appt.id]: { ...prev[appt.id], comment: e.target.value } }))}
                                />
                                <button className="btn" style={{ padding: '0.3rem 0.6rem', width: 'auto', fontSize: '0.7rem' }} onClick={() => handleFeedback(appt.doctor_id, appt.id)}>
                                  Submit
                                </button>
                             </div>
                           ) : (
                             <span style={{ color: 'var(--accent-green)', fontSize: '0.8rem', fontWeight: 600 }}>Review Received ✓</span>
                           )}
                         </td>
                       </tr>
                     );
                  })}
                </tbody>
              </table>
            </div>
          )}
          {showReceipt && (
            <div className="modal-overlay" onClick={() => setShowReceipt(null)}>
              <div className="receipt-slip" onClick={e => e.stopPropagation()}>
                <div className="receipt-header">
                  <h2 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--primary-dark)' }}>MEDICARE</h2>
                  <p style={{ margin: 0, fontSize: '0.7rem', color: 'var(--text-light)', letterSpacing: '2px' }}>CLINICAL APPOINTMENT SLIP</p>
                </div>
                
                <div className="receipt-body">
                  <div className="receipt-row">
                    <span>Reference ID:</span>
                    <span>#{String(showReceipt.id).padStart(6, '0')}</span>
                  </div>
                  <div className="receipt-row">
                    <span>Practitioner:</span>
                    <span>{getDoctorName(showReceipt.doctor_id)}</span>
                  </div>
                  <div className="receipt-row">
                    <span>Specialization:</span>
                    <span>{doctors.find(d => d.id === showReceipt.doctor_id)?.specialization}</span>
                  </div>
                  <div className="receipt-row">
                    <span>Date:</span>
                    <span>{new Date(showReceipt.slot).toLocaleDateString([], { dateStyle: 'long' })}</span>
                  </div>
                  <div className="receipt-row">
                    <span>Time:</span>
                    <span>{new Date(showReceipt.slot).toLocaleTimeString([], { timeStyle: 'short' })}</span>
                  </div>
                  <div className="receipt-row" style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #eee' }}>
                    <span>Patient Name:</span>
                    <span style={{ textTransform: 'capitalize' }}>{showReceipt.patient_name}</span>
                  </div>
                </div>

                <div className="receipt-footer">
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-dark)', fontWeight: 600 }}>
                    Status: <span style={{ color: 'var(--accent-green)' }}>CONFIRMED</span>
                  </p>
                  <p style={{ margin: '5px 0 0', fontSize: '0.7rem', color: 'var(--text-light)' }}>
                    Please show this slip at the department reception.
                  </p>
                  <p style={{ margin: '8px 0 0', fontSize: '0.75rem', color: '#1e3a8a', fontWeight: 600 }}>
                    ⚠️ Please arrive 10 minutes prior to your slot time.
                  </p>
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', justifyContent: 'center' }} className="no-print">
                    <button 
                      className="btn" 
                      style={{ padding: '0.4rem 1rem', width: 'auto', fontSize: '0.8rem', backgroundColor: '#4b5563' }}
                      onClick={() => window.print()}
                    >
                      Print / Save PDF
                    </button>
                    <button 
                      className="btn-text" 
                      style={{ color: '#ef4444', fontWeight: 600, fontSize: '0.8rem' }}
                      onClick={() => setShowReceipt(null)}
                    >
                      Close Slip
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      );
}
