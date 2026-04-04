import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { assets } from '../../assets/assets'

const DoctorSidebar = () => {

  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("dToken")
    navigate("/")
  }

  return (
    <div className='min-h-screen bg-white border-r w-64 shadow-sm flex flex-col'>

      <div className='p-6 text-xl font-semibold border-b'>
        Doctor Panel
      </div>

      <ul className='text-[#515151] mt-5 flex-1'>

        <NavLink to="/doctor/dashboard" className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-6 transition-all 
          ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary text-primary font-medium' : 'hover:bg-gray-100'}`
        }>
          <img className='min-w-5' src={assets.home_icon} alt='' />
          <p>Dashboard</p>
        </NavLink>

        <NavLink to="/doctor/appointments" className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-6 transition-all 
          ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary text-primary font-medium' : 'hover:bg-gray-100'}`
        }>
          <img className='min-w-5' src={assets.appointment_icon} alt='' />
          <p>Appointments</p>
        </NavLink>

        <NavLink to="/doctor/profile" className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-6 transition-all 
          ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary text-primary font-medium' : 'hover:bg-gray-100'}`
        }>
          <img className='min-w-5' src={assets.people_icon} alt='' />
          <p>Profile</p>
        </NavLink>

      </ul>

      <div className="p-6 border-t">
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

    </div>
  )
}

export default DoctorSidebar