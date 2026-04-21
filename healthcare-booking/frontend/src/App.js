import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import DoctorDashboard from './components/DoctorDashboard';
import PatientDashboard from './components/PatientDashboard';
import AdminDashboard from './components/AdminDashboard';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/doctor-dashboard/*" element={<PrivateRoute role="doctor"><DoctorDashboard /></PrivateRoute>} />
        <Route path="/patient-dashboard/*" element={<PrivateRoute role="patient"><PatientDashboard /></PrivateRoute>} />
        <Route path="/admin-dashboard/*" element={<PrivateRoute role="admin"><AdminDashboard /></PrivateRoute>} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
