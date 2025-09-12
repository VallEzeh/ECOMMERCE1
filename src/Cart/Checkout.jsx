// src/pages/Checkout.jsx
import React, { useState } from "react";
import { useCart } from "../Cart/CartContext";
import axios from "axios";

function Checkout() {
  const { cart = [], clearCart } = useCart();

  // Nigerian states + cities
  const nigeriaData = {
    Lagos: ["Ikeja", "Lekki", "Victoria Island", "Yaba", "Surulere"],
    Abuja: ["Garki", "Wuse", "Maitama", "Asokoro", "Gwarinpa"],
    Anambra: ["Awka", "Onitsha", "Nnewi"],
    Enugu: ["Enugu North", "Nsukka", "Udi"],
    Rivers: ["Port Harcourt", "Bonny", "Okrika"],
  };
  const statesInNigeria = Object.keys(nigeriaData);

  const [formData, setFormData] = useState({
    name: "",
    phone1: "",
    phone2: "",
    state: "",
    city: "",
    delivery: "pickup",
    payment: "cod",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "state") {
      setFormData((prev) => ({ ...prev, state: value, city: "" }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cart || cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const deliveryFee = formData.delivery === "pickup" ? 1050 : 2500;
    const subtotal = cart.reduce(
      (sum, item) => sum + item.price * (item.qty || item.quantity || 1),
      0
    );
    const total = subtotal + deliveryFee;

    // ✅ Exact match with Order model
    const orderPayload = {
      orderItems: cart.map((item) => ({
        product: item._id || item.id,
        name: item.title || item.name,
        price: item.price,
        qty: item.qty || item.quantity, // fix qty
        image: item.image,
      })),
      shippingAddress: {
        name: formData.name,
        phone1: formData.phone1,
        phone2: formData.phone2,
        address: formData.address,
        city: formData.city,
        state: formData.state, // ✅ required
        postalCode: "0000",
        country: "Nigeria",
        delivery: formData.delivery,
      },
      paymentMethod: formData.payment === "cod" ? "cash" : formData.payment,
      totalPrice: total, // ✅ required
    };

    try {
      console.log("Placing order with payload:", orderPayload);
      const res = await axios.post(
        "https://e-com-backend-j88f.onrender.com/order",
        orderPayload,
        {
          withCredentials: true,
        }
      );

      alert("✅ Order placed successfully!");
      console.log("Order:", res.data);
      clearCart();
    } catch (error) {
      console.error("❌ Error placing order:", error.response?.data || error);
      alert("❌ Failed to place order");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        {/* Phone Numbers */}
        <input
          type="tel"
          name="phone1"
          placeholder="Primary Phone Number"
          value={formData.phone1}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="tel"
          name="phone2"
          placeholder="Alternative Phone Number"
          value={formData.phone2}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        {/* Address */}
        <input
          type="text"
          name="address"
          placeholder="Street / Address"
          value={formData.address}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        {/* State */}
        <div>
          <label className="block font-semibold mb-1">State</label>
          <select
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          >
            <option value="">Select State</option>
            {statesInNigeria.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        {/* City */}
        {formData.state && (
          <div>
            <label className="block font-semibold mb-1">City / Location</label>
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            >
              <option value="">Select City</option>
              {nigeriaData[formData.state].map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Delivery */}
        <div>
          <h3 className="font-semibold mb-2">Delivery Option</h3>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="delivery"
              value="pickup"
              checked={formData.delivery === "pickup"}
              onChange={handleChange}
            />
            Pickup Station (₦1050)
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="delivery"
              value="home"
              checked={formData.delivery === "home"}
              onChange={handleChange}
            />
            Home Delivery (₦2500)
          </label>
        </div>

        {/* Payment */}
        <div>
          <h3 className="font-semibold mb-2">Payment Method</h3>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="payment"
              value="cod"
              checked={formData.payment === "cod"}
              onChange={handleChange}
            />
            Cash on Delivery
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="payment"
              value="card"
              checked={formData.payment === "card"}
              onChange={handleChange}
            />
            Card Payment
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
        >
          Place Order
        </button>
      </form>
    </div>
  );
}

export default Checkout;
