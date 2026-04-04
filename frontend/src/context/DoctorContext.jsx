import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const DoctorContext = createContext();

const DoctorContextProvider = ({ children }) => {

  const backendUrl = "https://appointy-backend-qxya.onrender.com";

  const [dToken, setDToken] = useState(localStorage.getItem("dToken") || "");
  const [dashData, setDashData] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [profileData, setProfileData] = useState(null);

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${dToken}`
    }
  };

  // Get Dashboard
  const getDashData = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/doctor/dashboard",
        axiosConfig
      );
      if (data.success) {
        setDashData(data.dashData);
      }
    } catch (error) {
      console.log("Dashboard Error:", error.response?.data || error.message);
    }
  };

  // Get Appointments
  const getAppointments = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/doctor/appointments",
        axiosConfig
      );
      if (data.success) {
        setAppointments(data.appointments);
      }
    } catch (error) {
      console.log("Appointments Error:", error.response?.data || error.message);
    }
  };

  // Get Profile
  const getProfileData = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/doctor/profile",
        axiosConfig
      );
      if (data.success) {
        setProfileData(data.profileData);
      }
    } catch (error) {
      console.log("Profile Error:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (dToken) {
      getDashData();
      getAppointments();
      getProfileData();
    }
  }, [dToken]);

  const value = {
    backendUrl,
    dToken,
    setDToken,
    dashData,
    appointments,
    profileData,
    getDashData,
    getAppointments,
    getProfileData
  };

  return (
    <DoctorContext.Provider value={value}>
      {children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
