import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBox,
  FaTags,
  FaShoppingCart,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          <FaSignOutAlt /> Logout
        </button>
      </header>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          onClick={() => navigate("/admin/products")}
          className="cursor-pointer bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
        >
          <FaBox className="text-4xl text-blue-500 mb-3" />
          <h2 className="text-lg font-semibold text-gray-700">
            Manage Products
          </h2>
        </div>

        <div
          onClick={() => navigate("/admin/categories")}
          className="cursor-pointer bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
        >
          <FaTags className="text-4xl text-green-500 mb-3" />
          <h2 className="text-lg font-semibold text-gray-700">
            Manage Categories
          </h2>
        </div>

        <div
          onClick={() => navigate("/admin/orders")}
          className="cursor-pointer bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
        >
          <FaShoppingCart className="text-4xl text-orange-500 mb-3" />
          <h2 className="text-lg font-semibold text-gray-700">Manage Orders</h2>
        </div>

        <div
          onClick={() => navigate("/admin/users")}
          className="cursor-pointer bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
        >
          <FaUsers className="text-4xl text-purple-500 mb-3" />
          <h2 className="text-lg font-semibold text-gray-700">Manage Users</h2>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
