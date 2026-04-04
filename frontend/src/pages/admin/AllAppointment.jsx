import React, { useEffect, useContext } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const AllAppointments = () => {

  const { aToken, appointments, cancelAppointment, getAllAppointments } = useContext(AdminContext)
  const { slotDateFormat, currency } = useContext(AppContext)

  // 🔥 Safe Local Age Calculator (fixes your error permanently)
  const calculateAge = (dob) => {
    if (!dob) return "N/A"

    const birthDate = new Date(dob)
    const today = new Date()

    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--
    }

    return age
  }

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])

  return (
    <div className='w-full p-6'>

      <p className='mb-4 text-xl font-semibold'>All Appointments</p>

      <div className='bg-white border rounded-lg text-sm overflow-hidden shadow-sm'>

        {/* Header */}
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] py-3 px-6 border-b bg-gray-50 font-medium text-gray-600'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {/* Body */}
        <div className='max-h-[75vh] overflow-y-auto'>
          {appointments?.length > 0 ? (
            appointments.map((item, index) => (
              <div
                key={index}
                className='flex flex-wrap justify-between max-sm:gap-3 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-600 py-3 px-6 border-b hover:bg-gray-50 transition'
              >
                <p className='max-sm:hidden'>{index + 1}</p>

                {/* Patient */}
                <div className='flex items-center gap-2'>
                  <img
                    src={item.userData?.image}
                    className='w-8 h-8 rounded-full object-cover'
                    alt=""
                  />
                  <p>{item.userData?.name || "Unknown"}</p>
                </div>

                {/* Age */}
                <p className='max-sm:hidden'>
                  {calculateAge(item.userData?.dob)}
                </p>

                {/* Date */}
                <p>
                  {slotDateFormat(item.slotDate)} {item.slotTime}
                </p>

                {/* Doctor */}
                <div className='flex items-center gap-2'>
                  <img
                    src={item.docData?.image}
                    className='w-8 h-8 rounded-full bg-gray-200 object-cover'
                    alt=""
                  />
                  <p>{item.docData?.name || "Unknown"}</p>
                </div>

                {/* Fees */}
                <p>{currency}{item.amount}</p>

                {/* Action */}
                {item.cancelled ? (
                  <p className='text-red-500 text-xs font-medium'>
                    Cancelled
                  </p>
                ) : item.isCompleted ? (
                  <p className='text-green-500 text-xs font-medium'>
                    Completed
                  </p>
                ) : (
                  <img
                    onClick={() => cancelAppointment(item._id)}
                    className='w-8 cursor-pointer hover:scale-105 transition'
                    src={assets.cancel_icon}
                    alt=""
                  />
                )}
              </div>
            ))
          ) : (
            <p className='p-6 text-gray-500 text-center'>
              No appointments found
            </p>
          )}
        </div>

      </div>

    </div>
  )
}

export default AllAppointments