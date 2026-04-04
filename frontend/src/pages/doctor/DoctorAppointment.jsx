import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";

const DoctorAppointments = () => {

  const { appointments, getAppointments } = useContext(DoctorContext);

  const calculateAge = (dob) => {
  if (!dob || dob === "NA") return "-";

  const birth = new Date(dob);
  if (isNaN(birth)) return "-";

  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
};

  useEffect(() => {
    getAppointments();
  }, []);

  if (!appointments) {
    return <div className="p-6">Loading...</div>;
  }

  if (appointments.length === 0) {
    return <div className="p-6">No appointments yet.</div>;
  }

  return (
    <div className="p-6">

      <h2 className="text-2xl font-bold mb-6">
        Doctor Appointments
      </h2>

      <div className="space-y-4">

        {appointments.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow p-4 rounded flex justify-between"
          >
            <div>
              <p className="font-semibold">
                {item.userData?.name || "Patient"}
              </p>

              <p className="text-sm text-gray-500">
                Age: {calculateAge(item.userData?.dob)}
              </p>

              <p className="text-sm text-gray-500">
                {item.slotDate} | {item.slotTime}
              </p>
            </div>

            <div>
              {item.cancelled && (
                <span className="text-red-500">Cancelled</span>
              )}

              {item.isCompleted && (
                <span className="text-green-600">Completed</span>
              )}

              {!item.cancelled && !item.isCompleted && (
                <span className="text-blue-600">Upcoming</span>
              )}
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default DoctorAppointments;