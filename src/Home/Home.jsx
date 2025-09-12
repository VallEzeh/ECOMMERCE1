// src/Home/Home.jsx
import React, { useRef } from "react";

function Home() {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (scrollRef.current) {
      const scrollAmount = 250; // how much to move per click
      scrollRef.current.scrollBy({
        left: dir === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <main className="px-4 md:px-8 lg:px-12">
      {/* Hero video */}
      <div className="w-full mt-6 rounded-2xl overflow-hidden">
        <video
          src="samsungad.mp4"
          controls
          loop
          autoPlay
          className="w-full h-[220px] sm:h-[300px] md:h-[400px] object-cover"
        />
      </div>

      {/* Categories */}
      <h1 className="text-2xl font-bold mt-8 mb-4">Categories</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {[
          { img: "tv2.jpg", label: "Tvs" },
          { img: "speaker.jpg", label: "Audio" },
          { img: "frigde.jpg", label: "Refrigerator" },
          { img: "wash.jpg", label: "Washing Machines" },
          { img: "ac.jpg", label: "ACs" },
          { img: "kitchen.jpg", label: "Kitchen" },
          { img: "panel.jpg", label: "Panels" },
          { img: "furni.jpg", label: "Furniture" },
        ].map((item, i) => (
          <a
            key={i}
            href="#"
            className="relative h-32 sm:h-40 md:h-48 rounded-xl overflow-hidden bg-cover bg-center flex items-end text-white font-semibold"
            style={{ backgroundImage: `url(${item.img})` }}
          >
            <div className="bg-black/50 w-full text-center py-1">
              {item.label}
            </div>
          </a>
        ))}
      </div>

      {/* Featured Hisense Product */}
      <div className="mt-10 bg-gray-200 rounded-2xl flex flex-col md:flex-row overflow-hidden">
        <div
          className="w-full md:w-1/2 h-64 md:h-auto bg-cover bg-center"
          style={{ backgroundImage: "url(hisense.webp)" }}
        />
        <div className="p-6 md:w-1/2">
          <h2 className="text-xl md:text-2xl font-bold">
            Hisense TV ULED 110 Inch UX Series Mini-LED 4K Smart
          </h2>
          <p className="mt-4 text-lg font-semibold">NGN 16,900,000</p>
          <p className="mt-3 text-gray-700 text-sm md:text-base">
            Description: <br />
            Built-in subwoofer <br />
            Top-firing speakers <br />
            Side speakers <br />
            CineStage X Surround..
          </p>
          <a
            href="#"
            className="inline-block mt-6 bg-black text-white py-2 px-5 rounded-lg hover:bg-gray-800 transition"
          >
            View Product Details
          </a>
        </div>
      </div>

      {/* Shop by Brand */}
      <h1 className="text-2xl font-bold mt-10 mb-4">Shop By Brand</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {[
          "lg.png",
          "sam.png",
          "tcl.png",
          "royal.png",
          "hilogo.jpeg",
          "pana.png",
        ].map((logo, i) => (
          <a
            key={i}
            href="#"
            className="h-24 sm:h-28 bg-white rounded-xl flex items-center justify-center shadow-md"
          >
            <img src={logo} alt="brand" className="max-h-full object-contain" />
          </a>
        ))}
      </div>

      {/* Promo Banner */}
      <div className="mt-10 rounded-2xl overflow-hidden">
        <img
          src="wash.webp"
          alt="promo"
          className="w-full h-52 sm:h-72 md:h-150 object-cover"
        />
      </div>

      {/* Featured Products (Horizontal Scroll) */}
      <h1 className="text-2xl font-bold mt-10 mb-4">Featured Products</h1>
      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/60 text-white p-2 rounded-full z-10"
        >
          ◀
        </button>

        {/* Scrollable row */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 scrollbar-hide scroll-smooth"
        >
          {Array(8)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="min-w-[180px] sm:min-w-[220px] bg-gray-200 h-40 sm:h-48 rounded-xl flex items-center justify-center flex-shrink-0"
              >
                Product {i + 1}
              </div>
            ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/60 text-white p-2 rounded-full z-10"
        >
          ▶
        </button>
      </div>

      {/* Bottom Banner */}
      <div className="mt-10 mb-12 rounded-2xl overflow-hidden">
        <img
          src="lgpix.webp"
          alt="bottom banner"
          className="w-full h-52 sm:h-72 md:h-96 object-cover"
        />
      </div>
    </main>
  );
}

export default Home;
