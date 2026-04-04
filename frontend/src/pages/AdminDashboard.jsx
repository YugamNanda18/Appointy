import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AdminDashboard = () => {

  const navigate = useNavigate()   // ✅ INSIDE component

  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [doctors, setDoctors] = useState([])

  useEffect(() => {

    const fetchDoctors = async () => {
      try {
        const token = localStorage.getItem('aToken')

        if (!token) {
          navigate('/admin')
          return
        }

        const { data } = await axios.get(
  backendUrl + '/api/admin/all-doctors',
  {
    headers: {
      atoken: localStorage.getItem('aToken')   // ✅ MUST BE atoken
    }
  }
        )

        if (data.success) {
          setDoctors(data.doctors)
        }

      } catch (error) {
        console.log(error)
      }
    }

    fetchDoctors()

  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {doctors.length === 0 ? (
        <p>No Doctors Found</p>
      ) : (
        doctors.map((doc) => (
          <div key={doc._id} className="border p-3 mb-2 rounded">
            <p><strong>Name:</strong> {doc.name}</p>
            <p><strong>Email:</strong> {doc.email}</p>
            <p><strong>Speciality:</strong> {doc.speciality}</p>
          </div>
        ))
      )}
    </div>
  )
}

export default AdminDashboard