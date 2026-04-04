import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {

  const { backendUrl, setAToken } = useContext(AdminContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/login`,
        { email, password }
      );

      if (data.success) {
        toast.success(data.message);
        setAToken(data.token);
        localStorage.setItem("aToken", data.token);
        navigate("/admin/dashboard");
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div
      className="flex items-center justify-center bg-gray-50"
      style={{ minHeight: "calc(100vh - 160px)" }}  // prevents scroll
    >
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md">

        <h2 className="text-2xl font-bold text-center mb-8">
          Admin Login
        </h2>

        <form onSubmit={onSubmitHandler} className="space-y-5">

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

export default AdminLogin;