// src/Promotions/Promotions.jsx
import React, { useEffect, useState } from "react";
import { X, Filter } from "lucide-react";
import { useCart } from "../Cart/CartContext";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

function Promotions() {
  const [holdData, setHoldData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const { addToCart } = useCart();

  const allBrands = [
    "Apple",
    "Samsung",
    "Sony",
    "LG",
    "Panasonic",
    "Huawei",
    "Dell",
    "HP",
    "Lenovo",
    "Asus",
  ];
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState([]);

  const [minPrice, setMinPrice] = useState(1);
  const [maxPrice, setMaxPrice] = useState(4500000);

  const [orderOpen, setOrderOpen] = useState(false);
  const [orderBy, setOrderBy] = useState("Default");

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredBrands = allBrands.filter((brand) =>
    brand.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ Fetch products from backend
  useEffect(() => {
    fetch("https://e-com-backend-j88f.onrender.com/api") // 🔥 update with your backend URL
      .then((response) => response.json())
      .then((data) => {
        setHoldData(data);
        setFilteredData(data);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // ✅ Apply filters
  useEffect(() => {
    let products = [...holdData];

    if (selectedBrands.length > 0) {
      products = products.filter((p) =>
        selectedBrands.some((brand) =>
          p.brand?.toLowerCase().includes(brand.toLowerCase())
        )
      );
    }

    products = products.filter(
      (p) => p.price >= minPrice && p.price <= maxPrice
    );

    if (orderBy === "Price: Low to High") {
      products.sort((a, b) => a.price - b.price);
    } else if (orderBy === "Price: High to Low") {
      products.sort((a, b) => b.price - a.price);
    } else if (orderBy === "Recently Added") {
      products = [...products].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }

    setFilteredData(products);
  }, [selectedBrands, minPrice, maxPrice, holdData, orderBy]);

  const handleBrandChange = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleAddToCart = (item) => {
    addToCart({
      id: item._id,
      title: item.name,
      price: item.price,
      image: item.image?.url,
    });
    toast.success(`${item.name} added to cart 🛒`, {
      position: "bottom-center",
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Toaster />

      {/* Mobile Filter Button */}
      <div className="lg:hidden flex justify-end p-4">
        <button
          className="flex items-center gap-2 bg-amber-700 text-white px-4 py-2 rounded-lg"
          onClick={() => setSidebarOpen(true)}
        >
          <Filter size={18} /> Filter
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr]">
        {/* Sidebar */}
        <div
          className={`bg-white lg:sticky lg:top-0 lg:h-screen shadow-md lg:block fixed top-0 left-0 h-full w-72 transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 transition-transform duration-300 z-50`}
        >
          <div className="p-5 h-full overflow-y-auto">
            <div className="lg:hidden flex justify-end mb-4">
              <button onClick={() => setSidebarOpen(false)}>
                <X size={24} />
              </button>
            </div>

            {/* Brands */}
            <h2 className="text-lg font-bold mb-2">Brands</h2>
            <input
              type="text"
              placeholder="Search brand..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-2 rounded-md border mb-3"
            />
            <ul className="space-y-1">
              {(showAll ? filteredBrands : filteredBrands.slice(0, 5)).map(
                (brand, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => handleBrandChange(brand)}
                    />
                    <span>{brand}</span>
                  </li>
                )
              )}
            </ul>
            {filteredBrands.length > 5 && (
              <button
                className="text-blue-500 mt-2"
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? "See less" : "See all"}
              </button>
            )}

            {/* Price */}
            <h2 className="text-lg font-bold mt-6 mb-2">Price</h2>
            <div className="flex gap-2">
              <input
                type="number"
                min="1"
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
                className="w-1/2 p-1 border rounded"
              />
              <input
                type="number"
                max="4500000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-1/2 p-1 border rounded"
              />
            </div>
            <p className="mt-1 text-sm text-gray-600">
              ₦{minPrice.toLocaleString()} - ₦{maxPrice.toLocaleString()}
            </p>

            {/* Order By */}
            <h2 className="text-lg font-bold mt-6 mb-2">Order By</h2>
            <div className="relative">
              <button
                onClick={() => setOrderOpen(!orderOpen)}
                className="w-full flex justify-between items-center p-2 bg-gray-200 rounded-md"
              >
                {orderBy}
                <span
                  className={`transform transition-transform ${
                    orderOpen ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>
              {orderOpen && (
                <div className="absolute w-full bg-white mt-1 rounded-md shadow-lg z-10">
                  {[
                    "Popularity",
                    "Price: Low to High",
                    "Price: High to Low",
                    "Recently Added",
                  ].map((option, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setOrderBy(option);
                        setOrderOpen(false);
                      }}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Product List */}
        <div className="bg-gray-50 p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredData.length === 0 ? (
            <div className="col-span-full text-center py-20">
              <p className="text-gray-600 text-lg">
                No products match your filters.
              </p>
            </div>
          ) : (
            filteredData.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col hover:shadow-lg transition"
              >
                <Link to={`/product/${item._id}`}>
                  <div className="h-48 flex items-center justify-center bg-gray-100">
                    <img
                      src={item.image?.url}
                      alt={item.name}
                      className="h-40 object-contain"
                    />
                  </div>
                </Link>

                <div className="p-4 flex flex-col flex-1">
                  <Link to={`/product/${item._id}`}>
                    <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 flex-1 hover:text-blue-600">
                      {item.name}
                    </h3>
                  </Link>

                  {/* ✅ Stock info */}
                  <p className="text-sm text-gray-500 mt-1">
                    Stock: {item.stock}
                  </p>

                  <p className="text-lg font-bold text-green-600 mt-2 mb-4">
                    ${item.price.toLocaleString()}
                  </p>

                  <button
                    onClick={() => handleAddToCart(item)}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition mt-auto"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Promotions;

