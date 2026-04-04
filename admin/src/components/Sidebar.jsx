import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'

const Sidebar = () => {

  const { dToken } = useContext(DoctorContext)
  const { aToken } = useContext(AdminContext)

  return (
    <div className='min-h-screen bg-white border-r w-64'>
      
      {aToken && (
        <ul className='text-[#515151] mt-5'>

          <NavLink to="/admin/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-6 cursor-pointer 
              ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`
            }>
            <img className='min-w-5' src={assets.home_icon} alt='' />
            <p>Dashboard</p>
          </NavLink>

          <NavLink to="/admin/appointments"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-6 cursor-pointer 
              ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`
            }>
            <img className='min-w-5' src={assets.appointment_icon} alt='' />
            <p>Appointments</p>
          </NavLink>

          <NavLink to="/admin/add-doctor"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-6 cursor-pointer 
              ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`
            }>
            <img className='min-w-5' src={assets.add_icon} alt='' />
            <p>Add Doctor</p>
          </NavLink>

          <NavLink to="/admin/doctors"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-6 cursor-pointer 
              ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`
            }>
            <img className='min-w-5' src={assets.people_icon} alt='' />
            <p>Doctors List</p>
          </NavLink>

        </ul>
      )}

      {dToken && (
        <ul className='text-[#515151] mt-5'>

          <NavLink to="/doctor/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-6 cursor-pointer 
              ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`
            }>
            <img className='min-w-5' src={assets.home_icon} alt='' />
            <p>Dashboard</p>
          </NavLink>

          <NavLink to="/doctor/appointments"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-6 cursor-pointer 
              ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`
            }>
            <img className='min-w-5' src={assets.appointment_icon} alt='' />
            <p>Appointments</p>
          </NavLink>

          <NavLink to="/doctor/profile"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-6 cursor-pointer 
              ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`
            }>
            <img className='min-w-5' src={assets.people_icon} alt='' />
            <p>Profile</p>
          </NavLink>

        </ul>
      )}

    </div>
  )
}

export default Sidebar