import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Promotions from "./Promotionfolder/Promotions";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home/Home.jsx";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Signup from "./SignInfolder/Signup.jsx";
import Login from "./SignInfolder/login.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/promotions" element={<Promotions />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  </StrictMode>
);
