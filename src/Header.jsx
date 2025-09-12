// Header.jsx
import React, { useState } from "react";
import { AiOutlineShop } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { useCart } from "./Cart/CartContext"; // ✅ Import cart context

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cart } = useCart(); // ✅ Access cart state

  return (
    <header className="w-full bg-[#f5f5f5] shadow-md relative">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between px-4 py-3">
        {/* Logo */}
        <div>
          <a href="/" className="font-bold text-xl">
            Echo-Emporium
          </a>
          <div className="text-sm">Electronics Store</div>
        </div>

        {/* Search (desktop only) */}
        <div className="hidden md:flex relative bg-white border rounded-2xl w-[400px] lg:w-[600px]">
          <CiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2" />
          <input
            type="search"
            placeholder="Search for products"
            className="w-full h-[40px] rounded-2xl pl-10 outline-none"
          />
        </div>

        {/* Right Links */}
        <div className="flex items-center gap-5 font-medium relative">
          {/* Nigeria */}
          <a href="/" className="flex items-center gap-2">
            <AiOutlineShop /> Nigeria
          </a>
          {/* Floating Cart */}
          <a
            href="/cart"
            className="flex items-center gap-2 fixed right-4 top-20 bg-white shadow-md p-2 rounded-full z-50"
          >
            <IoCartOutline className="text-2xl" />
            <span className="ml-1 text-sm font-bold">{cart.length}</span>
          </a>
          {/* User Icon */}
          <a href="/Signup">
            <FaUser className="text-xl" />
          </a>
        </div>

        {/* Hamburger (mobile only) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl"
        >
          {menuOpen ? <IoClose /> : <GiHamburgerMenu />}
        </button>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative bg-white border rounded-2xl w-full">
          <CiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2" />
          <input
            type="search"
            placeholder="Search for products"
            className="w-full h-[40px] rounded-2xl pl-10 outline-none"
          />
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center justify-around bg-gray-100 py-3 font-medium">
        <a href="/">Home</a> {/* ✅ Added Home */}
        <a href="/promotions">Promotion</a>
        <a href="/">Phones</a>
        <a href="/">Refrigerator</a>
        <a href="/">Freezer</a>
        <a href="/">Washing Machines</a>
        <a href="/">TVs</a>
        <a href="/">Audio</a>
        <a href="/">ACs</a>
        <a href="/">Cookers/Microwaves</a>
      </div>

      {/* Mobile Side Menu (only categories) */}
      <div
        className={`fixed top-0 left-0 h-full w-[70%] max-w-[300px] bg-gray-100 shadow-lg transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-40`}
      >
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <span className="font-bold text-lg">Menu</span>
          <button onClick={() => setMenuOpen(false)} className="text-2xl">
            <IoClose />
          </button>
        </div>
        <nav className="flex flex-col px-4 py-3 space-y-4 font-medium">
          <a href="/">Home</a> {/* ✅ Added Home */}
          <a href="/promotions">Promotion</a>
          <a href="/">Phones</a>
          <a href="/">Refrigerator</a>
          <a href="/">Freezer</a>
          <a href="/">Washing Machines</a>
          <a href="/">TVs</a>
          <a href="/">Audio</a>
          <a href="/">ACs</a>
          <a href="/">Cookers/Microwaves</a>
          
        </nav>
      </div>
    </header>
  );
}

export default Header;
