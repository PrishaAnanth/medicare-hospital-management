import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import client from '../api/client';

export default function BookingForm() {
  const [searchParams] = useSearchParams();
  const preSelectedDocId = searchParams.get('doctorId');

  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState('');
  const [date, setDate] = useState('');
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [bookedSlots, setBookedSlots] = useState([]);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await client.get('/doctors/');
        setDoctors(res.data);
        if (res.data.length > 0) {
          let initialDocId = preSelectedDocId;
          if (!initialDocId) {
            const firstAvailable = res.data.find(d => d.is_available);
            initialDocId = firstAvailable ? firstAvailable.id.toString() : res.data[0].id.toString();
          }
          setDoctorId(initialDocId);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchDoctors();
  }, []);

  useEffect(() => {
    if (!doctorId || !date) {
      setSlots([]);
      return;
    }

    const fetchAvailability = async () => {
      try {
        const doc = doctors.find(d => d.id === parseInt(doctorId));
        if (!doc || !doc.is_available) return;

        const res = await client.get(`/doctors/${doctorId}/booked_slots?date=${date}`);
        const bookedISOs = res.data.map(iso => new Date(iso).getHours());
        setBookedSlots(bookedISOs);

        const possibleSlots = [];
        for (let hour = doc.start_hour; hour < doc.end_hour; hour++) {
          possibleSlots.push(hour);
        }
        setSlots(possibleSlots);
        setSelectedSlot('');
      } catch (err) {
        console.error(err);
      }
    };
    fetchAvailability();
  }, [doctorId, date, doctors]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedSlot === '') {
      setError('Please select an available time slot.');
      setTimeout(() => setError(''), 4000);
      return;
    }
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const payload = {
        doctor_id: parseInt(doctorId),
        slot: `${date}T${selectedSlot.toString().padStart(2, '0')}:00:00`
      };
      await client.post('/appointments/', payload);

      setSuccess('Appointment booked successfully!');

      setBookedSlots([...bookedSlots, selectedSlot]);
      setSelectedSlot('');

      setTimeout(() => setSuccess(''), 4000);
    } catch (err) {
      if (Array.isArray(err.response?.data?.detail)) {
        setError(err.response.data.detail[0].msg);
      } else {
        setError(err.response?.data?.detail || 'Booking failed');
      }
      setTimeout(() => setError(''), 4000);
    } finally {
      setLoading(false);
    }
  };

  const formatAMPM = (hours) => {
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const num = hours % 12 || 12;
    return `${num}:00 ${ampm}`;
  };

  return (
    <div className="card-section">
      <h2 className="section-title">Schedule a Session</h2>
      <div style={{ maxWidth: '600px' }}>
        {error && <div className="alert error">{error}</div>}
        {success && <div className="alert success">{success}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Select Healthcare Practitioner</label>
            <select
              className="form-control"
              value={doctorId}
              onChange={e => setDoctorId(e.target.value)}
              required
            >
              {doctors.map(doc => (
                <option key={doc.id} value={doc.id} disabled={!doc.is_available}>
                  {doc.name} - {doc.specialization} {!doc.is_available ? '(UNAVAILABLE)' : `(${formatAMPM(doc.start_hour)} - ${formatAMPM(doc.end_hour)})`}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Select Date</label>
            <input
              type="date"
              className="form-control"
              value={date}
              onChange={e => setDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              disabled={!doctors.find(d => Number(d.id) === Number(doctorId))?.is_available}
              required
            />
          </div>

          {slots.length > 0 && (
            <div className="form-group">
              <label>Select Time Slot</label>
              <div className="time-slots">
                {slots.map(hour => {
                  const isBooked = bookedSlots.includes(hour);
                  const isSelected = selectedSlot === hour;
                  return (
                    <button
                      key={hour}
                      type="button"
                      disabled={isBooked}
                      className={`time-slot ${isSelected ? 'selected' : ''}`}
                      onClick={() => setSelectedSlot(hour)}
                    >
                      {formatAMPM(hour)}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {slots.length === 0 && date && (
            <p style={{ color: 'var(--text-light)', fontSize: '0.875rem' }}>No slots available for this configuration.</p>
          )}

          <button type="submit" className="btn" disabled={loading || selectedSlot === '' || !doctors.find(d => d.id === Number(doctorId))?.is_available}>
            {loading ? 'Booking...' : 'Confirm Session'}
          </button>
        </form>
      </div>
    </div>
  );
}
