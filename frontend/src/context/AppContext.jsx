import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {

  const backendUrl = ""; // same domain because Railway serves frontend + backend

  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userData, setUserData] = useState(null);

  // ===========================
  // Get Doctors
  // ===========================
  const getDoctorsData = async () => {
    try {

      const { data } = await axios.get(backendUrl + "/api/doctor/list");

      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);
    }
  };

  // ===========================
  // Load User Profile
  // ===========================
  const loadUserProfileData = async () => {

    if (!token) return;

    try {

      const { data } = await axios.get(
        backendUrl + "/api/user/get-profile",
        { headers: { token } }
      );

      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);
    }

  };

  // ===========================
  // Effects
  // ===========================
  useEffect(() => {
    getDoctorsData();
  }, []);

  useEffect(() => {
    loadUserProfileData();
  }, [token]);

  // ===========================
  // Date Formatter
  // ===========================
  const slotDateFormat = (dateString) => {

    if (!dateString) return "";

    const date = new Date(dateString);

    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  const value = {
    backendUrl,
    doctors,
    getDoctorsData,
    token,
    setToken,
    userData,
    setUserData,
    loadUserProfileData,
    slotDateFormat
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;