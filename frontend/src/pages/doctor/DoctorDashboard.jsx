import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";

const DoctorDashboard = () => {

  const { dashData, getDashData } = useContext(DoctorContext);

  useEffect(() => {
    getDashData();
  }, []);

  if (!dashData) {
    return <div className="p-6 text-xl">Loading...</div>;
  }

  return (
    <div className="p-6">

      <h2 className="text-2xl font-bold mb-6">Doctor Dashboard</h2>

      <div className="grid grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-lg">Total Earnings</h3>
          <p className="text-2xl font-semibold">₹{dashData.earnings}</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-lg">Appointments</h3>
          <p className="text-2xl font-semibold">{dashData.appointments}</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-lg">Patients</h3>
          <p className="text-2xl font-semibold">{dashData.patients}</p>
        </div>

      </div>
    </div>
  );
};

export default DoctorDashboard;