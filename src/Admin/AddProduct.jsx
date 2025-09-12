import React, { useState, useEffect } from "react";
import axios from "axios";

function AddProduct() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    brand: "",
    image: "",
  });

  // Fetch all products on page load
  useEffect(() => {
    axios
      .get("http://localhost:3500/api/products") // ✅ Adjust to your backend URL
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        image: files[0], // store file object
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Submit new product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      const res = await axios.post("http://localhost:3007/api", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setProducts((prev) => [...prev, res.data.product]); // backend sends {product}
      setFormData({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        brand: "",
        image: "",
      });
    } catch (err) {
      console.error("Error adding product:", err);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      {/* Product Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md mb-6"
        encType="multipart/form-data"
      >
        <h2 className="text-xl font-semibold mb-4">Add Product</h2>

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Product Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
          rows="3"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category ID"
          value={formData.category}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={formData.brand}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add Product
        </button>
      </form>

      {/* Product List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white p-4 shadow rounded-lg">
            <img
              src={product.image?.url || "https://via.placeholder.com/150"}
              alt={product.name}
              className="w-full h-40 object-cover mb-3 rounded"
            />
            <h3 className="text-lg font-bold">{product.name}</h3>
            <p className="text-sm text-gray-600 mb-2">
              {product.description || "No description"}
            </p>
            <p>💲 {product.price}</p>
            <p>📦 Stock: {product.stock}</p>
            <p>🏷️ Category: {product.category?.name || product.category}</p>
            <p>🏭 Brand: {product.brand}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AddProduct;
