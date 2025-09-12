import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3007/api");

      const data = Array.isArray(res.data) ? res.data : res.data.products;
      setProducts(data || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete a product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      await axios.delete(`http://localhost:3007/api/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product.");
    }
  };

  // Navigate to Edit Page
  const handleEdit = (id) => {
    navigate(`/admin/edit/${id}`); // route must exist
  };

  if (loading) return <p className="text-center py-6">Loading products...</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">All Products</h1>

      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Description</th>
            <th className="border border-gray-300 px-4 py-2">Price</th>
            <th className="border border-gray-300 px-4 py-2">Stock</th>
            <th className="border border-gray-300 px-4 py-2">Category</th>
            <th className="border border-gray-300 px-4 py-2">Brand</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((p) => (
              <tr key={p._id} className="text-center">
                <td className="border border-gray-300 px-4 py-2">{p.name}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {p.description || "No description"}
                </td>
                <td className="border border-gray-300 px-4 py-2">${p.price}</td>
                <td className="border border-gray-300 px-4 py-2">{p.stock}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {p.category?.name || "N/A"}
                </td>
                <td className="border border-gray-300 px-4 py-2">{p.brand}</td>
                <td className="border border-gray-300 px-4 py-2 flex gap-2 justify-center">
                  <button
                    onClick={() => handleEdit(p._id)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-4">
                No products found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AllProducts;
