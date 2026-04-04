import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const DoctorsList = () => {

  const { doctors, aToken, backendUrl, getAllDoctors, changeAvailability } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }
  }, [aToken])

  // ✅ REMOVE DOCTOR FUNCTION
  const removeDoctor = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to remove this doctor?")
    if (!confirmDelete) return

    try {
      const { data } = await axios.post(
        backendUrl + '/api/admin/remove-doctor',
        { id },
        { headers: { atoken: aToken } }
      )

      if (data.success) {
        toast.success("Doctor Removed Successfully")
        getAllDoctors() // refresh list
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className='m-5 max-h-[90vh] overflow-y-auto'>
      <h1 className='text-xl font-semibold'>All Doctors</h1>

      <div className='w-full flex flex-wrap gap-6 pt-6'>

        {doctors.map((item) => (
          <div
            key={item._id}
            className='border border-[#C9D8FF] rounded-xl w-60 overflow-hidden group shadow-sm'
          >

            <img
              className='bg-[#EAEFFF] group-hover:bg-primary transition-all duration-300 w-full h-40 object-cover'
              src={item.image}
              alt=""
            />

            <div className='p-4 space-y-2'>

              <p className='text-lg font-medium'>{item.name}</p>
              <p className='text-sm text-gray-500'>{item.speciality}</p>

              {/* Availability Toggle */}
              <div className='flex items-center gap-2 text-sm'>
                <input
                  onChange={() => changeAvailability(item._id)}
                  type="checkbox"
                  checked={item.available}
                />
                <p>Available</p>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => removeDoctor(item._id)}
                className='w-full mt-3 bg-red-500 hover:bg-red-600 text-white py-1.5 rounded-md text-sm transition'
              >
                Remove Doctor
              </button>

            </div>

          </div>
        ))}

      </div>
    </div>
  )
}

export default DoctorsList