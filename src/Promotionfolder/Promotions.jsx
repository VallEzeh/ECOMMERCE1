import React, { useEffect, useState } from "react";
import { Facebook, Instagram, Twitter, X, Filter } from "lucide-react";

function Promotions() {
  const [holdData, setHoldData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  // Brands
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

  // Price range
  const [minPrice, setMinPrice] = useState(1);
  const [maxPrice, setMaxPrice] = useState(4500000);

  // Order by
  const [orderOpen, setOrderOpen] = useState(false);
  const [orderBy, setOrderBy] = useState("Default");

  // Sidebar toggle for mobile
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Filter brands list
  const filteredBrands = allBrands.filter((brand) =>
    brand.toLowerCase().includes(search.toLowerCase())
  );

  // Fetch products
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setHoldData(data);
        setFilteredData(data);
      });
  }, []);

  // Apply filters
  useEffect(() => {
    let products = [...holdData];

    // Brand filter
    if (selectedBrands.length > 0) {
      products = products.filter((p) =>
        selectedBrands.some((brand) =>
          p.title.toLowerCase().includes(brand.toLowerCase())
        )
      );
    }

    // Price filter
    products = products.filter(
      (p) => p.price >= minPrice && p.price <= maxPrice
    );

    setFilteredData(products);
  }, [selectedBrands, minPrice, maxPrice, holdData]);

  // Toggle brand checkbox
  const handleBrandChange = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Mobile Filter Button */}
      <div className="lg:hidden flex justify-end p-4">
        <button
          className="flex items-center gap-2 bg-amber-700 text-white px-4 py-2 rounded-lg"
          onClick={() => setSidebarOpen(true)}
        >
          <Filter size={18} /> Filter
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[27%_73%]">
        {/* Sidebar */}
        <div
          className={`bg-amber-800 lg:relative fixed top-0 left-0 h-full w-72 transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 transition-transform duration-300 z-50`}
        >
          <div className="bg-white text-black h-full rounded-lg p-5 overflow-y-auto">
            {/* Close Button for Mobile */}
            <div className="lg:hidden flex justify-end">
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
            <input
              type="range"
              min="1"
              max="4500000"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className="w-full mt-2"
            />
            <input
              type="range"
              min="1"
              max="4500000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full"
            />
            <p className="mt-1">
              ${minPrice.toLocaleString()} - ${maxPrice.toLocaleString()}
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
        <div className="min-h-screen bg-white p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredData.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 text-sm truncate mb-2">
                  {item.title}
                </h3>
                <p className="text-lg font-bold text-green-600 mb-4">
                  ${item.price}
                </p>
                <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-10 mt-10">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Promotion</li>
              <li>TV</li>
              <li>Freezer</li>
              <li>Phone</li>
              <li>Washing Machine</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Top Brands</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Samsung</li>
              <li>LG</li>
              <li>Hisense</li>
              <li>Apple</li>
              <li>Whirlpool</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Phone: 802-829-2984</li>
              <li>Email: support@yourcompany.com</li>
              <li>Address: 123 Tech Street, Lagos, Nigeria</li>
            </ul>
          </div>
        </div>
        <div className="flex justify-center gap-6 mt-8">
          <a href="#" className="hover:text-blue-500">
            <Facebook size={24} />
          </a>
          <a href="#" className="hover:text-pink-500">
            <Instagram size={24} />
          </a>
          <a href="#" className="hover:text-blue-400">
            <Twitter size={24} />
          </a>
        </div>
        <div className="text-center text-sm text-gray-500 mt-6">
          © 2023 Your Company. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default Promotions;
