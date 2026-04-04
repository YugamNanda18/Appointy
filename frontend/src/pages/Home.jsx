import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'


const Home = () => {
  return (
    <div>
      <Header />

      {/* spacing after hero */}
      <div className="mt-28">
        <SpecialityMenu />
      </div>

      <div className="mt-28">
        <TopDoctors />
      </div>

      <div className="mt-28">
        <Banner />
      </div>
    </div>
  )
}
export default Home