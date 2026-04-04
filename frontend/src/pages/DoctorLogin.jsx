import React, { useState, useContext } from "react";
import axios from "axios";
import { DoctorContext } from "../context/DoctorContext";
import { useNavigate } from "react-router-dom";

const DoctorLogin = () => {

  const { backendUrl, setDToken } = useContext(DoctorContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const { data } = await axios.post(
      backendUrl + "/api/doctor/login",
      { email, password }
    );

    if (data.success) {
      setDToken(data.token);
      localStorage.setItem("dToken", data.token);

      alert("Login successful ✅");   // ✅ FIXED
      navigate("/doctor/dashboard");

    } else {
      alert(data.message || "Invalid credentials ❌"); // ✅ FIXED
    }

  } catch (error) {
    alert(
      error.response?.data?.message || 
      error.message || 
      "Login failed ❌"
    ); // ✅ FIXED
  }
};

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50">

      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md">

        <h2 className="text-2xl font-bold text-center mb-8">
          Doctor Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-lg hover:opacity-90 transition"
          >
            Login
          </button>

        </form>

      </div>
    </div>
  );
};

export default DoctorLogin;
