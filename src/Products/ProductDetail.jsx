// src/Products/ProductDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../Cart/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  const [state, setState] = useState("");
  const [location, setLocation] = useState("");

  const states = {
    Lagos: ["Ikeja", "Yaba", "Lekki"],
    Abuja: ["Garki", "Maitama", "Wuse"],
    Enugu: ["Nsukka", "Ogui", "Independence Layout"],
  };

  useEffect(() => {
    // Fetch product by ID from fakestoreapi
    fetch(`https://e-com-backend-j88f.onrender.com/api/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) return <div className="p-10">Loading...</div>;

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-8 max-w-7xl mx-auto">
        {/* Left: Product Info */}
        <div className="bg-white p-6 rounded-xl shadow">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Product Image */}
            <div className="flex-1 flex justify-center items-center">
              <img
                src={product.image}
                alt={product.title}
                className="w-full max-w-sm object-contain"
              />
            </div>

            {/* Product Details */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {product.title}
              </h2>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <p className="text-3xl font-bold text-green-600 mb-2">
                ₦{(product.price * 1500).toLocaleString()}{" "}
                {/* Convert to Naira */}
              </p>

              {/* ✅ Stock info */}
              <p className="text-sm text-gray-500 mb-6">
                Stock: {product.rating?.count || 0}
              </p>

              <button
                onClick={() =>
                  addToCart({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    image: product.image,
                  })
                }
                className="bg-amber-700 hover:bg-amber-800 text-white px-6 py-3 rounded-lg shadow"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Right: Delivery & Returns */}
        <div className="bg-white p-6 rounded-xl shadow h-fit">
          <h3 className="text-xl font-bold mb-4">Delivery & Returns</h3>

          {/* State Select */}
          <label className="block text-sm font-medium mb-1">State</label>
          <select
            value={state}
            onChange={(e) => {
              setState(e.target.value);
              setLocation(""); // reset location
            }}
            className="w-full border rounded-lg p-2 mb-4"
          >
            <option value="">Select State</option>
            {Object.keys(states).map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>

          {/* Location Select */}
          {state && (
            <>
              <label className="block text-sm font-medium mb-1">Location</label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full border rounded-lg p-2 mb-4"
              >
                <option value="">Select Location</option>
                {states[state].map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </>
          )}

          {/* Delivery Options */}
          <div className="border-t pt-4">
            <p className="mb-2">
              <strong>Pickup Station:</strong>{" "}
              <span className="text-green-600">₦1,050</span>
            </p>
            <p className="mb-4">
              <strong>Home Delivery:</strong>{" "}
              <span className="text-green-600">₦2,500</span>
            </p>
          </div>

          {/* Return Policy */}
          <div className="border-t pt-4">
            <p className="text-gray-700">
              <strong>Return Policy:</strong> Return within{" "}
              <span className="font-semibold">7 days</span> of delivery for a
              full refund.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
