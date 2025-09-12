import React from 'react'
import { Facebook, Instagram, Twitter, X, Filter } from "lucide-react";

function Footer() {
  return (
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
            <li>Phone: 810-487-2437, 802-829-2984</li>
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

  );
}

export default Footer