// src/Admin/AddCategory.jsx
import React, { useState } from "react";
import axios from "axios";

function AddCategory() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3007/api/categories", // ✅ Update this to match your backend
        { name, description },
        { withCredentials: true }
      );

      if (res.status === 201) {
        setMessage("✅ Category added successfully!");
        setName("");
        setDescription("");
      }
    } catch (error) {
      console.error("Error adding category:", error);
      setMessage("❌ Failed to add category");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <h1 className="text-2xl font-bold mb-4">Add New Category</h1>

      {message && (
        <div className="mb-4 text-center text-sm font-medium text-red-600">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Category Name */}
        <div>
          <label className="block font-medium">Category Name</label>
          <input
            type="text"
            placeholder="e.g. Electronics"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          Add Category
        </button>
      </form>
    </div>
  );
}

export default AddCategory;
