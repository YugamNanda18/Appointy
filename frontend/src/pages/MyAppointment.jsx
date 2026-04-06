import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyAppointments = () => {

  const { backendUrl, token, getDoctorsData, doctors } = useContext(AppContext)

  const navigate = useNavigate()

  const [appointments, setAppointments] = useState([])
  const [payment, setPayment] = useState('')

  const months = [" ", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const slotDateFormat = (slotDate) => {
    const [day, month, year] = slotDate.split('_')
    return `${day} ${months[Number(month)]} ${year}`
  }

  // Get user appointments
  const getUserAppointments = async () => {
    try {

      const { data } = await axios.get(
        backendUrl + '/api/user/appointments',
        { headers: { token } }
      )

      if (data.success) {
        setAppointments(data.appointments.reverse())
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  // Cancel appointment
  const cancelAppointment = async (appointmentId) => {

    try {

      const { data } = await axios.post(
        backendUrl + '/api/user/cancel-appointment',
        { appointmentId },
        { headers: { token } }
      )

      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData()
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  // Razorpay initialization
  const initPay = (order) => {

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Appointment Payment',
      description: "Appointment Payment",
      order_id: order.id,
      receipt: order.receipt,

      handler: async (response) => {

        try {

          const { data } = await axios.post(
            backendUrl + "/api/user/verifyRazorpay",
            response,
            { headers: { token } }
          )

          if (data.success) {
            navigate('/my-appointments')
            getUserAppointments()
          }

        } catch (error) {
          console.log(error)
          toast.error(error.message)
        }
      }
    }

    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  // Razorpay payment
  const appointmentRazorpay = async (appointmentId) => {

    try {

      const { data } = await axios.post(
        backendUrl + '/api/user/payment-razorpay',
        { appointmentId },
        { headers: { token } }
      )

      if (data.success) {
        initPay(data.order)
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      getUserAppointments()
    }
  }, [token])

  // Temporary simulated appointments (for testing)
  useEffect(() => {

    if (doctors.length) {

      const generatedAppointments = doctors.slice(0, 3).map((doc, idx) => ({

        _id: `appointment_${idx}`,

        docData: {
          name: doc.name,
          speciality: doc.speciality,
          image: doc.image,
          address: doc.address || { line1: "Street X", line2: "City Y" }
        },

        slotDate: `12_0${idx + 1}_2025`,
        slotTime: `${10 + idx}:00 AM`,
        payment: idx === 1,
        isCompleted: idx === 2,
        cancelled: false

      }))

      setAppointments(generatedAppointments)
    }

  }, [doctors])

  return (

    <div>

      <p className='pb-3 mt-12 text-lg font-medium text-gray-600 border-b'>
        My Appointments
      </p>

      <div>

        {appointments.map((item, index) => (

          <div
            key={index}
            className='flex gap-6 py-4 border-b items-start'
          >

            {/* Doctor Image */}

            <img
              className='w-16 h-16 rounded-full object-cover border'
              src={item.docData.image}
              alt={item.docData.name}
            />

            {/* Doctor Info */}

            <div className='flex-1 text-sm text-[#5E5E5E]'>

              <p className='text-[#262626] text-base font-semibold'>
                {item.docData.name}
              </p>

              <p>{item.docData.speciality}</p>

              <p className='text-[#464646] font-medium mt-1'>
                Address:
              </p>

              <p>{item.docData.address.line1}</p>
              <p>{item.docData.address.line2}</p>

              <p className='mt-1'>
                <span className='text-sm text-[#3C3C3C] font-medium'>
                  Date & Time:
                </span>{" "}
                {slotDateFormat(item.slotDate)} | {item.slotTime}
              </p>

            </div>

            {/* Buttons */}

            <div className='flex flex-col gap-2 text-sm text-center'>

              {!item.cancelled && !item.payment && !item.isCompleted && payment !== item._id &&
                <button
                  onClick={() => setPayment(item._id)}
                  className='sm:min-w-40 py-2 border rounded hover:bg-primary hover:text-white transition-all'
                >
                  Pay Online
                </button>
              }

              {!item.cancelled && !item.payment && !item.isCompleted && payment === item._id &&
                <button
                  onClick={() => appointmentRazorpay(item._id)}
                  className='sm:min-w-40 py-2 border rounded flex items-center justify-center'
                >
                  <img
                    className='max-w-20 max-h-5'
                    src={assets.razorpay_logo}
                    alt=""
                  />
                </button>
              }

              {!item.cancelled && item.payment && !item.isCompleted &&
                <button className='sm:min-w-40 py-2 border rounded bg-[#EAEFFF]'>
                  Paid
                </button>
              }

              {item.isCompleted &&
                <button className='sm:min-w-40 py-2 border border-green-500 rounded text-green-500'>
                  Completed
                </button>
              }

              {!item.cancelled && !item.isCompleted &&
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className='sm:min-w-40 py-2 border rounded hover:bg-red-600 hover:text-white transition'
                >
                  Cancel appointment
                </button>
              }

              {item.cancelled && !item.isCompleted &&
                <button className='sm:min-w-40 py-2 border border-red-500 rounded text-red-500'>
                  Appointment cancelled
                </button>
              }

            </div>

          </div>

        ))}

      </div>

    </div>
  )
}

export default MyAppointments
