import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPlusCircle, FaList } from "react-icons/fa";

function ProductDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Product Management
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div
          onClick={() => navigate("/admin/products/add")}
          className="cursor-pointer bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
        >
          <FaPlusCircle className="text-4xl text-green-500 mb-3" />
          <h2 className="text-lg font-semibold text-gray-700">Add Product</h2>
        </div>

        <div
          onClick={() => navigate("/admin/products/all")}
          className="cursor-pointer bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
        >
          <FaList className="text-4xl text-blue-500 mb-3" />
          <h2 className="text-lg font-semibold text-gray-700">All Products</h2>
        </div>
      </div>
    </div>
  );
}

export default ProductDashboard;
