import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
    return (
        <div className='flex flex-col md:flex-row items-center bg-primary rounded-xl px-8 md:px-14 py-14 gap-12'>

            {/* LEFT */}
            <div className='md:w-1/2 text-white space-y-6'>
                <h1 className='text-3xl md:text-5xl font-bold leading-tight'>
                    Book Appointment <br /> With Trusted Doctors
                </h1>

                <p className='text-sm md:text-base'>
                    Simply browse through our extensive list of trusted doctors,
                    schedule your appointment hassle-free.
                </p>

                <a
                    href='#speciality'
                    className='inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-full hover:scale-105 transition'
                >
                    Book appointment
                    <img className='w-3' src={assets.arrow_icon} alt="" />
                </a>
            </div>

            {/* RIGHT */}
            <div className='md:w-1/2 flex justify-center'>
                <img
                    src={assets.header_img}
                    alt=""
                    className='max-h-[420px] w-auto object-contain'
                />
            </div>

        </div>
    )
}

export default Header