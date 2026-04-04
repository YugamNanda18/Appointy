import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {

  const navigate = useNavigate()
  const location = useLocation()

  const { token, setToken, userData } = useContext(AppContext)

  const [showMenu, setShowMenu] = useState(false)

  const logout = () => {
    localStorage.removeItem('token')
    setToken("")
    navigate('/login')
  }

  return (

    <div className="relative z-50 bg-white border-b border-gray-200">

      <div className="max-w-[1200px] mx-auto px-4 flex items-center justify-between py-4">

        {/* Logo */}
        <img
          onClick={() => navigate('/')}
          src={assets.logo}
          alt=""
          className="w-32 cursor-pointer"
        />

        {/* Navigation */}
        <ul className="hidden md:flex items-center gap-8 font-semibold text-base">

          <NavLink to='/'>
            <li>HOME</li>
          </NavLink>

          <NavLink to='/doctors'>
            <li>ALL DOCTORS</li>
          </NavLink>

          <NavLink to='/about'>
            <li>ABOUT</li>
          </NavLink>

          <NavLink to='/contact'>
            <li>CONTACT</li>
          </NavLink>

        </ul>

        {/* Right Section */}
        <div className="flex items-center gap-4">

          {location.pathname === '/' && (
            <button
              onClick={() => navigate('/admin')}
              className="bg-primary text-white px-5 py-2 rounded-full text-sm"
            >
              Admin Panel
            </button>
          )}

          {!token ? (

            <button
              onClick={() => navigate('/login')}
              className="bg-primary text-white px-6 py-2 rounded-full text-sm"
            >
              Create Account
            </button>

          ) : (

            <div className="relative">

              <div
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center gap-2 cursor-pointer"
              >

                <img
                  className="w-8 rounded-full"
                  src={assets.profile_pic}
                  alt=""
                />

                <img
                  className="w-2.5"
                  src={assets.dropdown_icon}
                  alt=""
                />

              </div>

              {showMenu && (

                <div className="absolute right-0 mt-3 text-base font-medium text-gray-600 z-20">

                  <div className="min-w-48 bg-white rounded flex flex-col gap-4 p-4 shadow-lg">

                    <p
                      onClick={() => navigate('/my-profile')}
                      className="cursor-pointer hover:text-black"
                    >
                      My Profile
                    </p>

                    <p
                      onClick={() => navigate('/my-appointments')}
                      className="cursor-pointer hover:text-black"
                    >
                      My Appointments
                    </p>

                    <p
                      onClick={logout}
                      className="cursor-pointer hover:text-black"
                    >
                      Logout
                    </p>

                  </div>

                </div>

              )}

            </div>

          )}

        </div>

      </div>

    </div>

  )
}

export default Navbar