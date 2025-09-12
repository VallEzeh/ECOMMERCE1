import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://e-com-backend-j88f.onrender.com/user/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // to include cookies
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      console.log(data.checkUser);
      if (data.checkUser.role == 'Admin') {
        navigate("/admin"); // Redirect to admin dashboard
      } else {
        navigate("/"); 
      }
      // console.log("Login response:", data);
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
    // integrate Google OAuth here later
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm"
      >
        <h2 className="text-xl font-bold mb-4 text-center text-gray-800">
          Log In
        </h2>

        {/* Email */}
        <div className="mb-3">
          <label className="block text-gray-600 mb-1 text-sm">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-1.5 border rounded-lg focus:ring-2 focus:ring-blue-400 text-sm"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-4 relative">
          <label className="block text-gray-600 mb-1 text-sm">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-1.5 border rounded-lg pr-9 focus:ring-2 focus:ring-blue-400 text-sm"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-8 text-gray-600 text-sm"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-1.5 rounded-lg hover:bg-blue-600 transition duration-200 text-sm"
        >
          Log In
        </button>

        {/* OR separator */}
        <div className="flex items-center my-3">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-2 text-gray-500 text-xs">OR</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        {/* Google Login */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center border py-1.5 rounded-lg hover:bg-gray-50 transition duration-200 text-sm"
        >
          <FcGoogle className="text-lg mr-2" /> Log in with Google
        </button>

        {/* Don't have an account? */}
        <p className="text-center text-gray-600 mt-4 text-sm">
          Don’t have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="text-blue-500 hover:underline"
          >
            Sign up
          </button>
        </p>
      </form>
    </div>
  );
}

export default Login;
