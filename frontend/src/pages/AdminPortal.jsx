import React from "react";
import { useNavigate } from "react-router-dom";

const AdminPortal = () => {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white w-[90%] max-w-md p-8 rounded-xl shadow-lg text-center">

        <h2 className="text-2xl font-bold mb-8">
          Select Login Type
        </h2>

        <div className="flex flex-col gap-4">

          <button
            onClick={() => navigate("/admin/login")}
            className="w-full bg-primary text-white py-3 rounded-lg hover:opacity-90 transition"
          >
            Admin Login
          </button>

          <button
            onClick={() => navigate("/doctor/login")}
            className="w-full border border-primary text-primary py-3 rounded-lg hover:bg-primary hover:text-white transition"
          >
            Doctor Login
          </button>

        </div>

      </div>

    </div>
  );
};

export default AdminPortal;