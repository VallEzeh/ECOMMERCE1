import React, { useEffect, useState } from "react";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editOpen, setEditOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const token = JSON.parse(localStorage.getItem("user"))?.token;

  // Fetch profile (includes orders)
  useEffect(() => {
    if (!token) return;
    fetch("https://e-com-backend-j88f.onrender.com/users/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
          setOrders(data.orders || []);
          setFormData({
            firstname: data.user.firstname,
            lastname: data.user.lastname,
            email: data.user.email,
            password: "",
          });
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [token]);

  // Handle profile update
  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await fetch(
      "https://e-com-backend-j88f.onrender.com/users/profile",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      }
    );

    const data = await res.json();
    if (res.ok) {
      setUser(data);
      setEditOpen(false);
      alert("Profile updated ✅");
    } else {
      alert(data.message || "Update failed ❌");
    }
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">My Account</h2>

      {/* Profile Info */}
      <div className="bg-white shadow p-6 rounded-lg mb-8">
        <h3 className="text-xl font-semibold mb-4">Profile</h3>
        <p>
          <strong>Name:</strong> {user?.firstname} {user?.lastname}
        </p>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
        <button
          onClick={() => setEditOpen(true)}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Edit Profile
        </button>
      </div>

      {/* Orders */}
      <div className="bg-white shadow p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">My Orders</h3>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <ul className="space-y-4">
            {orders.map((order) => (
              <li key={order._id} className="border rounded-lg p-4">
                <p>
                  <strong>Status:</strong>{" "}
                  <span className="capitalize">{order.status}</span>
                </p>
                <p>
                  <strong>Total:</strong> ₦
                  {(order.totalPrice * 1500).toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">
                  Placed on {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <ul className="mt-2 space-y-1">
                  {order.orderItems.map((item, idx) => (
                    <li key={idx}>
                      {item.name} × {item.qty} = ₦
                      {(item.price * 1500).toLocaleString()}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Edit Modal */}
      {editOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">Edit Profile</h3>
            <form onSubmit={handleUpdate} className="space-y-4">
              <input
                type="text"
                placeholder="First Name"
                value={formData.firstname}
                onChange={(e) =>
                  setFormData({ ...formData, firstname: e.target.value })
                }
                className="w-full border rounded p-2"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={formData.lastname}
                onChange={(e) =>
                  setFormData({ ...formData, lastname: e.target.value })
                }
                className="w-full border rounded p-2"
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full border rounded p-2"
              />
              <input
                type="password"
                placeholder="New Password (optional)"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full border rounded p-2"
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditOpen(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
