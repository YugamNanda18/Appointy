import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <div id="speciality" className="text-center">

      {/* Title */}
      <h1 className="text-3xl font-medium">
        Find by Speciality
      </h1>

      {/* Description */}
      <p className="text-gray-500 mt-3 max-w-xl mx-auto">
        Simply browse through our extensive list of trusted doctors,
        schedule your appointment hassle-free.
      </p>

      {/* Icons */}
      <div className="flex justify-center gap-10 mt-12 flex-wrap">
        {specialityData.map((sp, idx) => (
          <Link
            to={`/doctors/${sp.speciality}`}
            key={idx}
            className="flex flex-col items-center hover:scale-105 transition duration-300"
          >
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
              <img
                src={sp.image}
                className="w-12 h-12 object-contain"
                alt={sp.speciality}
              />
            </div>
            <p className="text-sm mt-4">{sp.speciality}</p>
          </Link>
        ))}
      </div>

    </div>
  )
}

export default SpecialityMenu