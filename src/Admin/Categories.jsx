import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPlusCircle, FaList } from "react-icons/fa";

function CategoryDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Category Management
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Add Category */}
        <div
          onClick={() => navigate("/admin/categories/add")}
          className="cursor-pointer bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
        >
          <FaPlusCircle className="text-4xl text-green-500 mb-3" />
          <h2 className="text-lg font-semibold text-gray-700">Add Category</h2>
        </div>

        {/* All Categories */}
        <div
          onClick={() => navigate("/admin/categories/all")}
          className="cursor-pointer bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
        >
          <FaList className="text-4xl text-blue-500 mb-3" />
          <h2 className="text-lg font-semibold text-gray-700">
            All Categories
          </h2>
        </div>
      </div>
    </div>
  );
}

export default CategoryDashboard;
