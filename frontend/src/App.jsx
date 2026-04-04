import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Public Pages
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import MyAppointment from './pages/MyAppointment'
import Appointment from './Appointment'

// Layout
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Sidebars
import AdminSidebar from './components/admin/AdminSidebar'
import DoctorSidebar from './components/doctor/DoctorSidebar'

// Admin
import AdminPortal from './pages/AdminPortal'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/admin/Dashboard'
import DoctorList from './pages/admin/DoctorList'
import AllAppointment from './pages/admin/AllAppointment'
import AddDoctor from './pages/admin/AddDoctor'

// Doctor
import DoctorDashboard from './pages/doctor/DoctorDashboard'
import DoctorProfile from './pages/doctor/DoctorProfile'
import DoctorAppointment from './pages/doctor/DoctorAppointment'
import DoctorLogin from './pages/DoctorLogin'

const App = () => {

  const location = useLocation()

  const isPanel =
    location.pathname.startsWith('/admin') ||
    location.pathname.startsWith('/doctor/')

  return (
    <>
      <ToastContainer />

      {!isPanel && <Navbar />}

      {/* 👇 THIS WRAPPER ONLY FOR PUBLIC PAGES */}
      {!isPanel ? (
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 ">
          <Routes>

            <Route path='/' element={<Home />} />
            <Route path='/doctors' element={<Doctors />} />
            <Route path='/doctors/:speciality' element={<Doctors />} />
            <Route path='/login' element={<Login />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/my-profile' element={<MyProfile />} />
            <Route path='/my-appointments' element={<MyAppointment />} />
            <Route path='/appointment/:docId' element={<Appointment />} />

          </Routes>
        </div>
      ) : (
        <Routes>

          {/* ADMIN / DOCTOR ENTRY */}
          <Route path="/admin" element={<AdminPortal />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/doctor/login" element={<DoctorLogin />} />

          {/* ADMIN PANEL */}
          <Route path='/admin/dashboard' element={
            <div className='flex h-screen bg-white'>
              <AdminSidebar />
              <div className='flex-1 overflow-auto p-6'>
                <AdminDashboard />
              </div>
            </div>
          } />

          <Route path='/admin/doctors' element={
            <div className='flex h-screen bg-white'>
              <AdminSidebar />
              <div className='flex-1 overflow-auto p-6'>
                <DoctorList />
              </div>
            </div>
          } />

          <Route path='/admin/appointments' element={
            <div className='flex h-screen bg-white'>
              <AdminSidebar />
              <div className='flex-1 overflow-auto p-6'>
                <AllAppointment />
              </div>
            </div>
          } />

          <Route path='/admin/add-doctor' element={
            <div className='flex h-screen bg-white'>
              <AdminSidebar />
              <div className='flex-1 overflow-auto p-6'>
                <AddDoctor />
              </div>
            </div>
          } />

          {/* DOCTOR PANEL */}
          <Route path='/doctor/dashboard' element={
            <div className='flex h-screen bg-white'>
              <DoctorSidebar />
              <div className='flex-1 overflow-auto p-6'>
                <DoctorDashboard />
              </div>
            </div>
          } />

          <Route path='/doctor/profile' element={
            <div className='flex h-screen bg-white'>
              <DoctorSidebar />
              <div className='flex-1 overflow-auto p-6'>
                <DoctorProfile />
              </div>
            </div>
          } />

          <Route path='/doctor/appointments' element={
            <div className='flex h-screen bg-white'>
              <DoctorSidebar />
              <div className='flex-1 overflow-auto p-6'>
                <DoctorAppointment />
              </div>
            </div>
          } />

        </Routes>
      )}

      {!isPanel && <Footer />}
    </>
  )
}

export default App