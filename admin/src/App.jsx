import React, { useContext } from 'react'
import { DoctorContext } from './context/DoctorContext'
import { AdminContext } from './context/AdminContext'
import { Route, Routes, Navigate, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'

// ✅ ADMIN (lowercase folder)
import Dashboard from './pages/admin/Dashboard'
import AllAppointment from './pages/admin/AllAppointment'
import AddDoctor from './pages/admin/AddDoctor'
import DoctorList from './pages/admin/DoctorList'

// ✅ DOCTOR (lowercase folder)
import DoctorAppointment from './pages/doctor/DoctorAppointment'
import DoctorDashboard from './pages/doctor/DoctorDashboard'
import DoctorProfile from './pages/doctor/DoctorProfile'

import Login from './pages/Login'

const App = () => {
  const { dToken } = useContext(DoctorContext)
  const { aToken } = useContext(AdminContext)
  const location = useLocation()

  // Redirect root
  if (location.pathname === '/') {
    if (aToken) return <Navigate to="/admin-dashboard" replace />
    if (dToken) return <Navigate to="/doctor-dashboard" replace />
  }

  // ================= ADMIN =================
  if (aToken) {
    return (
      <div className='bg-[#F8F9FD] min-h-screen'>
        <ToastContainer />
        <Navbar />
        <div className='flex items-start'>
          <Sidebar />
          <Routes>
            <Route path="/admin-dashboard" element={<Dashboard />} />
            <Route path="/all-appointments" element={<AllAppointment />} />
            <Route path="/add-doctor" element={<AddDoctor />} />
            <Route path="/doctor-list" element={<DoctorList />} />
            <Route path="*" element={<Navigate to="/admin-dashboard" />} />
          </Routes>
        </div>
      </div>
    )
  }

  // ================= DOCTOR =================
  if (dToken) {
    return (
      <div className='bg-[#F8F9FD] min-h-screen'>
        <ToastContainer />
        <Navbar />
        <div className='flex items-start'>
          <Sidebar />
          <Routes>
            <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
            <Route path="/doctor-appointments" element={<DoctorAppointment />} />
            <Route path="/doctor-profile" element={<DoctorProfile />} />
            <Route path="*" element={<Navigate to="/doctor-dashboard" />} />
          </Routes>
        </div>
      </div>
    )
  }

  // ================= LOGIN =================
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  )
}

export default App