import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import client from '../api/client';

export default function DoctorList({ genderFilter, setGenderFilter }) {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await client.get('/doctors/');
      setDoctors(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatAMPM = (hours) => {
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const num = hours % 12 || 12;
    return `${num}:00 ${ampm}`;
  };

  if (loading) return <div className="spinner"></div>;

  const filteredDoctors = genderFilter === 'All' 
    ? doctors 
    : doctors.filter(d => d.gender === genderFilter);

  return (
    <div className="portal-container">
      <div style={{ flexGrow: 1 }}>
        <div className="card-section" style={{ padding: 0, boxShadow: 'none', border: 'none', background: 'transparent' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
             <h2 className="section-title" style={{ margin: 0 }}>Our Practitioners</h2>
             <span className="badge" style={{ backgroundColor: 'var(--border-color)', color: 'var(--text-light)' }}>
               {filteredDoctors.length} results
             </span>
          </div>

          {filteredDoctors.length === 0 ? (
            <div className="empty-state" style={{ padding: '4rem 2rem', textAlign: 'center', backgroundColor: 'white', borderRadius: '16px', border: '1px dashed var(--border-color)' }}>
              <p style={{ color: 'var(--text-light)' }}>No practitioners match your current filters.</p>
              <button 
                className="btn-text" 
                style={{ color: 'var(--accent-blue)', marginTop: '1rem', fontWeight: 600 }}
                onClick={() => setGenderFilter('All')}
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="doc-grid">
              {filteredDoctors.map(doc => (
                <div key={doc.id} className="doc-card">
                  <div className="doc-header">
                    <div className="doc-avatar">
                       {doc.name.charAt(0)}{doc.name.split(' ')[1] ? doc.name.split(' ')[1].charAt(0) : ''}
                    </div>
                    <div className="doc-info">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <h3>{doc.name}</h3>
                        <span style={{ 
                          fontSize: '0.65rem', 
                          padding: '2px 6px', 
                          borderRadius: '4px', 
                          backgroundColor: doc.gender === 'Male' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(236, 72, 153, 0.1)',
                          color: doc.gender === 'Male' ? '#2563eb' : '#db2777',
                          fontWeight: 700,
                          textTransform: 'uppercase'
                        }}>
                          {doc.gender === 'Male' ? 'M' : 'F'}
                        </span>
                      </div>
                      <p>{doc.specialization}</p>
                    </div>
                  </div>
                  <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                    {doc.is_available ? (
                      <span className="badge badge-green">Available</span>
                    ) : (
                      <span className="badge" style={{ backgroundColor: '#f1f5f9', color: '#64748b' }}>Offline</span>
                    )}
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', fontWeight: 500 }}>
                      {formatAMPM(doc.start_hour)} - {formatAMPM(doc.end_hour)}
                    </span>
                  </div>
                  <button 
                    className="btn" 
                    style={{ 
                      marginTop: '1rem', 
                      padding: '0.6rem', 
                      fontSize: '0.85rem',
                      backgroundColor: doc.is_available ? 'var(--accent-green)' : '#94a3b8',
                      cursor: doc.is_available ? 'pointer' : 'not-allowed'
                    }}
                    disabled={!doc.is_available}
                    onClick={() => navigate(`/patient-dashboard/book?doctorId=${doc.id}`)}
                  >
                    {doc.is_available ? 'Quick Book Session' : 'Currently Offline'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
