// src/pages/CartPage.jsx
import React from "react";
import { useCart } from "../Cart/CartContext";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    cart = [],
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCart();

  const navigate = useNavigate();

  // ✅ Guard safely against undefined cart
  const cartIsEmpty = !cart || cart.length === 0;
  const totalAmount =
    cart?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;

  // 🔹 Prepare correct orderData for Checkout
  const handleProceedToCheckout = () => {
    const orderItems = cart.map((item) => ({
      product: item._id || item.id,
      name: item.title,
      price: item.price,
      qty: item.quantity, // ✅ convert quantity → qty
      image: item.image,
    }));

    const orderData = {
      orderItems,
      totalPrice: totalAmount,
    };

    // Store in localStorage so Checkout can use it
    localStorage.setItem("orderData", JSON.stringify(orderData));

    // Navigate to checkout page
    navigate("/Checkout");
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {cartIsEmpty ? (
        <div className="flex items-center justify-center h-[500px]">
          <div className="text-center bg-white p-10 rounded-2xl shadow-lg">
            <img
              src="/empty-cart.png"
              alt="Empty Cart"
              className="mx-auto w-40 mb-6"
            />
            <h2 className="text-3xl font-bold mb-2">Your Cart is Empty</h2>
            <p className="mb-6 text-gray-600">
              Looks like you haven’t added anything yet.
            </p>
            <Link to="/Promotions">
              <button className="bg-red-500 px-6 py-3 rounded-lg text-white hover:bg-red-600 transition">
                Browse Products
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">Your Shopping Cart</h2>
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id || item._id}
                  className="flex items-center justify-between border-b pb-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-24 w-24 object-contain rounded-md border"
                    />
                    <div>
                      <h4 className="font-semibold text-lg">{item.title}</h4>
                      <p className="text-gray-600">${item.price.toFixed(2)}</p>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => decreaseQuantity(item.id || item._id)}
                      className="px-3 py-1 border rounded-md hover:bg-gray-200"
                    >
                      -
                    </button>
                    <span className="text-lg font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => increaseQuantity(item.id || item._id)}
                      className="px-3 py-1 border rounded-md hover:bg-gray-200"
                    >
                      +
                    </button>
                  </div>

                  {/* Item total */}
                  <p className="font-bold text-lg">
                    ${(item.quantity * item.price).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            {/* Cart Actions */}
            <div className="mt-6 flex gap-4">
              <button
                onClick={clearCart}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition"
              >
                Clear Cart
              </button>
              <Link to="/Promotions">
                <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition">
                  Continue Shopping
                </button>
              </Link>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="bg-white rounded-xl shadow-md p-6 h-fit sticky top-6">
            <h3 className="text-xl font-bold mb-4">Order Summary</h3>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span>Shipping</span>
              <span className="text-green-600">Free</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-4">
              <span>Total</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>

            <button
              onClick={handleProceedToCheckout}
              className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
