// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";
import Promotions from "./Products/Promotions.jsx";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./Home/Home.jsx";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Signup from "./SignInfolder/Signup.jsx";
import Login from "./SignInfolder/Login.jsx";
import AdminDashboard from "./Admin/Admin.jsx";
import ProductDashboard from "./Admin/Product.jsx";
import AddProduct from "./Admin/AddProduct.jsx";
import AllProducts from "./Admin/AllProducts.jsx";
import EditProduct from "./Admin/EditProduct.jsx";
import { CartProvider } from "./Cart/CartContext.jsx";
import Cart from "./Cart/Cart.jsx";
import ProductDetails from "./Products/ProductDetail.jsx";
import Checkout from "./Cart/Checkout.jsx";
import Users from "./Admin/Users.jsx";
import CategoryDashboard from "./Admin/Categories.jsx";
import AddCategory from "./Admin/AddCategory.jsx";
import Orders from "./Admin/Orders.jsx";


function Layout({ children }) {
  const location = useLocation();

  // Routes where we hide Header & Footer
  const hideOnRoutes = ["/login", "/Signup"];
  const isAdminRoute = location.pathname.startsWith("/admin");
  const shouldHide = hideOnRoutes.includes(location.pathname) || isAdminRoute;

  return (
    <>
      {!shouldHide && <Header />}
      <main>{children}</main>
      {!shouldHide && <Footer />}
    </>
  );
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/promotions" element={<Promotions />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/checkout" element={<Checkout />} />

      {/* Admin routes */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/products" element={<ProductDashboard />} />
      <Route path="/admin/products/add" element={<AddProduct />} />
      <Route path="/admin/products/all" element={<AllProducts />} />
      <Route path="/admin/edit/:id" element={<EditProduct />} />
      <Route path="/admin/users" element={<Users />} />
      <Route path="/admin/orders" element={<Orders />} />
      <Route path="/admin/categories" element={<CategoryDashboard />} />
      <Route path="/admin/categories/add" element={<AddCategory />} />
    </Routes>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
    <BrowserRouter>
        <Layout>
          <AppRoutes />
        </Layout>
    </BrowserRouter>
  </CartProvider>
  </StrictMode>
);

